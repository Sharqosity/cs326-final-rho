

function joinEvent(id) {
    const body = {
        id: id
    };

    // const fetchurl = 'http://localhost:8080/user/joinEvent';
    const fetchurl = '/user/joinEvent';
    fetch(fetchurl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
}

function getEvents() {

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
        if (JSON.stringify(data) === {}) {
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
            const btntext = document.createTextNode('Join');
            btn.type = 'button';
            btn.classList.add('btn');
            btn.classList.add('btn-primary');

            btn.addEventListener('click', () => {joinEvent(item.id);});

            btn.appendChild(btntext);
            btndiv.appendChild(btn);



            cardBody.appendChild(title);
            cardBody.appendChild(dateTime);
            cardBody.appendChild(loc);
            cardBody.appendChild(desc);
            cardBody.appendChild(cap);
            cardBody.appendChild(btndiv);

            cardTextLeft.appendChild(cardBody);
            card.appendChild(cardTextLeft);
            row.appendChild(card);

            feedCol.appendChild(row);
        }

    });
}



window.addEventListener('load', getEvents);
console.log('hello ');

