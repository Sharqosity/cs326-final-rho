
let marker;
let map;
let replace_id = false;
let event_id = -1;


function createMap(){
    let script= document.createElement('script');
    script.src= 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBYiznhqifgK52B9Qj51nNR1NBZ_PCc3qg&callback=initMapPagemap';
    script.defer=true;
    document.head.appendChild(script);

    window.initMapPagemap= function(){
        let options={
            zoom:16,
            center:{lat:42.3868, lng:-72.5301}
        }
        map=  new google.maps.Map(document.getElementById("map2"),options);
        google.maps.event.addListener(map, 'click', function(event) {
            console.log(event.latLng);
            placeMarker(event.latLng,map);     
          });
    }  
}

// function addMarker(eventobj,map){
//     var marker= new google.maps.Marker({
//         position:eventobj.coords,
//         map:map
//     });
//     var infoWindow= new google.maps.InfoWindow({
//         content: eventobj.content
//     });
//     marker.addListener('click',function(){
//         infoWindow.open(map,marker);
//     });
// }

function placeMarker(location,map) {

    if ( marker ) {
      marker.setPosition(location);
    } else {
      marker = new google.maps.Marker({
        position: location,
        map: map
      });
    }
  }


function editSetUp(){
    let edit_event_id = window.localStorage.getItem('editedeventid');
    //signifies that we are editing an event instead of creating one
    if(edit_event_id !== null){
        //make the 'create' button say 'update'
        document.getElementById('submit').innerHTML = 'Update';
        //now a get request for the actual information contained in that specific id 

        //with a real server we would obviously pass in an actual value for what event
        //const eventurl = 'http://localhost:8080/user/getmyevents';
        const eventurl = '/user/getmyevents';
        fetch(eventurl)
        .then(response=> response.json())
        .then( data=> { 
            console.log(data);
            let event = null;
            edit_event_id = parseInt(edit_event_id);
            console.log(edit_event_id);
            data.forEach(element => {
                console.log(element['event_id']);
                if(element['event_id'] === edit_event_id){
                    event = element;
                    console.log('matched!');
                }
            });
            //now set the approprite values
            console.log(event);
            
            // need to parse the date a little
            /*
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
            */
            document.getElementById('title').value = event['title'];
            document.getElementById('date').value = event['date'];
            document.getElementById('time').value = event['time'];
            document.getElementById('description').value = event['description'];
            document.getElementById('capacity').value = event['capacity'];
            document.getElementById('location').value = event['location'];
            placeMarker({lat: event['latitude'],lng: event['longitude']},map);
            event_id = window.localStorage.getItem('editedeventid');
            //this is so that we know the use update later on
            replace_id = true;
        });
        window.localStorage.removeItem('editedeventid');  
    }
    console.log('we tried to edit the event');
}

async function createEvent(){
    let newEvent = {};
    newEvent['title'] = document.getElementById('title').value;
    newEvent['date'] = document.getElementById('date').value;
    newEvent['time'] = document.getElementById('time').value;
    newEvent['location'] = document.getElementById('location').value;
    newEvent['description'] = document.getElementById('description').value;
    newEvent['capacity'] = document.getElementById('capacity').value;
    newEvent['owner'] = "placeholder ownder";
    newEvent['eventid'] = -1;
    if(marker !== undefined){
        newEvent['longitude']= marker.getPosition().lng();
        newEvent['latitude']= marker.getPosition().lat();
    }
    const validity = validInput(newEvent['title'],newEvent['date'],newEvent['time'],newEvent['location'],newEvent['description'], marker);
    if(validity === 0){
        //ik this looks dumb but I don't want event id 0 to be treated as false
        if(replace_id === false){
            let res = await fetch('/user/createEvent', {
                method: 'POST', 
                headers: {'Content-Type': 'application/json',},
                body: JSON.stringify(newEvent),
            });
            console.log("Created new event:");
            console.log(newEvent);  

            window.location.href = res.url;
        }
        else{
            //newEvent['event_id'] = window.localStorage.getItem('editedeventid');   
            newEvent['event_id'] = event_id;   
            //window.localStorage.removeItem('editedeventid');  
            let res = await fetch('/user/editEvent', {
                method: 'POST', 
                headers: {'Content-Type': 'application/json',},
                body: JSON.stringify(newEvent),
            });
            
            window.location.href = res.url;
        }
        document.getElementById('submit_warning').innerHTML = "Event created.";
    }
    else{
        console.log("hello");
        document.getElementById('submit_warning').innerHTML = validity + " And click submit again.";
    }
    
    
    //'http://localhost:8080/user/createEvent'
    
}

window.addEventListener('load', createMap);
window.addEventListener('load', editSetUp);
window.addEventListener('load',() =>{
    document.getElementById('submit').addEventListener('click',createEvent);
});

function validInput(title,date,time,location,description, marker){
    if(title.length > 48){
        return "Your title is too long. Please shorten to less than 48 characters.";
    }
    if(title.length === 0){
        return "Please enter a title!";
    }
    if(date.length === 0){
        return "Please enter a date!";
    }
    if(time.length === 0){
        return "Please enter a time!";
    }
    if(location.length === 0){
        return "Please pick a location!";
    }
    if(marker === undefined){
        return "Please select a location on the map."
    }
    if(description.length > 1000){
        return "Your description is too long. Please shorten to less than 1000 characters."
    }
    if(description.length === 0){
        return "Please enter a description!";
    }
    return 0;
};
