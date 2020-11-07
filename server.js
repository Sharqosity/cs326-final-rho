import {createServer} from 'http';
import {parse} from 'url';
import {join} from 'path';
import {writeFile, readFileSync, existsSync} from 'fs';
import {DB} from './database.js';

let database = new DB();

createServer(async (req, res) => {
    const parsed = parse(req.url, true);

    if (parsed.pathname === '/user/new') {
        database.newUser();
        
    } else if (parsed.pathname === 'user/joinEvent') {
        database.joinEvent();

    }else if (parsed.pathname === 'user/unjoinEvent') {
        database.unjoinEvent();

    }else if (parsed.pathname === '/user/create') {
        database.userCreate();

    } else if (parsed.pathname === '/user/getEvent') {
        database.getEvent(5);
    }
     else if (parsed.pathname === '/user/edit') {
        database.userEdit();

    } else if (parsed.pathname === '/user/delete') {
        database.userDelete();

    } else if (parsed.pathname === '/user/getmyevents') {
        res.end(database.userGetMyEvents());

    } else if (parsed.pathname === '/user/getjoinedevents') {
        res.end(database.userGetJoinedevents());

    } else if (parsed.pathname === '/globalgetfeed/') {
       res.end(database.globalGetFeed());

    } else if (parsed.pathname === '/globalgetfeed/bylocation') {
       res.end(database.globalGetFeedByLocation());

    } else {
        // If the client did not request an API endpoint, we assume we need to fetch and serve a file.
        // This is terrible security-wise, since we don't check the file requested is in the same directory.
        // This will do for our purposes.
        const filename = parsed.pathname === '/' ? "profilePage.html" : parsed.pathname.replace('/', '');
        // const path = join("client/", filename);
        const path = join(filename);
        console.log("trying to serve " + path + "...");
        if (existsSync(path)) {
            if (filename.endsWith("html")) {
                res.writeHead(200, {"Content-Type" : "text/html"});
            } else if (filename.endsWith("css")) {
                res.writeHead(200,{"Content-Type" : "text/css"});
            } else if (filename.endsWith("js")){
                res.writeHead(200,{"Content-Type" : "text/javascript"});
            }
            res.write(readFileSync(path));
            res.end();
        } else {
            res.writeHead(404);
            res.end();
        }
    }
}).listen(8080);