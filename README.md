This snippet is on how to use firebase storage and database.
I upload a file to firebase storage and retrieve the URL of the uploaded image and push it to the database. Then I fetch the URL from the database and render the image. Nice simple code with only one package :)
 
 To install firebase run
 #npm install --save firebase

 Once that is done create a project on the firebase platform 
 #https://console.firebase.google.com/

 Then go to project settings and select "Add firebase to web app". Copy your config files and past them in the config.js in your project directory.

 Run this line to initialize your local firebase project and ensure you are using the right project

 #firebase init

 Select "Database" and "Storage" by using spacebar key 

 It will ask which firebase project to associate with your local firebase project. Make sure you select the one you just created. A .firebasesrc file will be created showing you which project is default

 Press enter to proceed with creation of Database Rules and Storage Rules file. A firebase.json file will be created with those details

That is it you can now run the app!

