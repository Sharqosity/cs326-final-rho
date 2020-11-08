

export class DB{
    constructor(){
        //creates or loads database
    }


    newUser(){
        //post so nothing has to happen for now 
    }
    joinEvent(){
        //post so nothing has to happen for now 
    }
    unjoinEvent(owner,eventid){
        //post so nothing has to happen for now 
        console.log("asked to remove"+owner+"from"+ eventid.toString());
    }
    userCreate(){
        //post
    }
    userEdit(){
        //post
    }
    userDelete(eventid){
        console.log("asked to remove"+ eventid.toString()); 
    }
    getEvent(eventid){
        
    }
    userGetMyEvents(){
        //get
        //Owner Title date time location description capacity
        const events = [
            {"eventid":1,"owner ":"George","title":"Book club","date":"11/16/20","time":"2:20pm","location":"Dubois library","description":"Lets talk about 1984","capacity":"5/10"},
            {"eventid":2,"owner":"George","title":"Frisbee club","date":"11/20/20","time":"4:20pm","location":"Campus pond","description":"Lets toss the disc some.","capacity":"7/15"},
            {"eventid":3,"owner":"George","title":"Seltzer Sampling","date":"12/9/20","time":"10:00am","location":"New Worcester","description":"Quality inspection on the new facilities","capacity":"3/5"},
            {"eventid":4,"owner":"George","title":"Pokemon Go","date":"12/17/20","time":"2:20pm","location":"Isenberg","description":"We will be trying to catch Mew","capacity":"30/40"}
        ];
        return JSON.stringify(events);
    }
    userGetJoinedEvents(){
        //get
        const events = [
            {"eventid":5,"owner":"Prateek","title":"311 HW2","date":"11/21/20","time":"4:00PM","location":" Dubois library","description":"Doing the HW2 homework","capacity":"7/10"},
            {"eventid":6,"owner":"Aidan","title":" Soccer ","date":"11/26/20","time":"4:20PM","location":"East Soccer Fields","description":"5v5 pickup soccer game","capacity":"6/10"},
            {"eventid":7,"owner":"John","title":"Umass Real Estate Club","date":"12/20/20","time":"2:45","location":"Isenberg","description":"Group discussion of market","capacity":"11/50"},
            {"eventid":8,"owner":"Gerald","title":"377 HW 3","date":"11/31/20","time":"3:40","location":"OHill oak common room","description":"HW3 discussion","capacity":"7/15"}

        ];
        return JSON.stringify(events);
    }
    globalGetFeed(){
        //get
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
    }
    globalGetFeedByLocation(){
        //get
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
<<<<<<< HEAD
        }
=======
        };
>>>>>>> 41cef5d706e705cb1b8c63f4c077ffec956cd6aa
        return  JSON.stringify(event_dict);
    }
}