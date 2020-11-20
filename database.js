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
    async unjoinEvent(username, event_id){
        //delete the joined_events entry containing the appropriate user and event id's
        await this.connectAndRun(db => db.none("DELETE FROM joined_events WHERE username = $1 and event_id = $2;", [username, event_id]));
    }
    async userCreate(username, event_info){
        //create a new event 
        // event_info should be a dictionary with the appropriate fields for us to get the information
        //don't supply an event id, we choose assign it sequentially 
        await this.connectAndRun(db => db.none("INSERT INTO events VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);",
        [username, -1, event_info.title, event_info.date, event_info.time, event_info.location, event_info.longitude, event_info.latitude, event_info.description, event_info.capacity]));
        //we insert event_id as -1 so that we can then adjust it to be whatever the next value should be
        await this.connectAndRun(db => db.none("UPDATE events SET event_id = 1+(SELECT MAX(event_id) FROM events) WHERE event_id = -1;"));
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
        
        /* Fake data
        const events = [
            {"eventid":1,"owner ":"George","title":"Book club","date":"11/16/20","time":"2:20pm","location":"Dubois library","description":"Lets talk about 1984","capacity":"5/10"},
            {"eventid":2,"owner":"George","title":"Frisbee club","date":"11/20/20","time":"4:20pm","location":"Campus pond","description":"Lets toss the disc some.","capacity":"7/15"},
            {"eventid":3,"owner":"George","title":"Seltzer Sampling","date":"12/9/20","time":"10:00am","location":"New Worcester","description":"Quality inspection on the new facilities","capacity":"3/5"},
            {"eventid":4,"owner":"George","title":"Pokemon Go","date":"12/17/20","time":"2:20pm","location":"Isenberg","description":"We will be trying to catch Mew","capacity":"30/40"}
        ];
        return JSON.stringify(events);
        */
    }
    async userGetJoinedEvents(username){
        //get
        return JSON.stringify(await this.connectAndRun(db => db.any("SELECT * FROM events WHERE event_id IN (SELECT event_id FROM joined_events WHERE username = $1);",[username])));
        
        /* Fake data
        const events = [
            {"eventid":5,"owner":"Prateek","title":"311 HW2","date":"11/21/20","time":"4:00PM","location":" Dubois library","description":"Doing the HW2 homework","capacity":"7/10"},
            {"eventid":6,"owner":"Aidan","title":" Soccer ","date":"11/26/20","time":"4:20PM","location":"East Soccer Fields","description":"5v5 pickup soccer game","capacity":"6/10"},
            {"eventid":7,"owner":"John","title":"Umass Real Estate Club","date":"12/20/20","time":"2:45","location":"Isenberg","description":"Group discussion of market","capacity":"11/50"},
            {"eventid":8,"owner":"Gerald","title":"377 HW 3","date":"11/31/20","time":"3:40","location":"OHill oak common room","description":"HW3 discussion","capacity":"7/15"}

        ];
        return JSON.stringify(events);
        */
    }
    async globalGetFeed(){
        //get
        return JSON.stringify(await this.connectAndRun(db => db.any("SELECT * FROM events;")));
        
        /* Fake data
        const events = [
            {"eventid":1,"owner":"George","title":"Book club","date":"11/16/20","time":"2:20pm","location":"Dubois library","description":"Lets talk about 1984","capacity":"5/10"},
            {"eventid":2,"owner":"George","title":"Frisbee club","date":"11/20/20","time":"4:20pm","location":"Campus pond","description":"Lets toss the disc some.","capacity":"7/15"},
            {"eventid":5,"owner":"Prateek","title":"311 HW2","date":"11/21/20","time":"4:00PM","location":"Dubois library","description":"Doing the HW2 homework","capacity":"7/10"},
            {"eventid":6,"owner":"Aidan","title":" Soccer ","date":"11/26/20","time":"4:20PM","location":"East Soccer Fields","description":"5v5 pickup soccer game","capacity":"6/10"},
            {"eventid":8,"owner":"Gerald","title":"377 HW 3","date":"11/31/20","time":"3:40","location":"OHill","description":"HW3 discussion","capacity":"7/15"},
            {"eventid":3,"owner":"George","title":"Seltzer Sampling","date":"12/9/20","time":"10:00am","location":"OHill","description":"Quality inspection on the new facilities","capacity":"3/5"},
            {"eventid":4,"owner":"George","title":"Pokemon Go","date":"12/17/20","time":"2:20pm","location":"Isenberg","description":"We will be trying to catch Mew","capacity":"30/40"},
            {"eventid":7,"owner":"John","title":"Umass Real Estate Club","date":"12/20/20","time":"2:45","location":"Isenberg","description":"Group discussion of market","capacity":"11/50"}
        ];
        return JSON.stringify(events);
        */
    }
    async globalGetFeedByLocation(longitude, latitude){
        //get
        return JSON.stringify(await this.connectAndRun(db => db.any("SELECT * FROM events WHERE location = $1;",[location])));
        
        /* Fake data
        const event_dict = {
            "isenberg":[
                {"eventid":4,"owner":"George","title":"Pokemon Go","date":"12/17/20","time":"2:20pm","location":"Isenberg","description":"We will be trying to catch Mew","capacity":"30/40"},
                {"eventid":7,"owner":"John","title":"Umass Real Estate Club","date":"12/20/20","time":"2:45","location":"Isenberg","description":"Group discussion of market","capacity":"11/50"}
            ],
            "OHill":[
                {"eventid":8,"owner":"Gerald","title":"377 HW 3","date":"11/31/20","time":"3:40","location":"OHill","description":"HW3 discussion","capacity":"7/15"},
            {"eventid":3,"owner":"George","title":"Seltzer Sampling","date":"12/9/20","time":"10:00am","location":"OHill","description":"Quality inspection on the new facilities","capacity":"3/5"}
            ],
            "Dubois library":[
                {"eventid":1,"owner":"George","title":"Book club","date":"11/16/20","time":"2:20pm","location":"Dubois library","description":"Lets talk about 1984","capacity":"5/10"},
                {"eventid":5,"owner":"Prateek","title":"311 HW2","date":"11/21/20","time":"4:00PM","location":"Dubois library","description":"Doing the HW2 homework","capacity":"7/10"}
            ],
            "Campus pond":[
                {"eventid":2,"owner":"George","title":"Frisbee club","date":"11/20/20","time":"4:20pm","location":"Campus pond","description":"Lets toss the disc some.","capacity":"7/15"}
            ],
            "East Soccer Fields":[
                {"eventid":6,"owner":"Aidan","title":" Soccer ","date":"11/26/20","time":"4:20PM","location":"East Soccer Fields","description":"5v5 pickup soccer game","capacity":"6/10"}
            ]
        };
        return  JSON.stringify(event_dict);
        */
    }
}