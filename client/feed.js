

function joinEvent(errorTextDiv, id) {
    const body = {
        id: id
    };

    // const fetchurl = 'http://localhost:8080/user/joinEvent';
    const fetchurl = '/user/joinEvent';
    const res = fetch(fetchurl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    //TODO: if res not ok, add something to the html
    if (false) {
        errorTextDiv.innerHTML = '';
        const errorText = document.createTextNode('');
        errorTextDiv.appendChild(errorText);
    }
    
}

function leaveEvent(id) {
    const body = {
        id: id
    };
    const fetchurl = '/user/leaveEvent';
    fetch(fetchurl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

}

function getEvents() {

    //First fetch the events we are in so we can check with all global events after.
    const myEvents = {};
    const joinedEventsURL = '/user/getmyevents';
    fetch(joinedEventsURL).then(response => response.json()).then(data => {
        myEvents = data;
    });


    const feedCol = document.getElementById('feedCol');
    feedCol.innerHTML = '';
    // const feedurl = 'http://localhost:8080/globalgetfeed';
    const feedurl = '/globalgetfeed';
    fetch(feedurl).then(function(response) {
        if (!response.ok) {
            const empty = document.createElement('h5');

            const emptyText = document.createTextNode('Error getting upcoming events.');
            empty.appendChild(emptyText);
            feedCol.appendChild(empty); 
        }
        return response;
    }).then(response => response.json())
    .then(data => {
        if (data.length === 0) {
            const empty = document.createElement('h5');

            const emptyText = document.createTextNode('There are no upcoming events!');
            empty.appendChild(emptyText);
            feedCol.appendChild(empty);
        }
        console.log(data);
        for (const item of data) {
            
            const row = document.createElement('div');
            row.classList.add('row-md-4');

            const card = document.createElement('div');
            card.classList.add('card');
            card.classList.add('card-block');
            card.classList.add('eventcard');
            card.classList.add('mb-2');

            

            const cardTextLeft = document.createElement('div');
            cardTextLeft.classList.add('card');
            cardTextLeft.classList.add('text-left');
            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body');


            //TODO: add href to title?
            const title = document.createElement('h5');
            const titleText = document.createTextNode(item.title);
            title.appendChild(titleText);
            title.classList.add('card-title');


            const dateTime = document.createElement('h6');
            const dateTimeText = document.createTextNode(item.date + ", " + item.time);
            dateTime.classList.add('card-subtitle');
            dateTime.classList.add('mb-2');
            dateTime.classList.add('text-muted');
            dateTime.appendChild(dateTimeText);

            const loc = document.createElement('h6');
            const locText = document.createTextNode(item.location);
            loc.classList.add('card-subtitle');
            loc.classList.add('mb-2');
            loc.classList.add('text-muted');
            loc.appendChild(locText);

            const desc = document.createElement('div');
            desc.classList.add('scrollable');
            const descPar = document.createElement('div');
            descPar.classList.add('card-text');
            const descText = document.createTextNode(item.description);

            descPar.appendChild(descText);
            desc.appendChild(descPar);

            const cap = document.createElement('p');
            cap.classList.add('card-text');
            const capText = document.createTextNode('Capacity: ' + item.capacity);
            cap.appendChild(capText);

            //TODO: logic for already joined event (gray out button, say 'joined')
            const btndiv = document.createElement('div');
            const btn = document.createElement('button');
            const btntext;
            btn.type = 'button';
            btn.classList.add('btn');
            btn.classList.add('btn-primary');

            const errorTextDiv = document.createElement('div');
            errorTextDiv.classList.add('errorText');

            //Check if we are in the event, to make the button
            let joined = false;
            for (const joinedEvent of myEvents) {
                if (item.event_id === joinEvent.event_id) {
                    joined = true;
                    break;
                }
            }

            if (joined) {
                btn.addEventListener('click', () => {leaveEvent(item.event_id);});
                btntext = document.createTextNode('Leave');

            } else { //event not joined
                btn.addEventListener('click', () => {joinEvent(errorTextDiv, item.event_id);});
                btntext = document.createTextNode('Join');
            }


            



            btn.appendChild(btntext);
            btndiv.appendChild(btn);



            cardBody.appendChild(title);
            cardBody.appendChild(dateTime);
            cardBody.appendChild(loc);
            cardBody.appendChild(desc);
            cardBody.appendChild(cap);
            cardBody.appendChild(btndiv);
            cardBody.appendChild(errorTextDiv);

            cardTextLeft.appendChild(cardBody);
            card.appendChild(cardTextLeft);
            row.appendChild(card);

            feedCol.appendChild(row);
        }

    });
}



window.addEventListener('load', getEvents);
console.log('hello ');

