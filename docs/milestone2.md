

# **Part 0: Project API Planning**



*   /user/new - This endpoint is used to create new users for our application.
*   /user/joinEvent - This endpoint is used when users join an event, indicating that they plan to participate in it.
*   /user.unjoinEvent - This endpoint is used when users leave an event, indicating that they no longer plan to participate in it.
*   /user/createEvent- This endpoint is used to create new events for the user. It takes in a JSON with all the relevant event details. 
*   /user/editEvent- This endpoint is used to edit an event for a particular user. It sends up the updated details for the event. 
*   /user/deleteEvent- This endpoint is used to delete an event for a particular user. It takes in an eventid. 
*   /user/getEvent- This endpoint is used to get all the details for a particular event for a user. It takes in an eventid. 
*   /user/getmyevents-This endpoint gets all the events which were created by the particular user. Takes in a user id.
*   /user/getjoinedevents-This endpoint gets all the events which were created by the particular user. Takes in a user id. 
*   /globalgetfeed - This endpoint is used to get a list of upcoming events, so that they can be displayed in chronological order in the feed.
*   /globalgetfeed/bylocation - This endpoint is used to get a list of upcoming events grouped by location, so that users can find events on the map page.

Part 2: 



1. At least one set of four screenshots of your client interface with descriptions

Screenshot 1:

This is the main page of the application that shows all the different events that have been posted. This page READs all the different events that are available. 
   
![alt text](https://github.com/Sharqosity/cs326-final-rho/blob/main/Milestone2_images/Screen%20Shot%202020-11-08%20at%208.14.48%20PM.png)

Screenshot 2:

This page displays the map and where different events may be happening. It READs the events from the server. 
![alt text](https://github.com/Sharqosity/cs326-final-rho/blob/main/Milestone2_images/Screen%20Shot%202020-11-08%20at%208.15.02%20PM.png)


Screenshot 3:

This is the create event page which allows the user to create a new event. This CREATEs new events. If the user is editing an event then it will READ that event first and UPDATE it afterward.
![alt text](https://github.com/Sharqosity/cs326-final-rho/blob/main/Milestone2_images/Screen%20Shot%202020-11-08%20at%208.15.14%20PM.png)


Screenshot 4:

This page is a summary of the different events that the user has created as well as the joined. It READs the different events associated with the user and displays them.

![alt text](https://github.com/Sharqosity/cs326-final-rho/blob/main/Milestone2_images/Screen%20Shot%202020-11-08%20at%208.15.26%20PM.png)

