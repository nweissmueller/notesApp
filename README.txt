CS193X Final Project
====================
Project Title: SimpleNotes
Your Name: Nikolas Weissmueller
Your SUNetID: nweissm

Overview
--------
SimpleNotes is a note-taking app that allows the user to create, update, and delete simple raw text notes. 
Each note contains a title and a content body. The application renders all notes in a sidebar, sorted by timestamp.
Notes are saved with MongoDB. 


Running
-------
You can start the SimpleNotes app by running `npm install`, then `npm start`. 
The app uses MongoDB storage, so be sure that the mogosh server is running (port mongodb://127.0.0.1) before starting the SmartNotes app.
The app uses no additional libraries beyond the packages included with starter code.

Do we need to load data from init_db.mongodb? No

Start-up:
On first start-up, when there are no notes in the DB, the app will open without any notes in the sidebar. 
To create a first note, enter text and/or title and click the New Note button. 
The app automatically saves new notes and any updates to exiting notes if there is text in the note's title or body.
Whenever you open the app at a later time, all your note records in MongoDB will be loaded automatically and displayed in the sidebar. 
See the "Features" section below for more information on app functionality.


Features
--------
Create New Note: Click the 'New Note' button to create a new note.
Edit Note: Click on a note in the side bar to select it. You can then edit its title and content.
Save Note: The app saves changes automatically when you switch notes or create a new one.
Delete Note: Double click on a note in the side bar to delete it.
View Notes: All notes are displayed in the sidebar, containing titles and timestamps.
Title autocomplete: If you do not enter a title, the app will use the first 5 words in the text as the title.
Mobile-friendly: Resize the browser window to a narrow width (column) and see the app change its layout.
Accessibility: Aria-labels are included in HTML and have specific CSS to be hidden unless settings request them. 


Collaboration and libraries
---------------------------
I developed this project individually and without collaboration. 
This project does not overlap with another project or coursework for another class.
Libraries: Express is used for the backend server, MongoDB for the database, and JavaScript for frontend interactions.
External code: I leveraged a few code chunks from my CS193X homework for api/index.js, public/index.js, and app.js.
Inspiration: Some of the SimpleNotes app layout and functionality was inspired by Apple's `Notes` app.


Anything else?
-------------
The project evolved from SmartNotes (proposal/milestone) to SimpleNotes. The additional complexity to integrate LLM responses would have 
complicated the project's objectives, and so I decided to keep it simple. 
Regarding project objectives, I believe that my project meets or exceeds all Technical Requirements for Frontend, Backend, and Style as outlined 
in the class' grading rubrik here: https://web.stanford.edu/class/cs193x/project/
In addition, my project also includes functionality to be app mobile-friendly and accessible to people using assistive technology.

Overall, CS193X has been a wonderful course! As my last CS-class before graduating this June (MS in Statistics), I was eager to learn more about 
full stack development. Specifically, I hoped to gain a better understanding of core tools (JS, Node, Express), concepts (fetch, await, REST API, etc.), 
and acquire practical skills to build simple apps. This course has delivered on all of these points. 
I greatly enjoyed Michael's lectures, his fun teaching style, and his support on Ed. A big THANK YOU to the entire teaching staff!