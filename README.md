# **PAGER**

PAGER is a social app for ravers to connect and share experiences. The app allows users to join groups, discover upcoming events, make new friends, and chat with fellow ravers. With PAGER, you can easily find like-minded people to attend events with, join groups based on your music preferences, and even plan your own events. Why rave alone when you can connect with the rave community through PAGER?


## Built With

Frontend 

- React Native
- Redux
- JavaScript

Backend 

- Firebase
    - Authentication
    - Firestore
    - Cloud Messaging
    - Cloud Storage

## Technologies



![https://img.shields.io/badge/React%20Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB](https://img.shields.io/badge/React%20Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) ![https://img.shields.io/badge/Express.js-404D59?style=for-the-badge](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge) ![https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) ![https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) ![Firebase](https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black)

## Contributors

- Simon Buret de Longagne [@SimonBdeL]([https://github.com/SimonBdeL](https://github.com/SimonBdeL))
- Andrew Heim [@andepants]([https://github.com/andepants](https://github.com/andepants))
- Madeline King [@maddieking02]([https://github.com/maddieking02](https://github.com/maddieking02))
- Abigail Li [@palmigloo]([https://github.com/palmigloo](https://github.com/palmigloo))
- Charlie Um [@charlieum]([https://github.com/charlieum](https://github.com/charlieum))
- Joshua Vilela [@joshuavilela]([https://github.com/joshuavilela1](https://github.com/joshuavilela1))
- Jeffrey Zhang [@Jeffreyzhangsd]([https://github.com/Jeffreyzhangsd](https://github.com/Jeffreyzhangsd))
<br />
<p align="center">
<a href="https://github.com/SimonBdeL"><kbd><img width="125" alt="Simon" src="https://user-images.githubusercontent.com/3084586/214108755-16d2f668-e287-4c70-9bfb-86257a4bc793.png"></kbd></a>
<a href="https://github.com/andepants"><kbd><img width="125" alt="Andrew" src="https://user-images.githubusercontent.com/3084586/214108759-991fb017-2303-4405-8f9b-0231f0e4ade0.png"></kbd></a>
<a href="https://github.com/maddieking02"><kbd><img width="125" alt="Madelline" src="https://user-images.githubusercontent.com/3084586/214108752-cdd3984e-8ceb-4a91-a412-48eae18aac27.png"></kbd></a>
<a href="https://github.com/palmigloo"><kbd><img width="125" alt="Abigail" src="https://user-images.githubusercontent.com/3084586/214108734-a204be6c-9982-4d42-88e7-9abbc1ff2eb0.png"></kbd></a>
<a href="https://github.com/charlieum"><kbd><img width="125" alt="Charlie" src="https://user-images.githubusercontent.com/3084586/214108745-9dff6439-8d59-4e23-b6d2-29da44166915.png"></kbd></a>
<a href="https://github.com/joshuavilela1"><kbd><img width="125" alt="Joshua" src="https://user-images.githubusercontent.com/3084586/214108740-2ab3e842-b2b4-4549-97b6-6a454d3c8a3c.png"></kbd></a>
    <a href="https://github.com/JeffreyZhangsd"><kbd><img width="125" alt="Jeffrey" src="https://user-images.githubusercontent.com/3084586/214108748-ef7355bb-6e70-42f0-bcc7-5f03a518ad63.png"></kbd></a>
</p>




## Key Features

### Firebase Services
- Our team decided to use Firebase as it offered a wide variety of services for our product that can be easily integrated in our application such as real-time databases using Firestore, login and register account pages using Firebase Authentication , Real-time chat messages using Cloud Messaging and the ability to upload photos using Cloud Storage.
- This allowed us to focus on the user experience without worrying about the backend services needed to run the application.

### Login

![ezgif com-gif-maker](https://user-images.githubusercontent.com/59150695/214371736-04101068-2797-4f48-893c-112f8b311588.gif)

- Utilized Firebase Authentication for user sign in and sign up pages
- Managed authentication screen stack flow for global state for authenticated users
- Sign up creates user and corresponding data points in Firebase Firestore with information and profile image.

### User Profile

- Main page showing the details of the signed-in user
- Expanded view of friends with buttons to unfriend
- Expanded view of user’s music tastes
- Edit page to edit music tastes and description


### Homepage

<img src="https://user-images.githubusercontent.com/112330601/215922513-145c0c86-cc62-4352-a341-44ac16473c3b.gif" width="157" height="340" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://user-images.githubusercontent.com/3084586/214103264-6895f564-0c7c-4467-8360-2d09d77bc950.png" width="157" height="340" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <img src="https://user-images.githubusercontent.com/3084586/214104970-d2d0f62a-8f3c-4490-b05f-18951094615d.png" width="157" height="340" />

- Swipe cards displaying groups attending events. Swipe right to join or left to pass.
- Card expanded view, showing additional information about the group.
- Filter cards based on size and vibe.

### Groups

### All Groups

- Tabular design to view a user’s upcoming and attended groups
- Tab for user to create their own group and upload group images

### Individual Groups

- Overview of group details with members and brief schedule
- Full schedule list where owner has the ability to add/delete plans

### Chat

- Each individual group has their own chatrooms that they can talk with their respective members to discuss plans for their event.

### Getting Started 

1. Create a Firebase project at [Firebase](https://firebase.google.com/) and create a firestore, authentication with email and password, cloud storage, and cloud messaging.
2. Input the Firebase SDK to the app’s dependencies. More details for how to do this step in the official [Firebase Documentation](https://firebase.google.com/docs/web/setup)
3. Go into the client of our repo
4. Run ```npm i``` in the terminal  

1. Run npm run start into the terminal
2. Go to [localhost:19006](http://localhost:19006) to access the app by hitting the "w" key in the terminal
