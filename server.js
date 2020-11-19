
import pgp from "pg-promise";
import express from 'express';
const app= express();

app.use(express.json());
app.use('/', express.static('./client'));



// import {createServer} from 'http';
// import {parse} from 'url';
// import {join} from 'path';
// import {writeFile, readFileSync, existsSync} from 'fs';
import {DB} from './database.js';

const url = process.env.DATABASE_URL;

let database = new DB(pgp()(url));
//let database = new DB('hi');

app.post('/user/new',(req,res)=>{
    database.newUser();
    // res.send("new user created"); 
});

app.post('/user/login', (req, res) => {
    database.userLogin();
    console.log('login');
});

app.post('/user/register',(req,res)=>{
    database.userRegister();
    console.log("user created");
});

app.post('/user/joinEvent',(req,res)=>{
    database.joinEvent();
    console.log("found");
});

app.post('/user/unjoinEvent',(req,res)=>{
    const owner= req.body.owner;
    const eventid= req.body.eid;
    database.unjoinEvent(owner,eventid);
});

app.post('/user/createEvent',(req,res)=>{
    //console.log('create event');
    //console.log(req.body);
    database.userCreate(1,req.body);
    //res.end();
    //database.userCreate();
});

app.post('/user/editEvent',(req,res)=>{
    database.userEdit();
});

app.get('/user/getEvent',(req,res)=>{
    database.getEvent(5);
});

app.post('/user/deleteEvent',(req,res)=>{
    const eventid= req.body.eid;
    database.userDelete(eventid);
});

app.get('/user/getmyevents',(req,res)=>{
    res.end(database.userGetMyEvents());
});

app.get('/',(req,res)=>{
    res.redirect('/profileOrLogin');
});
app.get('/user/getjoinedevents',(req,res)=>{
    res.end(database.userGetJoinedEvents());
});

app.get('/globalgetfeed',(req,res)=>{
    res.end(database.globalGetFeed());
});

app.get('/globalgetfeed/bylocation',(req,res)=>{
    res.end(database.globalGetFeedByLocation());
});


app.get('/profileOrLogin', (req, res) => {
    console.log("trying to login or view profile");
    //res.sendFile('client/mapPage.html',{ 'root' : __dirname });
    let loggedIn = true;
    if(loggedIn){
        res.redirect('/profilePage.html');
    }else{
        res.redirect('/login.html');
    }
    
});

app.get('*', (req, res) => {
    res.send(JSON.stringify({ result : 'command-not-found' }));
});


let port = process.env.PORT;
if (port == null || port == "") {
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