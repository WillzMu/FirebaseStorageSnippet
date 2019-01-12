import React, { Component } from 'react';
import './App.css';
import firebase from './config.js'


//sign in the user anonymously
 firebase.auth().signInAnonymously().catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
  console.log(errorCode,errorMessage)
})

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      listOfImages : []
    }
    this.browsePicHandler = this.browsePicHandler.bind(this)
  this.uploadImageHandler = this.uploadImageHandler.bind(this)
  this.loadImages = this.loadImages.bind(this)
  this.loadImages()
  }

  //load images from firebase
  loadImages = ()=>{
    var element = []
    firebase.database()
      .ref(`/`)
      .once('value',(snapshot)=>{
        for (const index in snapshot.val()) {
          element.push(snapshot.val()[index])
        
  }
  this.setState({
    listOfImages: element})
      }) 
      element = []  
  }
  //gets the file from the input field
  browsePicHandler = (event) => {
    console.log('browse pic')
    const reader = new FileReader();
    const file = event.target.files[0];
    reader.readAsDataURL(file);
    this.uploadImageHandler(file)
  }
  uploadImageHandler = function (file) {
    // Create a reference for the file so that we have a unique name in the storage and database
    var filePath = file.name;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        firebase.storage().ref(filePath).put(file).then(function (fileSnapshot) {
          // Generate a public URL for the file.
          return fileSnapshot.ref.getDownloadURL().then((url) => {
            // save URL of file in database
        
            return firebase.database().ref(`/`).push({
              imageURL: url
            });
          });
         
        }).catch(function (error) {
          console.error('There was an error uploading a file to Cloud Storage:', error);
        });
        
      } else {
        // User is signed out.
      }
    }); 
    this.loadImages()
    
  };
  render() {
    return (
      <div>
        <p>
         Select an image
        </p>
        <input  type="file"  accept="image/*" 
         onChange={this.browsePicHandler}  />
         {/* map the arrage of images */}
         {(this.state.listOfImages!==[])? this.state.listOfImages.map((element,i)=><div><img key={i} src={element.imageURL} alt='snap'/></div>):null}
      </div>
    );
  }
}

export default App;
