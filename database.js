

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
    userCreate(){
        //post
    }
    userEdit(){
        //post
    }
    userDelete(){
        //post
    }
    userGetMyEvents(){
        //get
        //Owner Title date time location description capacity
        let events = [
            {"owner":"George","title":"Book club","date":"11/16/20","time":"2:20pm","location":"Dubois library","description":"Lets talk about 1984","capacity":"5/10"},
            {"owner":"George","title":"Frisbee club","date":"11/20/20","time":"4:20pm","location":"Campus pond","description":"Lets toss the disc some.","capacity":"7/15"},
            {"owner":"George","title":"Seltzer Sampling","date":"12/9/20","time":"10:00am","location":"New Worcester","description":"Quality inspection on the new facilities","capacity":"3/5"},
            {"owner":"George","title":"Pokemon Go","date":"12/17/20","time":"2:20pm","location":"Isenberg","description":"We will be trying to catch Mew","capacity":"30/40"}
        ]
        return JSON.stringify(events);
    }
    userGetJoinedevents(){
        //get
        let events = [
            {"owner":"Prateek","title":"311 HW2","date":"11/21/20","time":"4:00PM","location":" Dubois library","description":"Doing the HW2 homework","capacity":"7/10"},
            {"owner":"Aidan","title":" Soccer ","date":"11/26/20","time":"4:20PM","location":"East Soccer Fields","description":"5v5 pickup soccer game","capacity":"6/10"},
            {"owner":"John","title":"Umass Real Estate Club","date":"12/20/20","time":"2:45","location":"Isenberg","description":"Group discussion of market","capacity":"11/50"},
            {"owner":"Gerald","title":"377 HW 3","date":"11/31/20","time":"3:40","location":"OHill oak common room","description":"HW3 discussion","capacity":"7/15"}

        ]
        return JSON.stringify(events);
        
    }
    globalGetFeed(){
        //get
        let events = [
            {"owner":"George","title":"Book club","date":"11/16/20","time":"2:20pm","location":"Dubois library","description":"Lets talk about 1984","capacity":"5/10"},
            {"owner":"George","title":"Frisbee club","date":"11/20/20","time":"4:20pm","location":"Campus pond","description":"Lets toss the disc some.","capacity":"7/15"},
            {"owner":"Prateek","title":"311 HW2","date":"11/21/20","time":"4:00PM","location":"Dubois library","description":"Doing the HW2 homework","capacity":"7/10"},
            {"owner":"Aidan","title":" Soccer ","date":"11/26/20","time":"4:20PM","location":"East Soccer Fields","description":"5v5 pickup soccer game","capacity":"6/10"},
            {"owner":"Gerald","title":"377 HW 3","date":"11/31/20","time":"3:40","location":"OHill","description":"HW3 discussion","capacity":"7/15"},
            {"owner":"George","title":"Seltzer Sampling","date":"12/9/20","time":"10:00am","location":"OHill","description":"Quality inspection on the new facilities","capacity":"3/5"},
            {"owner":"George","title":"Pokemon Go","date":"12/17/20","time":"2:20pm","location":"Isenberg","description":"We will be trying to catch Mew","capacity":"30/40"},
            {"owner":"John","title":"Umass Real Estate Club","date":"12/20/20","time":"2:45","location":"Isenberg","description":"Group discussion of market","capacity":"11/50"}
        ]
        return JSON.stringify(events);
    }
    globalGetFeedByLocation(){
        //get
        let event_dict = {
            "isenberg":[
                {"owner":"George","title":"Pokemon Go","date":"12/17/20","time":"2:20pm","location":"Isenberg","description":"We will be trying to catch Mew","capacity":"30/40"},
                {"owner":"John","title":"Umass Real Estate Club","date":"12/20/20","time":"2:45","location":"Isenberg","description":"Group discussion of market","capacity":"11/50"}
            ],
            "OHill":[
                {"owner":"Gerald","title":"377 HW 3","date":"11/31/20","time":"3:40","location":"OHill","description":"HW3 discussion","capacity":"7/15"},
            {"owner":"George","title":"Seltzer Sampling","date":"12/9/20","time":"10:00am","location":"OHill","description":"Quality inspection on the new facilities","capacity":"3/5"}
            ],
            "Dubois library":[
                {"owner":"George","title":"Book club","date":"11/16/20","time":"2:20pm","location":"Dubois library","description":"Lets talk about 1984","capacity":"5/10"},
                {"owner":"Prateek","title":"311 HW2","date":"11/21/20","time":"4:00PM","location":"Dubois library","description":"Doing the HW2 homework","capacity":"7/10"}
            ],
            "Campus pond":[
                {"owner":"George","title":"Frisbee club","date":"11/20/20","time":"4:20pm","location":"Campus pond","description":"Lets toss the disc some.","capacity":"7/15"}
            ],
            "East Soccer Fields":[
                {"owner":"Aidan","title":" Soccer ","date":"11/26/20","time":"4:20PM","location":"East Soccer Fields","description":"5v5 pickup soccer game","capacity":"6/10"}
            ]
        }
        return  JSON.stringify(event_dict);
    }
}