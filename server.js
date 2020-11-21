'use strict';
//require('dotenv').config();
import * as _dotenv from "dotenv";
import pgp from "pg-promise";
import express from 'express';
//const expressSession = require('express-session');  // for managing session state
import * as _expressSession from "express-session";
//const passport = require('passport');               // handles authentication
import * as _passport from "passport";
//const LocalStrategy = require('passport-local').Strategy; // username/password strategy
import * as _LocalStrategy from 'passport-local';
//onst minicrypt = require('./miniCrypt');
import * as _minicrypt from "./miniCrypt.js";
//const path = require('path');
import * as _path from "path";

const dotenv = _dotenv["default"];
dotenv.config();
const expressSession = _expressSession["default"];
const passport = _passport["default"];
const LocalStrategy = _LocalStrategy["default"].Strategy;
const minicrypt = _minicrypt.foo();
const path = _path["default"];

const app = express();
const mc = new minicrypt();


app.use(express.json());
app.use(express.urlencoded({ 'extended': true })); // allow URLencoded data

app.use('/', express.static('./client'));
//app.use(express.static(__dirname + '/client'));

const __dirname = process.cwd();
//console.log(__dirname);


// import {createServer} from 'http';
// import {parse} from 'url';
// import {join} from 'path';
// import {writeFile, readFileSync, existsSync} from 'fs';
import { DB } from './database.js';

const url = process.env.DATABASE_URL;

const database = new DB(pgp()(url));
//let database = new DB('hi');

// Session configuration
const session = {
    secret: process.env.SECRET || 'SECRET', // set this encryption key in Heroku config (never in GitHub)!
    resave: false,
    saveUninitialized: false
};

const strategy = new LocalStrategy(
    async (username, password, done) => {
        if (! await findUser(username)) {
            // no such user
            return done(null, false, { 'message': 'Wrong username' });
        }
        if (! await validatePassword(username, password)) {
            // invalid password
            // should disable logins after N messages
            // delay return to rate-limit brute-force attacks
            await new Promise((r) => setTimeout(r, 2000)); // two second delay
            return done(null, false, { 'message': 'Wrong password' });
        }
        // success!
        // should create a user object here, associated with a unique identifier
        return done(null, username);
    });

app.use(expressSession(session));
passport.use(strategy);
app.use(passport.initialize());
app.use(passport.session());


// Convert user object to a unique identifier.
passport.serializeUser((user, done) => {
    done(null, user);
});
// Convert a unique identifier to a user object.
passport.deserializeUser((uid, done) => {
    done(null, uid);
});

async function findUser(username) {
    const foundUsername = await database.getUser(username);
    if (JSON.parse(foundUsername).length === 0) {
        return false;
    } else {
        return true;
    }
}

async function validatePassword(name, pwd) {
    const foundUsername = await findUser(name);
    if (!foundUsername) {
        return false;
    }
    //Check password
    const user = JSON.parse(await database.getUser(name))[0];
    const res = mc.check(pwd, user.salt, user.hashed_password);
    return res;
}

async function addUser(name, pwd) {
    if (await findUser(name)) {
        return false;
    }
    //Save the salt and hash
    console.log('attempting to register user');
    const userInfo = mc.hash(pwd);
    const salt = userInfo[0];
    const hashed_pw = userInfo[1];
    database.userRegister(name, salt, hashed_pw);

    return true;
}

function checkLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        // If we are authenticated, run the next route.
        next();
    } else {
        // Otherwise, redirect to the login page.
        res.redirect(302, '/login');
    }
}

function checkLoggedInJoin(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).send('Please log in first!');
    }
}

// Handle post data from login.js
app.post('/login',
    passport.authenticate('local', {     // use username/password authentication
        'successRedirect': '/profile',   // when we login, go to /private 
        'failureRedirect': '/login'      // otherwise, back to login
    }));

app.get('/login', (req, res) => res.sendFile('login.html', { root: path.join(__dirname, './client') }));

// Handle logging out (takes us back to the login page).
app.get('/logout', (req, res) => {
    req.logout(); // Logs us out!
    res.redirect('/login'); // back to login
});

app.post('/register',
    async (req, res) => {
        const username = req.body['username'];
        const password = req.body['password'];
        if (await addUser(username, password)) {
            console.log("login redirect");
            res.redirect('/login');
        } else {
            console.log("register redirect");
            res.redirect('/register');
        }
    });

// Register URL
app.get('/register', (req, res) => res.sendFile('register.html', { root: path.join(__dirname, './client') }));


//Profile
app.get('/profile',
    checkLoggedIn, // If we are logged in (notice the comma!)...
    (req, res) => {  // Go to the user's page.
        res.sendFile('profilePage.html', { root: path.join(__dirname, './client') });
    });

//Create event page
app.get('/createEvent',
    checkLoggedIn, // If we are logged in (notice the comma!)...
    (req, res) => {  // Go to the create event page.
        res.sendFile('createEvent.html', { root: path.join(__dirname, './client') });
    });

//feed URL
app.get('/feed', (req, res) => res.sendFile('feed.html', { root: path.join(__dirname, './client') }));

//map page URL
app.get('/map', (req, res) => res.sendFile('mapPage.html', { root: path.join(__dirname, './client') }));


//main page (redirects to feed)
app.get('/', (req, res) => {
    res.redirect('/feed');
});


app.post('/user/joinEvent',
    checkLoggedIn,
    async (req, res) => {
        const username = req.user;
        const id = req.body.id;

        const event = await database.getEvent(id);
        const parsedEvent = JSON.parse(event)[0];
        const currentJoined = await database.getEventCurrentJoined(id);

        if (currentJoined[0].count < parsedEvent.capacity) {
            database.joinEvent(username, id);
        } else {
            //TODO: send max capacity reached in res
        }
    });

app.post('/user/leaveEvent',
    checkLoggedIn,
    (req, res) => {
        const username = req.user;
        const eventid = req.body.id;
        database.leaveEvent(username, eventid);
        //res.redirect('/feed');
    });

app.post('/user/createEvent',
    checkLoggedIn,
    (req, res) => {
        const username = req.user;
        const body = req.body;
        database.userCreate(username, body);
        //redirect to created event on success?
        
    });

app.post('/user/editEvent',
    checkLoggedIn,
    async (req, res) => {
        const username = req.user;
        const id = req.body.id;

        const event = await database.getEvent(id);
        const parsedEvent = JSON.parse(event)[0];
        if (username === parsedEvent.username) {
            database.userEdit(req.body['event_id'], req.body);
        } else {
            res.status(403).send('Unauthorized');
        }
    });

app.get('/user/getEvent', (req, res) => {
    const eventid = req.body.id;
    database.getEvent(eventid);
});

app.post('/user/deleteEvent', 
    checkLoggedIn,
    async (req, res) => {
        const username = req.user;
        const id = req.body.id;

        const event = await database.getEvent(id);
        const parsedEvent = JSON.parse(event)[0];
        if (username === parsedEvent.username) {
            database.userDelete(id);
        } else {
            res.status(403).send('Unauthorized');
        }
    });


app.get('/user/getmyevents', async (req, res) => {
    res.end(await database.userGetMyEvents(req.user));
});

app.get('/user/getjoinedevents', async (req, res) => {
    res.send(await database.userGetJoinedEvents(req.user));
});

app.get('/globalgetfeed', async (req, res) => {
    res.send(await database.globalGetFeed());
});

app.post('/user/getEventCurrentJoined', async (req, res) => {
    const event_id = req.body.id;
    res.send(await database.getEventCurrentJoined(event_id));
});



app.get('/globalgetfeed/bylocation',async (req,res)=>{
    res.end(await database.globalGetFeedByLocation());
});


app.get('*', (req, res) => {
    res.send(JSON.stringify({ result: 'command-not-found' }));
});


let port = process.env.PORT;
if (port === null || port === "" || port === undefined) {
    port = 8080;
}
app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
});




// createServer(async (req, res) => {
//     const parsed = parse(req.url, true);

//     if (parsed.pathname === '/user/new') {
//         database.newUser();

//     } else if (parsed.pathname === 'user/joinEvent') {
//         database.joinEvent();

//     }else if (parsed.pathname === 'user/unjoinEvent') {
//         database.unjoinEvent(owner,eventid);

//     }else if (parsed.pathname === '/user/create') {
//         database.userCreate();

//     } else if (parsed.pathname === '/user/getEvent') {
//         database.getEvent(5);
//     }
//      else if (parsed.pathname === '/user/edit') {
//         database.userEdit();

//     } else if (parsed.pathname === '/user/delete') {
//         let body = '';
//         req.on('data', data => body += data);  
//         req.on('end', () => {
//             const data = JSON.parse(body);
//             database.userDelete(data.eid);
//         });

//     } else if (parsed.pathname === '/user/getmyevents') {
//         res.end(database.userGetMyEvents());

//     } else if (parsed.pathname === '/user/getjoinedevents') {
//         res.end(database.userGetJoinedevents());

//     } else if (parsed.pathname === '/globalgetfeed/') {
//        res.end(database.globalGetFeed());

//     } else if (parsed.pathname === '/globalgetfeed/bylocation') {
//        res.end(database.globalGetFeedByLocation());

//     } else {
//         // If the client did not request an API endpoint, we assume we need to fetch and serve a file.
//         // This is terrible security-wise, since we don't check the file requested is in the same directory.
//         // This will do for our purposes.
//         const filename = parsed.pathname === '/' ? "profilePage.html" : parsed.pathname.replace('/', '');
//         const path = join("client/", filename);
//         // const path = join(filename);
//         console.log("trying to serve " + path + "...");
//         if (existsSync(path)) {
//             if (filename.endsWith("html")) {
//                 res.writeHead(200, {"Content-Type" : "text/html"});
//             } else if (filename.endsWith("css")) {
//                 res.writeHead(200,{"Content-Type" : "text/css"});
//             } else if (filename.endsWith("js")){
//                 res.writeHead(200,{"Content-Type" : "text/javascript"});
//             }
//             res.write(readFileSync(path));
//             res.end();
//         } else {
//             res.writeHead(404);
//             res.end();
//         }
//     }
// }).listen(8080);