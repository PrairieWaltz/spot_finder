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
    "cloudinary": "^1.32.0",
    "connect-flash": "^0.1.1",
    "dotenv": "^16.0.3",
    "ejs": "^3.1.8",
    "ejs-mate": "^4.0.0",
    "express": "^4.18.2",
    "express-session": "^1.17.3",
    "joi": "^17.7.0",
    "method-override": "^3.0.0",
    "mongoose": "^6.7.0",
    "morgan": "^1.10.0",
    "multer": "^1.4.5-lts.1",
    "multer-storage-cloudinary": "^4.0.0",
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
- 11.29.22 -- Redirect to intended page function added. Working for all routes EXCEPT review route. Redirecting to 404 with path  ```/spots/(unique spot_id)/reviews```               need to drop the /reviews return from redirect. Being added due to ```req.session.returnTo = req.originalUrl;```
              line in middlewear. Need to redirect back to spot show page from the review POST button. 
- 11.30.22 -- Add authentication for all routes (will build middlewear to handle as everything works right). Add SpotAuthor to all actions (new, edit, delete, review).               Add author to main show page (will add for reviews next). Re-seeded database to reflect Author changes. Have yet to fix redirect error after user log-in               detailed on the 29th. Can't figure it out and trying not to break everything while I fix it. 
- 12.01.22 -- Refactor all routes. Controllers and Ratings complete. Rating STARS added to post form and by NUMBER added to review list. Auth for rating not complete,                will submit 1 star as default. Need to add js to handle rating input. 
- 12.02.22 -- Cloudinary set up and tested. Using MULTER to parse info for Cloudinary. Added .ENV for all environment variables. Images added to models and parsing to               Cloudinary and Mongoose (saving as URL sent from Cloudinary). 
- 12.03.22 -- Image upload for NEW and EDIT routes working. Cloudinary starage and API working. Mongoose getting URL link for images working. Styles are still                       temporary and getting more screwed up daily! All routes tested and working. 
- 12.04.22 -- All Image Basics complete. upload and delete routes working. Need to circle back and make sure all images are being deleted from Cloudinary on SPOT                     DELETE as well as IMAGE DELETE. Spot Delete currently NOT removing from Cloudinary storage. 
- 12.05.22 -- Maps added to INDEX and SHOW pages. Connection to populate db data working. PopUps on Single Spot markers working. Cluster map for INDEX working. Need to               style colors and grouping but overall looking OK. Just need to do a final refactor and should have a working Beta up and live ahead of schedule. 
