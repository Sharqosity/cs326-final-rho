



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
        let map=  new google.maps.Map(document.getElementById("map"),options);
        let  a= 5;
        let obj1 = { coords:{lat:42.3868, lng:-72.5301} , content: `<h4> The marker works ${a}</h4>`}
        addMarker(obj1, map); 
        //get the relevent dict,
        //then populate with add marker
    }  
}





function addMarker(eventobj,map){

    var marker= new google.maps.Marker({
        position:eventobj.coords,
        map:map
    });
    var infoWindow= new google.maps.InfoWindow({
        content: eventobj.content
    });
    marker.addListener('click',function(){
        infoWindow.open(map,marker);
    });

}



// // create map for createvent page
// google.maps.event(addEventListener(map,'click',
// addMarker({coords:event.latLng} )

// ))

// function addMarkers(){



// }


function populateDropdown(){
    console.log("hello");
    const row = document.getElementById('dropdownmenus');
    row.innerHTML='';
    const myeventsurl = '/globalgetfeed/bylocation';
    // const myeventsurl = '/user/getmyevents';
    fetch(myeventsurl)
    .then(response=> response.json())
    .then( data=> { 
        const placeslist= Object.keys(data);
        
        for(let i=0;i<placeslist.length;i++){
            
            const list1= document.createElement('div');
            list1.classList.add('dropdown');
            list1.classList.add('show');
            const maina= document.createElement('a');
            maina.classList.add('btn');
            maina.classList.add('btn-secondary');
            maina.classList.add('dropdown-toggle');
            maina.setAttribute("role","button");
            maina.setAttribute("id","dropdownMenuLink");
            maina.setAttribute("data-toggle","dropdown");
            maina.setAttribute("aria-haspopup","true");
            maina.setAttribute("aria-expanded","false");
            maina.appendChild(document.createTextNode( placeslist[i]));

            const list2= document.createElement('div');
            list2.classList.add("dropdown-menu");
            list2.setAttribute("aria-labelledby","dropdownMenuLink");
           
            for(let j=0;j<data[placeslist[i]].length;j++){
                const dropitem= document.createElement('a');
                dropitem.classList.add("dropdown-item");
                dropitem.appendChild(document.createTextNode( data[placeslist[i]][j].title.concat( " on ",data[placeslist[i]][j].date,"@",data[placeslist[i]][j].time)));
                list2.appendChild(dropitem);
            }
            list1.appendChild(maina);
            list1.appendChild(list2);
            row.appendChild(list1);
            row.appendChild(document.createElement('br'))

        }   
    });
}

window.addEventListener('load', populateDropdown);
window.addEventListener('load', createMap);




