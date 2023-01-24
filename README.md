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

![https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) ![https://img.shields.io/badge/Express.js-404D59?style=for-the-badge](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge) ![https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) ![https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) ![Firebase](https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black)

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

- Utilized Firebase Authentication for user sign in and sign up pages
- Managed authentication screen stack flow for global state for authenticated users
- Sign up creates user and corresponding data points in Firebase Firestore with information and profile image.
    ![ezgif com-gif-maker](https://user-images.githubusercontent.com/59150695/214371736-04101068-2797-4f48-893c-112f8b311588.gif)

### User Profile

<img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/ec2e0508-74e3-4a84-8630-e27ef0443b9d/Screen_Shot_2023-01-21_at_4.04.44_PM.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230122%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230122T015742Z&X-Amz-Expires=86400&X-Amz-Signature=a834fce86f82ff257d969207835d12aeae4ea532344d9527d3f2a756b56e8004&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Screen%2520Shot%25202023-01-21%2520at%25204.04.44%2520PM.png%22&x-id=GetObject" width="157" height="340" />  <img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/e0fdace9-8e38-4b90-b417-f75dcdd2bfab/Screen_Shot_2023-01-21_at_4.05.26_PM.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230122%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230122T015821Z&X-Amz-Expires=86400&X-Amz-Signature=bd5f91b32a5a808af036235364e29c44c07053091cea5a083dac1fc47430e5f6&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Screen%2520Shot%25202023-01-21%2520at%25204.05.26%2520PM.png%22&x-id=GetObject" width="157" height="340" />  <img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/e4ed1afd-c181-456a-b3cb-418d70d8a805/Screen_Shot_2023-01-21_at_4.05.45_PM.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230122%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230122T015830Z&X-Amz-Expires=86400&X-Amz-Signature=7be2a52d3edb0e8efe6f498c8d7fb197cda1fcfbb2d4df26641f3fdc4c842cfe&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Screen%2520Shot%25202023-01-21%2520at%25204.05.45%2520PM.png%22&x-id=GetObject" width="157" height="340" />

- Main page showing the details of the signed-in user
- Expanded view of friends with buttons to unfriend
- Expanded view of user’s music tastes
- Edit page to edit music tastes and description


### Homepage

<img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/c4c63c0f-081a-4d3e-ab1f-19fbffbdf70d/Screen_Shot_2023-01-21_at_4.26.46_PM.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230122%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230122T015842Z&X-Amz-Expires=86400&X-Amz-Signature=2ce82dc8774f517fbeb4efff78e807ba3162382f4b5f395487a777da868392db&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Screen%2520Shot%25202023-01-21%2520at%25204.26.46%2520PM.png%22&x-id=GetObject" width="157" height="340" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://user-images.githubusercontent.com/3084586/214103264-6895f564-0c7c-4467-8360-2d09d77bc950.png" width="157" height="340" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <img src="https://user-images.githubusercontent.com/3084586/214104970-d2d0f62a-8f3c-4490-b05f-18951094615d.png" width="157" height="340" />

- Swipe cards displaying groups attending events. Swipe right to join or left to pass.
- Card expanded view, showing additional information about the group.
- Filter cards based on size and vibe.

### Groups

<img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/7da4fb51-2820-4ddc-97ed-a23fd914e82e/Screen_Shot_2023-01-21_at_4.47.48_PM.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230122%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230122T015909Z&X-Amz-Expires=86400&X-Amz-Signature=4f03fb3d37b62f05e145ba9ac7344f784dcabc2fca738d4b874915893cc4f377&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Screen%2520Shot%25202023-01-21%2520at%25204.47.48%2520PM.png%22&x-id=GetObject" width="157" height="340" />  <img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/be3edd12-db3b-460a-be44-b8d6b30a13f9/Screen_Shot_2023-01-21_at_4.48.40_PM.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230122%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230122T015911Z&X-Amz-Expires=86400&X-Amz-Signature=2d5005d416cd00528d6c3a6b6dbb668c0a4121717374d74da30b1c66761004ee&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Screen%2520Shot%25202023-01-21%2520at%25204.48.40%2520PM.png%22&x-id=GetObject" width="157" height="340" />  <img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/9766f863-6acd-4293-a8e1-0c8358307b2f/Screen_Shot_2023-01-21_at_4.49.16_PM.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230122%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230122T015913Z&X-Amz-Expires=86400&X-Amz-Signature=d0ddb4cb616dcfd70eaffa9ec06b16dcc39dd4822d49eee332c9d3be5ef22aec&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Screen%2520Shot%25202023-01-21%2520at%25204.49.16%2520PM.png%22&x-id=GetObject" width="157" height="340" />

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
