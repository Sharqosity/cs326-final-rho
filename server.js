'use strict';
import * as _dotenv from "dotenv";
import pgp from "pg-promise";
import express from 'express';
import * as _expressSession from "express-session";
import * as _passport from "passport";
import * as _LocalStrategy from 'passport-local';
import * as _minicrypt from "./miniCrypt.js";
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

const __dirname = process.cwd();


import { DB } from './database.js';

const url = process.env.DATABASE_URL;

const database = new DB(pgp()(url));

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
        res.redirect(303, '/login');
    }
}

function checkLoggedInFeed(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.writeHead(200, {"Content-Type" : "text/plain"});
        res.write('nologin');
        res.end();
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
            res.redirect(303,'/login');
        } else {
            res.writeHead(401, {"Content-Type" : "text/plain"});
            res.write('userexists');
            res.end();
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
    checkLoggedInFeed,
    async (req, res) => {
        const username = req.user;
        const id = req.body.id;

        const event = await database.getEvent(id);
        const parsedEvent = JSON.parse(event)[0];
        const currentJoined = await database.getEventCurrentJoined(id);

        if (currentJoined[0].count < parsedEvent.capacity) {
            database.joinEvent(username, id);
            res.writeHead(200, {"Content-Type" : "text/plain"});
            res.write('OK');
            res.end();
        } else {
            //TODO: send max capacity reached in res
            res.writeHead(200, {"Content-Type" : "text/plain"});
            res.write('maxcap');
            res.end();
        }
    });

app.post('/user/leaveEvent',
    checkLoggedIn,
    async (req, res) => {
        const username = req.user;
        const eventid = req.body.id;
        await database.leaveEvent(username, eventid);
        res.send("200");
        //res.redirect('/feed');
    });

app.post('/user/createEvent',
    checkLoggedIn,
    (req, res) => {
        const username = req.user;
        const body = req.body;
        database.userCreate(username, body);
        //redirect to created event on success?
        res.redirect(303,'/profile');
        
    });

app.post('/user/editEvent',
    checkLoggedIn,
    async (req, res) => {
        const username = req.user;
        const id = req.body.event_id;

        const event = await database.getEvent(id);
        const parsedEvent = JSON.parse(event)[0];
        if (username === parsedEvent.username) {
            database.userEdit(req.body['event_id'], req.body);
            res.redirect(303,'/profile');
        } else {
            res.status(403).send('Unauthorized');
        }
    });


app.post('/user/deleteEvent', 
    checkLoggedIn,
    async (req, res) => {
        const username = req.user;
        const id = req.body.id;

        const event = await database.getEvent(id);
        const parsedEvent = JSON.parse(event)[0];
        if (username === parsedEvent.username) {
            await database.userDelete(id);
            res.send("200");
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

app.get('/globalgetfeed',
    async (req, res) => {
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