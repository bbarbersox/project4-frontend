# project4-frontend
fishingwithmission frontend

Fishing with a Mission is a single page, full stack web app to support an annual one day vharity event that takes autistic kids and caregivers out fishing for a day.  The event is used to raise autism awareness and funding boston higashi school, a school serving autistic children from around the world..  The objectives of the web app are to allow event participants to register for the event, get additional info, and allow the event coordinator to view and manage the people (participants, volunteers, sponsors) and resources (teams and boats).

There is already a website (mylittlebuddysboat) that provides the charity event description and awareness.  The vision is this application would link toand provide back end processing for that web site.

The users of this site are:
  Coordinator oversees the event and coordinates all the activities
  Participants are attendants of the event
  Volunteers
  Sponsors
  Info Seekers

The is currently srtuctured tu support the management of the event.  It allows the event manager to mange the boats, participants (captains, crew, and participants), and teams.  It will be expanded to support the mangement of event volunteers and sponsors.  The intent is that users will be able to sign up themselves and/or a teamfor the event on the website.  Also the front end will be expanded to to be a promotional mechanism for the event.

The front end of the web app utilizes a bootstrap template, javascript & jquery, html, and a lot of AJAX calls supporting authntication (registration, login, and logout), creaation, reading, updating, and the deletion of records stored in the three data models (boats, teams, and participants) resding on the server.

The index.html is a single web page that is used to host the different views of the website.  From this page the user has all the atuhentication functions, and views (via tables and forms) that present the back end data and and allows the user to add, update, and delete data from all 3 data models.  Handle bars is utilized to render the data into the tables and the buttons which are used to manipulate the data.  Handle bars is only used to render data for the table views.  Handlebars is not used for the f orms creating and updating data.

The app.js file has numerous event handlers, routines provcessing ajax requests, and callbacks to handle responses and data coming back from the server.    All the data models are processable via the app.js.  The code is logically broken down into AJAX
processing, callbacks, event handlers, ux rotuines, and back end search processing.

User Stories
  Event Coordinator
    View participant profiles
    View team profiles
    View boat profiles
    A single view of all three of the above
    Create participants profiles
    Create team profiles
    Create boat profiles
    Assign participants to teams
    Assign participants to boats
    Assign teams to boats
    View open seats on a boat and other info regarding the boats

  Participant Actions
    Register for event
    Create profile
    Name - email address
    Date of birth
    Address
    Contact info - phone number
    Submit the profile
    Create profile for another participant
    Submit profile for another participant
    View boats & open seats on boat
    Choose boat to fish on (optional) - will be assigned by coordinator if no choice made
    Submit a boat for the event
    Pay registration fee for BBQ

  Sponsor Actions
    Create a profile

    View sponsorship levels
    Tournament
    Boat
    Pole
    Fish
    Choose a sponsorship level
    View sponsorship invoice
    Pay Sponsorship fee
    View sponsorship requirements
    Submit sponsor ship docs & images (of boats if being donated)

The front end of this web app is hosted on gh-pages on github at git@github.com:bbarbersox/project4-frontend.git

The back end of this web app is hosted on heroku at https://morning-reaches-9856.herokuapp.com/

The website backend is also in github at https://github.com/bbarbersox/project4-backend/blob/master/README.md

And finally the backend readme file is located at https://github.com/bbarbersox/project4-backend/blob/master/README.md

