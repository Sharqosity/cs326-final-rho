'use strict';

import pgp from "pg-promise";

export class DB{

    constructor(db){
        //creates or loads database
        this.db = db;
    }

    async connectAndRun(task) {
        let connection = null;
    
        try {
            connection = await this.db.connect();
            return await task(connection);
        } catch (e) {
            throw e;
        } finally {
            try {
                connection.done();
            } catch(ignored) {
    
            }
        }
    }

    //Login and authentication stuff
    async getUser(username) {
        return JSON.stringify(await this.connectAndRun(db => db.any("SELECT * FROM users WHERE username = $1;", [username])));
    }
    async userRegister(username, salt, hash){
        await this.connectAndRun(db => db.none("INSERT INTO users VALUES($1, $2, $3);",
        [username, salt,hash]));
    }
    async joinEvent(username, event_id){
        //add an entry in joined_events conatining the user and event id
        await this.connectAndRun(db => db.none("INSERT INTO joined_events VALUES($1, $2);", [username, event_id]));

    }
    async leaveEvent(username, event_id){
        //delete the joined_events entry containing the appropriate user and event id's
        await this.connectAndRun(db => db.none("DELETE FROM joined_events WHERE username = $1 and event_id = $2;", [username, event_id]));
        return true;
    }
    async getEventCurrentJoined(event_id) {
        return await this.connectAndRun(db => db.any("SELECT COUNT(event_id) FROM joined_events WHERE event_id = $1;", [event_id]));

    }
    async userCreate(username, event_info){
        //create a new event 
        // event_info should be a dictionary with the appropriate fields for us to get the information
        //don't supply an event id, we choose assign it sequentially 
        await this.connectAndRun(db => db.none("INSERT INTO events VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);",
        [username, -1, event_info.title, event_info.date, event_info.time, event_info.location, event_info.longitude, event_info.latitude, event_info.description, event_info.capacity]));
        //we insert event_id as -1 so that we can then adjust it to be whatever the next value should be
        await this.connectAndRun(db => db.none("UPDATE events SET event_id = 1+(SELECT MAX(event_id) FROM events) WHERE event_id = -1;"));
        let event_id = await this.connectAndRun(db => db.any("SELECT event_id FROM events ORDER BY event_id DESC LIMIT 1;"));
        console.log(event_id);
        console.log(typeof event_id);
        this.joinEvent(username,event_id[0].event_id);

    }
    async userEdit(event_id, event_info){
        //edit an event
        await this.connectAndRun(db => db.none("UPDATE events SET title = $1, date = $2, time = $3, location = $4, longitude = $5, latitude = $6, description = $7, capacity = $8 WHERE event_id = $9;",
        [event_info.title, event_info.date, event_info.time, event_info.location, event_info.longitude, event_info.latitude, event_info.description, event_info.capacity, event_id]));
    }
    async userDelete(event_id){
        //delete the event from the events table
        //we should have this cascade to the created and joined events
        await this.connectAndRun(db => db.none("DELETE FROM events WHERE event_id = $1;",[event_id]));
        return true;
    }
    async getEvent(event_id){
        //get
        // this was a post in our server.js 
        return JSON.stringify(await this.connectAndRun(db => db.any("SELECT * FROM events WHERE event_id = $1;",[event_id])));
        /* Fake data
        let event = {"eventid":1,"owner ":"George","title":"Book club","date":"11/16/20","time":"2:20pm","location":"Dubois library","description":"Lets talk about 1984","capacity":"5/10"};
        return JSON.stringify(event);
        */
    }
    async userGetMyEvents(username){
        //get
        //Owner Title date time location description capacity
        return JSON.stringify(await this.connectAndRun(db => db.any("SELECT * FROM events WHERE username = $1;",[username])));
        
    }
    async userGetJoinedEvents(username){
        //get
        return JSON.stringify(await this.connectAndRun(db => db.any("SELECT * FROM events WHERE event_id IN (SELECT event_id FROM joined_events WHERE username = $1) and username != $2;",[username,username])));
    }
    async globalGetFeed(){
        //get
        return JSON.stringify(await this.connectAndRun(db => db.any("SELECT * FROM events;")));
    }
    async globalGetFeedByLocation(){
        let list_locations= ['Campus Pond', 'Orchard Hill', 'North East', 'Sylvan','Central','South West', 'Honors College','Library','Worcester','Frank','Hampshire','Berkshire','Totman','Boyden','Other'];
        
        let locationdict= {};
        for(let i=0;i<list_locations.length;i++){
        let cur_list= await this.connectAndRun(db => db.any("SELECT * FROM events WHERE location = $1;",[list_locations[i]]));
        locationdict[list_locations[i]]=cur_list;
        }
        return JSON.stringify(locationdict);
    }
}