# Photo Competition Web Application



The project is built with Firebase, Firestore, React and some JavaScript & CSS.

<img width="1323" alt="UI" src="https://user-images.githubusercontent.com/39140744/167510301-086e5721-d2cf-4707-b740-634876ae82a7.png">

Instruction and Functionality of this web app:

1. User Sign-in Status:
The log-in users are provided with more features and information on the sidebar and top bar.

2. User Sign-out Status:
The log-out users can only see the gallery page of the website and he needs to log in with their Google accounts.

3. Create Competition:
- Start Date: the first day users can join the competition and upload their photos
- End Date: the last day users can join the competition and upload their photos
- Voting End Date: the last day people can vote for a competition
-Error handling messages will pop-up when clicking the Create Button if it does not meet the following conditions:
  ❖ Start Date must be earlier than End Date
  ❖ End Date must be earlier than the Vote End Date
  ❖ Start Date must be earlier than the Vote End Date
  ❖ No empty fields

4. Join Competitions 
  ❖ Green Join button: to join a competition
  ❖ Red Unjoin button: to leave a joined competition
  -Error Handling message will pop-up if
    ❖ unjoin a not-joined competition
    ❖ join a joined competition

5. Upload/Delete photos for a single competition 
Figure 6 shows the upload process. Before the user uploads a photo, he will see the
preview and it is changeable. After he hits the upload button, the photo in the preview
will be uploaded to the server when the upload progress bar reaches 100% status.
Figure 7 shows the good upload status when the user uploads his photo successfully for the competition.
Figure 8 shows two competitions with different upload status. If the user deletes or forgot to upload the photo, there will be no photo
previews showing in the competition grid.
-Error Handling message will pop-up if a user try to upload multiple photos into the same competition

6. Vote competitions 
In the vote process, users can open the full gallery of a single competition and vote for the photo by hitting the vote button located
on the top-right corner of each photo in the competition. The vote number will increase by 1 each time. Also, for fairness, the name of the photographers will not show, but they will be displayed in the results page.

7. View Competition Results with Winner information
The Winners information is determined and displayed on the right panel of each
competition grid. More importantly, the app can handle the situation if there are
more than two winners with the same vote number. Users can also check competition details.

8. View Gallery
It navigates to the gallery page, which shows the photos in the database

--------------------------------------------------------------------------------------------------------------------------------------------------

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
