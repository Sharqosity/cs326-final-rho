'use strict';

async function joinEvent(id) {
    const body = {
        id: id
    };

    const fetchurl = '/user/joinEvent';
    const res = await fetch(fetchurl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    res.text().then(function (text) {
        if (text === 'nologin') {
            const alert = document.getElementById('errorAlert');
            alert.innerHTML = '';
            alert.classList.add('alert');
            alert.classList.add('alert-danger');
            alert.setAttribute('role', 'alert');
            alert.innerHTML = 'You must be logged in to join an event! <a href="/login">Log in</a>';
            window.scrollTo(0, 0);

        } else if (text === 'maxcap') {
            const alert = document.getElementById('errorAlert');
            alert.innerHTML = '';
            alert.classList.add('alert');
            alert.classList.add('alert-danger');
            alert.setAttribute('role', 'alert');
            alert.innerHTML = 'This event is full!';
            window.scrollTo(0, 0);
        } else if (text === 'OK') {
            getEvents();
        }
    });
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
    getEvents();
}

async function getMyEvents() {
    const joinedEventsURL = '/user/getjoinedevents';
    const res = await fetch(joinedEventsURL);
    const json = await res.json();
    return json;
}

async function getNumerator(event_id) {
    const body = {
        id: event_id
    };

    const url = '/user/getEventCurrentJoined';

    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
    const json = await res.json();
    return json[0].count;
}

async function getEvents() {

    //First fetch the events we are in so we can check with all global events after.
    const myEvents = await getMyEvents();

    const feedCol = document.getElementById('feedCol');
    feedCol.innerHTML = '';
    // const feedurl = 'http://localhost:8080/globalgetfeed';
    const feedurl = '/globalgetfeed';
    fetch(feedurl).then(function (response) {
        if (!response.ok) {
            const empty = document.createElement('h5');

            const emptyText = document.createTextNode('Error getting upcoming events.');
            empty.appendChild(emptyText);
            feedCol.appendChild(empty);
        }
        return response;
    }).then(response => response.json())
        .then(async data => {
            if (data.length === 0) {
                const empty = document.createElement('h5');

                const emptyText = document.createTextNode('There are no upcoming events!');
                empty.appendChild(emptyText);
                feedCol.appendChild(empty);
            }

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
                const locText = document.createTextNode("📍".concat(item.location));
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

                //Capacity
                const numerator = await getNumerator(item.event_id);

                const cap = document.createElement('p');
                cap.classList.add('card-text');
                const capText = document.createTextNode('Capacity: ' + numerator + '/' + item.capacity);
                cap.appendChild(capText);

                const btndiv = document.createElement('div');
                const btn = document.createElement('button');
                let btntext = document.createTextNode('');
                btn.type = 'button';
                btn.classList.add('btn');
                btn.classList.add('btn-primary');
                btn.classList.add('button_fill');

                const name = document.createElement('h6');
                name.classList.add('card-subtitle');
                name.classList.add('mb-2');
                name.classList.add('text-muted');
                const str3 = "                  Created By: ";
                name.appendChild(document.createTextNode(str3.concat(item.username)));

                //Check if we are in the event, to make the button
                let joined = false;
                for (const joinedEvent of myEvents) {
                    if (item.event_id === joinedEvent.event_id) {
                        joined = true;
                        break;
                    }
                }

                if (joined) {
                    btn.addEventListener('click', () => { leaveEvent(item.event_id); });
                    btntext = document.createTextNode('Leave');

                } else { //event not joined
                    btn.addEventListener('click', () => { joinEvent(item.event_id); });
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
                cardBody.appendChild(document.createElement('br'));
                cardBody.appendChild(name);

                cardTextLeft.appendChild(cardBody);
                card.appendChild(cardTextLeft);
                row.appendChild(card);

                feedCol.appendChild(row);
            }
        });
}


//Load feed
window.addEventListener('load', getEvents);