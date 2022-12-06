# BREW-SER: A Browser for Brews 🍻

Brew-ser is a brewery finder app, with functionality and use that depends on the type of user that logs in, and a retro design palette.

This application shows users a list of breweries and brewery associated beers. Users can create an account as a Beer Lover, Brewer, or Administrator.
Beer Lovers can view and add reviews for their favorite beers, while Brewers can make edits to their brewery information, & add or delete beers and reviews. Administrators have additional options including creating new breweries.

## Installation

### Backend

Create the database by running the "[create.sh](http://create.sh/)" script located in the database folder in your terminal. If the [create.sh](http://create.sh/) script fails, you can manually run each SQL query to create the databse.

```
cd <project-root>/database/
./create.sh
```

To run the backend application, open the "Java" folder in your preferred IDE, and run the "Application.java" file to start the server.

### Frontend

Install the project with npm, and then start the application with the "npm start" command.

```
  npm install
  npm start
```

## App Experience Options:
#### Beer Lover Experience
To experience BREW-SER as a beer drinker:
Click the “create account” button. Click the radio button next to “Beer Lover”.  
Choose a username and password on the login page, and then confirm the password. You will then be returned to the login screen. 
Login, and you will be taken to the “Brewery List” page. 

From there you can select the option to view our featured beers, and leave a rating for one, if you desire! Or, you can select “reviews” to see what other Beer Lovers think of any of our brews.

#### Brewer Experience
Brewer Experience
Users who register as Brewers will have the same abilities as Beer Lovers, plus the option to add a brewery and a beer. To register as a Brewer, you will have to contact BREWSTER admin for your username.

## Color Reference
| Color | Hex |
| --- | --- |
| Accent | #E6E6E6 |
| Light Brown | #C5A880 |
| Dark Brown | #532E1C |
| Black | #0F0F0F |

## Developers
BREW-SER was created by Team Mighty Nine, which consists of the following members/roles:
- [Haley Jones](https://www.github.com/haleyintech), Scrum Master and Frontend/Design
- [Chris Hurd](https://github.com/hurd1993), Backend
- [Jamie Hershberger](https://github.com/JamieHershberger), Frontend
- [Mitchell Nacion](https://github.com/mbnacion2), Frontend

## Screenshots
![BrewserLogin](https://user-images.githubusercontent.com/103456755/205998499-80bca2b0-864b-4b61-b766-a1f0edcf21d3.png)
![BrewserCreateAccount](https://user-images.githubusercontent.com/103456755/205998496-36036ce2-7645-454d-849c-20d16ba98fb7.png)
![BreweryList-Admin](https://user-images.githubusercontent.com/103456755/205998618-fbd8a2de-7301-44b5-a57f-2b06610b9ac4.png)
![BeersNBrews](https://user-images.githubusercontent.com/103456755/205998632-a068517a-5cb4-4917-93fa-390b29f278f4.png)
![BeersReviews](https://user-images.githubusercontent.com/103456755/205998650-3362a23c-ffe2-4449-b1da-d047af9aa09d.png)



