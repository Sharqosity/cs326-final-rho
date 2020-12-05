
<p style="color: red; font-weight: bold">>>>>>  gd2md-html alert:  ERRORs: 0; WARNINGs: 1; ALERTS: 7.</p>
<ul style="color: red; font-weight: bold"><li>See top comment block for details on ERRORs and WARNINGs. <li>In the converted Markdown or HTML, search for inline alerts that start with >>>>>  gd2md-html alert:  for specific instances that need correction.</ul>

<p style="color: red; font-weight: bold">Links to alert messages:</p><a href="#gdcalert1">alert1</a>
<a href="#gdcalert2">alert2</a>
<a href="#gdcalert3">alert3</a>
<a href="#gdcalert4">alert4</a>
<a href="#gdcalert5">alert5</a>
<a href="#gdcalert6">alert6</a>
<a href="#gdcalert7">alert7</a>

<p style="color: red; font-weight: bold">>>>>> PLEASE check and correct alert issues and delete this message and the inline alerts.<hr></p>



# <span style="text-decoration:underline;">Team Rho - Fall 2020</span>


## 
                Events@UMass

Fall  2020

Team Members:

By Aidan Nuzum Clark -  Github alias: AidanNC

George Jiang -  Github alias: Sharqosity

Prateek Agarwal - Github alias: prateekagarwa


## <span style="text-decoration:underline;">Overview</span>

Events@UMass is a social platform, designed specifically for the UMass community, which enables users to create social events that other users can join. In addition to simply joining events, users can use an interactive map to both place their events anywhere they want, and also view events anywhere on campus. 


## <span style="text-decoration:underline;">User Interface</span>

**Feed**

This page contains all of the upcoming events that different users have created. It allows users to look at them and join the events that interest them.



<p id="gdcalert1" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image1.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert2">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image1.png "image_tooltip")


**Map**

This page allows users to view the events on a map view as well as sort the events by different common locations such as the library or campus pond.



<p id="gdcalert2" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image2.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert3">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image2.png "image_tooltip")


**Create Event**

This page allows the user to create a new event, where they specify the name, date/time, location, and description.



<p id="gdcalert3" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image3.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert4">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image3.png "image_tooltip")


**Edit Event**

This page looks the same as the create event page but all the information is pre-populated with existing information from the event that is being edited. Once the user clicks the update button at the bottom,  it will update the existing event instead of creating a new one.



<p id="gdcalert4" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image4.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert5">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image4.png "image_tooltip")


**Profile**

This page allows users to see the events that they have created, as well as the ones they have joined.  There is also a button that lets the user log out of their account.



<p id="gdcalert5" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image5.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert6">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image5.png "image_tooltip")


**Login/Register**

These pages allow the user to either register a new account  or log into an existing account.



<p id="gdcalert6" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image6.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert7">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image6.png "image_tooltip")




<p id="gdcalert7" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image7.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert8">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image7.png "image_tooltip")



## <span style="text-decoration:underline;">Application API</span>

**GET endpoints**

	/user/getEvent


        Returns an event’s information from the database, given an event’s id in the request body.

	/user/getmyevents


        Returns a list of events that the user has created.

	/user/getjoinedevents


        Returns a list of events that the user has joined.

	/user/globalgetfeed


        Returns a list of events to display in the main feed page.

**POST endpoints**

	/login


        This endpoint receives the login information sent from the login page, and then authenticates the user. If this is successful, it redirects to the /profile route, otherwise it redirects to the /login route again.

	/register


        This endpoint receives a username and password from the register page. If the username and password are valid for a new user, then the account is created and the user is redirected to the /login route. Otherwise they are redirected to the /register route again.

	/user/joinEvent


        If the client is logged in: Adds the current user to the list of people who have joined the given event, provided that there is space in the event for them.

	/user/leaveEvent


        If the client is logged in: removes the current user from the list of people attending a given event.

	/user/createEvent


        If the client is logged in: create a new event with the given input values and serve them the profile page.

	/user/editEvent


        If the client is logged in: checks if the user is the owner of the event being edited, if they are, change the events’ values to the inputted ones. 

	/user/deleteEvent


        If the client is logged in: checks if the user is the owner of the event being deleted. If they are, delete the event.

	/user/getEventCurrentJoined


        Response returns the number of people who have joined a given event.


## <span style="text-decoration:underline;">Database</span>


<table>
  <tr>
   <td><strong>users</strong>: This table stores each user and their login information.
<p>
- username varchar(32)
<p>
	The username as a string.
<p>
- salt varchar(20)
<p>
	The salt as a string.
<p>
- hashed_password varchar(255)
<p>
	The hash of the user’s password + salt.
   </td>
  </tr>
  <tr>
   <td><strong>events</strong>: This table stores each event and its associated information.
<p>
- username varchar(32)
<p>
	The username of the event creator.
<p>
- event_id INT
<p>
	A unique identifier number for the event.
<p>
- title varchar(48)
<p>
	The event’s name shown to the users.
<p>
- date varchar(20)
<p>
	The date of the event, stored as a string in DD/MM/YYYY format.
<p>
- time varchar(20)
<p>
	The time of the event, stored as 24:00 format.
<p>
- location varchar(100)
<p>
	The event’s location as a string.
<p>
- longitude float(8)
<p>
	The longitude of the event location, set by clicking on the map.
<p>
- latitude float(8)
<p>
	The latitude of the event location, set by clicking on the map.
<p>
- description varchar(1000)
<p>
	The description of the event shown to the users.
<p>
- capacity INT
<p>
	The maximum set capacity of the event.
   </td>
  </tr>
  <tr>
   <td><strong>joined_events</strong>: This table holds all of the (user, event) pairs. Whenever a user joins an event, one of these pairs is created and added to the table.
<p>
- username varchar(32)
<p>
	The name of the user who joined the event.
<p>
- event_id INT
<p>
	The id of the event that the user joined.
   </td>
  </tr>
</table>



## <span style="text-decoration:underline;">URL Routes</span>

/login

	Serves the login page html.

/logout

	Logs the user out if they are logged in.

/register

	Serves the register page html.

/profile

Serves the profile page html, if the user is logged in. Otherwise	 redirects to login.

/feed

	Serves the feed page html.

/createEvent


    Serves the create event page html, if the user is logged in. Otherwise	 redirects to login.

/map

	Serves the map view page html.

/

	Main page, redirects to feed.


## <span style="text-decoration:underline;">Authentication</span>

Users are authenticated with passport, using the local strategy which accepts a username and password. After entering their credentials and clicking login, the information is sent to the /login POST endpoint for authentication. This is where the passport local strategy is used. Once authenticated, users can then join or leave other events, access their profile page to look at events they’ve interacted with, as well as create new events, and edit or delete their existing events.


## <span style="text-decoration:underline;">Division of Labor</span>

Prateek - Profile page, map page, event cards, general CSS, server map API

George- feed, event cards, authentication, server API, database

Aidan- create event/edit event pages, server API, database

Note: We did a lot of peer coding while talking in discord calls. 


## <span style="text-decoration:underline;">Conclusion</span>

George: Before I didn’t really know the whole picture of how a website was set up, or how exactly databases worked either, but working on this project has been a really good learning experience because we’ve more or less made the website from scratch. I was surprised at how simple some things were, like using express to set up the server, and making fetch requests from the client. The commands to interact with the database were fairly simple as well. It was also an interesting experience working with passport to implement the authentication functionality, deciding what users can and can’t do without authenticating.

Aidan: I really enjoyed learning how the different aspects of websites and servers work together. After taking this class, I feel like when I browse the web I understand what is going on behind the scenes much better. The workflow of html -> js/ server -> full integration was very helpful and seems like a useful process to use on future projects. In the future, or if I was doing this project again, I would try to set it up so that I could do more tests on my local machine instead of needing to push to Heroku. There were some difficulties getting express to work correctly because we didn’t realize that you couldn’t convert a post request to a get request but once that was understood we easily figured out what to do. 

Prateek: Before this class, I did not fully understand how a website functioned, especially between the frontend and backend. I am glad that I learned how to make a fully functional website, especially one that is immediately useful. I think we all learned a lot throughout the project, especially organizing the project into manageable chunks. I learned how database endpoints work and are structured, and how they communicate with the html pages,, and the redirects. I also learned the implementation of the logging in process and using a sql server. I found the server stuff to be the most tedious and challenging, especially the authentication portion, which I wish I would have known from before. The google maps api was daunting at first but proved to be easy at the end. 
