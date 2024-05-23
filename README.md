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

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
