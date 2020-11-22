# Setup
Clone the repository.
Create a Heroku app, and link the local repository.
Install the Heroku postgres addon.
Create the tables that store the users, events, and each (user, event joined) pair with heroku psql:
 - CREATE TABLE users (username VARCHAR(32), salt VARCHAR(255), hashed_password varchar(255), PRIMARY KEY(username));
 - CREATE TABLE events (username VARCHAR(32), event_id INT, title VARCHAR(48), date VARCHAR(20), time VARCHAR(20), location VARCHAR(100), longitude float(8), latitude float(8), description VARCHAR(1000), capacity INT, PRIMARY KEY(event_id), FOREIGN KEY(username) REFERENCES users(username) ON DELETE CASCADE);
 - CREATE TABLE joined_events (username VARCHAR(32), event_id INT, FOREIGN KEY(username) REFERENCES users(username) ON DELETE CASCADE, FOREIGN KEY(event_id) REFERENCES events(event_id) ON DELETE CASCADE);
After deploying the code on heroku, the website should now work.
