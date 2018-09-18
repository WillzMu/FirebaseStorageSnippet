//firebase configuration
import firebase from 'firebase/app';
require('firebase/auth');
require('firebase/database');

var config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
  };
  firebase.initializeApp(config);

export default firebase;