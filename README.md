![SFlogoRed](https://user-images.githubusercontent.com/85768337/202937010-e85f55bf-ae63-4ffb-99a6-2cf499f5bfee.png)

## Skate it. Rate it. Pass it to the left. 

Ever found yourself in a new city with some time to spare but no way to find good local spots? SpotFinder will allow you to search for, post, rate, and review your favorite (or not so favorite) skate spots worldwide. 

Using Mongoose for database storage and Express for all routing this web based CRUD app is simple under the hood and very user friendly. All styles are 100% vanilla CSS. 

## Package | Library | Database

HTML | CSS | JavaScript | Express | Node | Mongoose DB

## Dependencies
#### All Dependencies Used
```
  "dependencies": {
    "connect-flash": "^0.1.1",
    "ejs": "^3.1.8",
    "ejs-mate": "^4.0.0",
    "express": "^4.18.2",
    "express-session": "^1.17.3",
    "joi": "^17.7.0",
    "method-override": "^3.0.0",
    "mongoose": "^6.7.0",
    "morgan": "^1.10.0",
    "passport": "^0.6.0",
    "passport-local": "^1.0.0",
    "passport-local-mongoose": "^7.1.2"
  }
```
To run locally you will need MongoDB for testing. Mongosh was used for all development. 

## Color Palette
- `#003049`
- `#D62828`
- `#F77F00`
- `#FCBF49`
- `#EAE2B7`

## App Status
In active development

## Estimated Publish Date
12.15.22

### Updates
- 11.01.22 -- Repo and basic set up. Site map and palette/style guide finalized. 
- 11.05.22 -- Basic pages and styles complete. Partials created and style test started. 
- 11.12.22 -- Form validation (vanilla JS) complete. Added to NEW, EDIT and REVIEW pages. All working. 
- 11.16.22 -- Rating, Review and Cookie functionality complete. 
- 11.21.22 -- Log-In, Register and Log-Out pages and function complete. All pages styled temp. 
- 11.22.22 -- Validation added to Log-In and Register forms. All working. 
- 11.25.22 -- Authorization function for NEW and DELETE added. Site-Wide auth added to all routes. Validation and Auth for client and server side all working. 
- 11.27.22 -- Flash messaging added to all routes. SUCCESS and ERROR flahes working. Need to be styled. 
- 11.29.22 -- Redirect to intended page function added. Working for all routes EXCEPT review route. Redirecting to 404 with path  ```/spots/(unique spot_id)/reviews``` need to drop the /reviews return from redirect. Being added due to ```req.session.returnTo = req.originalUrl;```
line in middlewear. Need to redirect back to spot show page from the review POST button. 
