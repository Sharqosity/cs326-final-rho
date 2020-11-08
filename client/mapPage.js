








function populateDropdown(){
    console.log("hello");
    const row = document.getElementById('dropdownmenus');
    row.innerHTML='';
    const myeventsurl = 'http://localhost:8080/globalgetfeed/bylocation';
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




