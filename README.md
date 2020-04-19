Hand Gesture Adventure by Max Kim
===========================

This app is a very small scaffold to get you started using Teachable Machine. It will require an internet connection to work, since it loads ml5 as well as TensorFlow from a CDN.


## Basic Usage

```
npm install 
npm run watch
```

will start a webpack server at localhost:3000. Start by typing in your name and clicking "go". 

## Changelog
* changed index.html
* added start.html
* added images to public folder
* added text.json in root folder
* changed server.js to handle more routes


## Features
1. Ability to choose 3 moves based on hand gesture 
* Left: L shape with left hand, thumb pointing right
* Up: Two index fingers up, fists closed
* Right: rock sign with right hand. (thumb, index finger, and pinky finger up). Palm facing you. 

2. One single template HTML with multiple path information saved in json file. Placeholders for attributes on each page is saved in a json format, and used to navigate through pages based on the endpoint. 

3. Dynamically change links based on what the model determines the hand gestures are 


## Bugs
1. The name will be directly written to the html after each run, so in order to not get %name% show up after you try to run it from scratch, you may have to change it back to 

```
<p class="name">%name%</p>
```
