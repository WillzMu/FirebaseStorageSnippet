import React, { Component } from 'react';
import './App.css';
import firebase from './config.js'

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      image : ''
    }
    this.browsePicHandler = this.browsePicHandler.bind(this)
  this.uploadImageHandler = this.uploadImageHandler.bind(this)
  }
  
  browsePicHandler = (event) => {
    const reader = new FileReader();
    const file = event.target.files[0];
    reader.readAsDataURL(file);
    this.uploadImageHandler(file)
  }
  uploadImageHandler = function (file) {
    // Create a reference for the file so that we have a unique name in the storage and database
    var filePath = file.name;
    firebase.storage().ref(filePath).put(file).then(function (fileSnapshot) {
      // Generate a public URL for the file.
      return fileSnapshot.ref.getDownloadURL().then((url) => {
        // save URL of file in database
        return firebase.database().ref(`/`).set({
          imageURL: url
        });
      });
  
    }).catch(function (error) {
      console.error('There was an error uploading a file to Cloud Storage:', error);
    });
    //get imageURL from database and set it to a state 
    firebase.database()
    .ref(`/`)
    .on('value', (snapshot) => {
       var data = snapshot.val();
       this.setState({
         image : data.imageURL
       })
    })
  };
  render() {
    return (
      <div className="App">
        <p className="App-intro">
         Select an image
        </p>
        <input  type="file" className="form-control" accept="image/*" capture="camera"
         onChange={this.browsePicHandler}  />
         <img style={{marginTop:100}} src={this.state.image} alt="from database"/>
      </div>
    );
  }
}

export default App;
