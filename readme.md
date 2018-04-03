# Wellness Organizer

Wellness Organizer is an interactive full-stack web app that helps users build their own wellness program that includes combination of nutrition and workout exercises by guiding them through the principle of consistent progress.

## Screenshots
![image](https://user-images.githubusercontent.com/31460531/38280706-d5a39ae2-3774-11e8-8030-2b9e7ad23342.png)
![image](https://user-images.githubusercontent.com/31460531/38280734-f704b2f2-3774-11e8-9526-82c7f7b414c5.png)
![image](https://user-images.githubusercontent.com/31460531/38280745-08d9dbe2-3775-11e8-9319-0933a50d1542.png)
![image](https://user-images.githubusercontent.com/31460531/38280777-2c88c7e2-3775-11e8-88bc-08862931e7d9.png)
![image](https://user-images.githubusercontent.com/31460531/38280797-4171435a-3775-11e8-89c1-08a93ac6f53c.png)

## Use Case
Wellness Organizer is for anyone who would like to try a new approach of managing his/her healthy lifestyle. This app will help you pick SMART goals which are - specific, measurable, achievable, relevant and timely!

## Initial UX

AS A VISITOR, NOT LOGGED IN

* As an initial visitor I want to land and see what the page is about so I can understand what the app does and decide whether or not to create an account to be able to use the app.
* As a visitor, I want to create a new account so that I can use the app.
(LANDING PAGE--wireframe will have title, logo, a few details about logging in and what the app is about)
![UI Flow handwritten draft](https://github.com/Marjona6/not-just-luck-thinkful-full-stack-capstone/blob/master/public/img/wf00.jpg)

* As a visitor, I want to be able to read about how the app works so that I can decide if I want to sign up for an account.

* As a visitor who has already created an account, I want to log in so that I can access my account.

AS A LOGGED-IN USER

* As a user, I want to be able to use or manipulate with the information about nutrition, workout, progress and notes.
![UI Flow handwritten draft](https://github.com/Marjona6/not-just-luck-thinkful-full-stack-capstone/blob/master/public/img/wf04.jpg)

* As a user, I want to view the "Champion" examples page.

* As a user, I want to be able to see the records page.

* As a user, I want to be able to edit or delete information about my records.
![UI Flow handwritten draft](https://github.com/Marjona6/not-just-luck-thinkful-full-stack-capstone/blob/master/public/img/wf01.jpg)
![UI Flow handwritten draft](https://github.com/Marjona6/not-just-luck-thinkful-full-stack-capstone/blob/master/public/img/wf02.jpg)
![UI Flow handwritten draft](https://github.com/Marjona6/not-just-luck-thinkful-full-stack-capstone/blob/master/public/img/wf03.jpg)

## Working Prototype
Find a working prototype with Node at https://wellness-organizer.herokuapp.com/ .

## Functionality
When set up an account, user will be taken to introduction page, where will be introduced to the wellness program and what are benefits of using it. User can choose either start with "Champion" examples page or right away get to the dashboard. On dashboard page user will be given prepack basic program which can be modified completely by user at any time for personal purposes. User will be able to submit the program on dashboard page and then see it on records page. At any time user be able to edit or delete the records information.

## Technical


### Front End
* HTML5
* CSS3
* JavaScript
* jQuery
### Back End
* Node.js
* Express.js
* MongoDB
* Mongoose
* mLab database
* Mocha and Chai for testing

### Responsive
* The app is responsive and optimized for both desktop and mobile viewing and use.

### Security
* User passwords are encrypted using bcrypt.js

## API Documentation
API endpoints for the back end include:
* POST to '/users/create' for creating a new user
* POST to '/signin' to sign in an existing user
* POST to '/new/create' to add an achievement to a user's list of accomplishments
* PUT to '/achievement/:id' to update an existing achievement
* GET to '/achievements/:user' to access all of a user's existing achievements
* GET to '/achievement/:id' to access a single achievement by ID
* DELETE to '/achievement/:id' to delete a single achievement by ID

## Development Roadmap
Planned additional features and improvements will allow users to:
* Have an option to invite friends and compete with them for better results
* Update email address
* Build a program for team to follow the program
