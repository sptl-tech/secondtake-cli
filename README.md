# Second Take

https://secondtake-40b4f.firebaseapp.com/

> A social media web application for sports fans to engage in discussions and debates. Created with the React library in the front-end and Firebase with the Express.JS framework for the back-end. 

---

### Table of Contents
You're sections headers will be used to reference location of destination.

- [Description](#description)
- [How To Use](#how-to-use)
- [Acknowledgments](#acknowledgments)
- [License](#license)
- [Author Info](#author-info)

---

## Description
Video Guide of all Features - [Video](https://drive.google.com/file/d/1-uYZVd0fhgjsjVbMPWgTYTUMVylddx1l/view?usp=sharing)

This project was inspired by the sports talk show First Take. The show consists of several sports commentators who have debates on topics that are trending in the sports world. I often found many fans giving thier opinions in the comments and on social media, so I wanted to create an application which allows fans to interact with each other and replicate those same discussions as on First Take.  

#### Technologies

- React
- Redux
- Firebase
- Express.JS (Node.JS application framework)
- Material-UI
- Postman (API testing)

[Back To The Top](#second-take)

---

## How To Use

#### Prerequistes 
- Download Node.JS Installer (https://nodejs.org/en/download/). The installer comes with the NPM package manager. 
- Configure Firebase with a Google account (https://firebase.google.com/)

#### Installation
Clone the GitHub Repository 

```sh
git clone https://github.com/sptl-tech/secondtake-cli.git
```

Run NPM to install all necessary packages/dependencies
```sh
npm install
```


#### API Reference
The panels below highlight some of the API calls

Takes (posts)
```sh
GET /takes -- retreive all posts
GET /take/:takeId -- retreieve a specific post 
GET /take/:takeId/like -- liking a take
GET /take/:takeId/unlike -- unliking a take
```
```sh
POST /take -- posting a take
POST /take/:takeId/comment -- adding comment to a post 
DELETE /take/:takeId -- delete a take
```

Users
```sh
GET /user -- retreive all user data 
GET /user/:handle -- retreieve details for specific user (depending on handle)
```
```sh
POST /signup -- signup a new user
POST /login -- authenticate an existing user 
POST /user/image -- uploading profile picture
POST /user -- Adding and editing user details
```

[Back To The Top](#second-take)

---

## Acknowledgments
- Introduction to React by Bob Ziroll (@bobziroll) -- https://www.youtube.com/watch?v=DLX62G4lc44
- Material-UI for styling -- https://material-ui.com/
- Create a Social Media App: Here’s Everything you Need to Know by Pavel Gertsberg. Introduction and structured approach for application -- https://www.disciplemedia.com/social-networks/create-a-social-media-app/
- Hosting a Static Website on Firebase by Aleem Uddin -- https://medium.com/@aleemuddin13/how-to-host-static-website-on-firebase-hosting-for-free-9de8917bebf2

[Back To The Top](#second-take)

---

## License

MIT License

Copyright (c) [2020] [Sahil Patel]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

[Back To The Top](#second-take)

---

## Author Info

- Website - [Sahil Patel](https://sptl-tech.github.io/)
- LinkedIn - [Sahil Patel](https://www.linkedin.com/in/sahilpatel-0/)

[Back To The Top](#second-take)

