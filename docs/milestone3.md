
Heroku Link: events-umass.herokuapp.com
1. **Users** table: Stores the user’s login information. 

<table>
  <tr>
   <td>
<span style="text-decoration:underline;">Column</span>
   </td>
   <td><span style="text-decoration:underline;">Data Type</span>
   </td>
   <td><span style="text-decoration:underline;">Description</span>
   </td>
  </tr>
  <tr>
   <td>Username
   </td>
   <td>Varchar (32)
   </td>
   <td>Stores the unique username
   </td>
  </tr>
  <tr>
   <td>Salt
   </td>
   <td>Varchar (20)
   </td>
   <td>Stores the unique salt
   </td>
  </tr>
  <tr>
   <td>Hashed_Password
   </td>
   <td>Varchar(255)
   </td>
   <td>Stores the hashed password
   </td>
  </tr>
</table>




2. **Events** table: Stores the information about each event.

<table>
  <tr>
   <td>
<span style="text-decoration:underline;">Column</span> 
   </td>
   <td><span style="text-decoration:underline;">Data Type</span>
   </td>
   <td><span style="text-decoration:underline;">Description</span>
   </td>
  </tr>
  <tr>
   <td>Username
   </td>
   <td>Varchar(32)
   </td>
   <td>Stores the unique username of the user who owns the event.
   </td>
  </tr>
  <tr>
   <td>Event_id
   </td>
   <td>Int
   </td>
   <td>Stores the unique event id 
   </td>
  </tr>
  <tr>
   <td>Title
   </td>
   <td>Varchar(48)
   </td>
   <td>Stores the title of the event
   </td>
  </tr>
  <tr>
   <td>Date
   </td>
   <td>Varchar(20)
   </td>
   <td>Stores the date of the event
   </td>
  </tr>
  <tr>
   <td>Time
   </td>
   <td>Varchar(20)
   </td>
   <td>Stores the time of the event
   </td>
  </tr>
  <tr>
   <td>Location
   </td>
   <td>Varchar(100)
   </td>
   <td>Stores the location of the event
   </td>
  </tr>
  <tr>
   <td>Longitude
   </td>
   <td>Float(8)
   </td>
   <td>Stores the longitude of the event
   </td>
  </tr>
  <tr>
   <td>Latitude
   </td>
   <td>Float(8)
   </td>
   <td>Stores the latitude of the event
   </td>
  </tr>
  <tr>
   <td>Description
   </td>
   <td>Varchar(100)
   </td>
   <td>Stores the description of the event
   </td>
  </tr>
  <tr>
   <td>Capacity
   </td>
   <td>Int 
   </td>
   <td>Stores the maximum capacity of the event
   </td>
  </tr>
</table>




3. **Joined Events** table: Stores the information of users joining events.

<table>
  <tr>
   <td>
<span style="text-decoration:underline;">Column</span>
   </td>
   <td> <span style="text-decoration:underline;">Datatype</span> 
   </td>
   <td><span style="text-decoration:underline;">Description</span>
   </td>
  </tr>
  <tr>
   <td>Username
   </td>
   <td>Varchar(32)
   </td>
   <td>Stores the unique username of the user who has joined an event
   </td>
  </tr>
  <tr>
   <td>Event_id
   </td>
   <td>Int
   </td>
   <td>Stores the unique event id of the event which the user has joined.
   </td>
  </tr>
</table>


**Breakdown of Labor**



*   Prateek: mapPage, profilePage, Helped with some server backend
*   Aidan: createEvent Page, Login/Register,Database backend.
*   George: feed Page, Login/Register, Server backend.
