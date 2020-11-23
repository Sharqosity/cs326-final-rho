

//1. Need to fetch the resources for the cards from the server , then added to the 
// rows quickly  

async function DeleteButton(eventid) {

    const deleteEvent = { "id": eventid };
    // fetch('http://localhost:8080/user/deleteEvent', {
    await fetch('/user/deleteEvent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(deleteEvent),
    });
    postMyEventsCards();
    postJoinedCards();
    //postrequests
}

function EditButton(eventid) {
    console.log("we are editing event: ${eventid}");
    if (window.localStorage.getItem('editedeventid') !== null) {
        window.localStorage.removeItem('editedeventid');
    }
    //redirects to create page with filled in details.
    window.localStorage.setItem('editedeventid', eventid);
}

async function LeaveButton(eventid) {

    //const leaveEvent= {"owner":"Aidan" , "eid": eventid };
    const body = {
        id: eventid
    };
    await fetch('/user/leaveEvent', {
        // fetch('http://localhost:8080/user/unjoinEvent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(body),
    });
    postMyEventsCards();
    postJoinedCards();
}


async function getNumerator(event_id) {
    const body = {
        id: event_id
    };

    const url = '/user/getEventCurrentJoined';

    const res = await fetch(url,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
    const json = await res.json();

    return json[0].count;

}

function postMyEventsCards() {
    // clear the row 
    const row = document.getElementById('my_events');
    row.innerHTML = '';

    // const myeventsurl = 'http://localhost:8080/user/getmyevents';
    const myeventsurl = '/user/getmyevents';
    // const myeventsurl = '/user/getmyevents';
    fetch(myeventsurl)
        .then(response => response.json())
        .then(async data => {
            for (let i = 0; i < data.length; i = i + 1) {
                const listitem1 = document.createElement('div');
                listitem1.classList.add('col-md-3');


                const listitem2 = document.createElement('div');
                listitem2.classList.add('card');
                listitem2.classList.add('card-block');
                listitem2.classList.add('eventcard');

                const listitem3 = document.createElement('div');
                listitem3.classList.add('card');
                listitem3.classList.add('text-left');

                const listitem4 = document.createElement('div');
                // listitem4.classList.add('card');
                listitem4.classList.add('card-body');

                const title = document.createElement('h5');
                title.classList.add('card-title');
                title.appendChild(document.createTextNode(data[i].title));

                const dandt = document.createElement('h6');
                dandt.classList.add('card-subtitle');
                dandt.classList.add('mb-2');
                dandt.classList.add('text-muted');
                dandt.appendChild(document.createTextNode(data[i].date.concat(' @', data[i].time)));


                const location = document.createElement('h6');
                location.classList.add('card-subtitle');
                location.classList.add('mb-2');
                location.classList.add('text-muted');
                const str = "📍";
                location.appendChild(document.createTextNode(str.concat(data[i].location)));

                const cardtxtdiv = document.createElement('div');
                cardtxtdiv.classList.add('scrollable');
                const cardtxt = document.createElement('p');
                cardtxt.classList.add('card-text');
                cardtxt.appendChild(document.createTextNode(data[i].description));
                cardtxtdiv.appendChild(cardtxt);


                const name = document.createElement('h6');
                name.classList.add('card-subtitle');
                name.classList.add('mb-2');
                name.classList.add('text-muted');
                const str3 = "                  Created By: You ";
                name.appendChild(document.createTextNode(str3));


                //get numerator
                const numerator = await getNumerator(data[i].event_id);

                const capacity = document.createElement('p');
                const str2 = 'Capacity: ' + numerator + '/' + data[i].capacity;
                capacity.classList.add('card-text');
                capacity.appendChild(document.createTextNode(str2));

                const buttons = document.createElement('div');
                const button1 = document.createElement('button');
                button1.classList.add('btn');
                button1.classList.add('btn-primary');
                button1.classList.add('button_fill');
                button1.classList.add('mr-1');
                button1.appendChild(document.createTextNode("Delete"));
                button1.onclick = function () {
                    DeleteButton(data[i].event_id);
                };

                const buttonfil = document.createElement('a');
                buttonfil.href = 'createEvent.html';

                const button2 = document.createElement('button');
                button2.classList.add('btn');
                button2.classList.add('btn-primary');
                button2.classList.add('button_fill');
                button2.classList.add('mr-1');
                button2.appendChild(document.createTextNode("Edit"));
                button2.onclick = function () {
                    EditButton(data[i].event_id);
                };
                // button2.onclick= "location.href='createEvent.html'";
                buttonfil.appendChild(button2);

                buttons.appendChild(button1);
                buttons.appendChild(buttonfil);

                listitem4.appendChild(title);
                listitem4.appendChild(dandt);
                listitem4.appendChild(location);
                listitem4.appendChild(cardtxtdiv);
                listitem4.appendChild(capacity);
                listitem4.appendChild(buttons);
                listitem4.appendChild(document.createElement('br'));
                listitem4.appendChild(name);

                listitem3.appendChild(listitem4);
                listitem2.appendChild(listitem3);
                listitem1.appendChild(listitem2);

                row.appendChild(listitem1);
            }
        });
}



function postJoinedCards() {
    // clear the row 
    const row = document.getElementById('joined_events');
    row.innerHTML = '';
    // const myeventsurl = 'http://localhost:8080/user/getjoinedevents';
    const myeventsurl = '/user/getjoinedevents';
    fetch(myeventsurl)
        .then(response => response.json())
        .then(async data => {
            for (let i = 0; i < data.length; i = i + 1) {
                const listitem1 = document.createElement('div');
                listitem1.classList.add('col-md-3');

                const listitem2 = document.createElement('div');
                listitem2.classList.add('card');
                listitem2.classList.add('card-block');
                listitem2.classList.add('eventcard');

                const listitem3 = document.createElement('div');
                listitem3.classList.add('card');
                listitem3.classList.add('text-left');

                const listitem4 = document.createElement('div');
                // listitem4.classList.add('card');
                listitem4.classList.add('card-body');

                const title = document.createElement('h5');
                title.classList.add('card-title');
                title.appendChild(document.createTextNode(data[i].title));

                const dandt = document.createElement('h6');
                dandt.classList.add('card-subtitle');
                dandt.classList.add('mb-2');
                dandt.classList.add('text-muted');
                dandt.appendChild(document.createTextNode(data[i].date.concat(' @', data[i].time)));


                const location = document.createElement('h6');
                location.classList.add('card-subtitle');
                location.classList.add('mb-2');
                location.classList.add('text-muted');
                const str = "📍";
                location.appendChild(document.createTextNode(str.concat(data[i].location)));

                const cardtxtdiv = document.createElement('div');
                cardtxtdiv.classList.add('scrollable');
                const cardtxt = document.createElement('p');
                cardtxt.classList.add('card-text');
                cardtxt.appendChild(document.createTextNode(data[i].description));
                cardtxtdiv.appendChild(cardtxt);

                //get numerator
                const numerator = await getNumerator(data[i].event_id);

                const capacity = document.createElement('p');
                const str2 = 'Capacity: ' + numerator + '/' + data[i].capacity;
                capacity.classList.add('card-text');
                capacity.appendChild(document.createTextNode(str2));


                const name = document.createElement('h6');
                name.classList.add('card-subtitle');
                name.classList.add('mb-2');
                name.classList.add('text-muted');
                const str3 = "                  Created By: ";
                name.appendChild(document.createTextNode(str3.concat(data[i].username)));



                const buttons = document.createElement('div');
                const button1 = document.createElement('button');
                button1.classList.add('btn');
                button1.classList.add('btn-primary');
                button1.classList.add('button_fill');
                button1.appendChild(document.createTextNode("Leave"));
                button1.onclick = function () {
                    LeaveButton(data[i].event_id);
                };
                buttons.appendChild(button1);

                listitem4.appendChild(title);
                listitem4.appendChild(dandt);
                listitem4.appendChild(location);
                listitem4.appendChild(cardtxtdiv);
                listitem4.appendChild(capacity);
                listitem4.appendChild(buttons);
                listitem4.appendChild(document.createElement('br'));
                listitem4.appendChild(name);

                listitem3.appendChild(listitem4);
                listitem2.appendChild(listitem3);
                listitem1.appendChild(listitem2);

                row.appendChild(listitem1);
            }
        });
}

window.addEventListener('load', postMyEventsCards);
window.addEventListener('load', postJoinedCards);


