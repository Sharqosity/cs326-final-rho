
function editSetUp(){
    let edit_event_id = window.localStorage.getItem('editedeventid');
    //signifies that we are editing an event instead of creating one
    if(edit_event_id !== null){
        //now a get request for the actual information contained in that specific id 

        //with a real server we would obviously pass in an actual value for what event
        const eventurl = 'http://localhost:8080/user/getmyevents';
        fetch(eventurl)
        .then(response=> response.json())
        .then( data=> { 
            let event = null;
            edit_event_id = parseInt(edit_event_id);
            data.forEach(element => {
                if(element['eventid'] === edit_event_id){
                    event = element;
                    console.log('matched!');
                }
            });
            //now set the approprite values
            console.log(event);
            document.getElementById('title').value = event['title'];
            // need to parse the date a little
            let temp = event['date'].split('/');
            if(temp.length === 3){
                const date = "20" + temp[2] + "-" + temp[0] + "-" + temp[1];
                document.getElementById('date').value = date;
            }
            else{
                //the vote was in an invalid format
            }
            //need to parse the time a little 
            let time = "";
            temp = event['time'].split(':');
            let timeDiff = 0;
            if(temp[1].includes('pm')){
                timeDiff = 12;
            }
            time += String((parseInt(temp[0])+timeDiff)) + ":" + String(parseInt(temp[1]));
            document.getElementById('time').value = time;
            document.getElementById('description').value = event['description'];
            document.getElementById('capacity').value = event['capacity'].split('/')[1];
            
        });
        window.localStorage.removeItem('editedeventid');
        
    }
    console.log('we tried to edit the event');
}

function createEvent(){
    let newEvent = {};
    newEvent['title'] = document.getElementById('title').value
    newEvent['date'] = document.getElementById('date').value
    newEvent['time'] = document.getElementById('time').value
    newEvent['location'] = "placeholder Location";
    newEvent['description'] = document.getElementById('description').value
    newEvent['capacity'] = document.getElementById('capacity').value
    newEvent['owner'] = "placeholder ownder";
    newEvent['eventid'] = -1;


    fetch('http://localhost:8080/user/createEvent', {
        method: 'POST', 
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify(newEvent),
    });
    console.log("Created new event:");
    console.log(newEvent);
    
}

window.addEventListener('load', editSetUp);
window.addEventListener('load',() =>{
    document.getElementById('submit').addEventListener('click',createEvent);
});