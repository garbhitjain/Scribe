import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {

  user:any = {};
  message: string;

  constructor() {
    this.getProfile();
  }

  ngOnInit() {
  }

  getProfile(){

    let userId = firebase.auth().currentUser.uid;

    firebase.firestore().collection("users").doc(userId).get().then((documentSnapshot) => {

      this.user = documentSnapshot.data();
      this.user.displayName = this.user.firstName + " " + this.user.lastName;
      this.user.id = documentSnapshot.id;
      console.log(this.user);

    }).catch((error) => {
      console.log(error);
    })

  }
  update(){
    this.message="updating Profile...";

    firebase.auth().currentUser.updateProfile({
      displayName: this.user.displayName,photoURL: this.user.photoURL
    }).then(() => {
      let userId = firebase.auth().currentUser.uid;
      firebase.firestore().collection("users").doc(userId).update({
        firstName: this.user.displayName.split(' ')[0],
        lastName: this.user.displayName.split(' ')[1],
        hobbies: this.user.hobbies,
        interests: this.user.interests,
        bio: this.user.bio
      }).then(()=> {
        this.message = "Profile updated successfully.";

      }).catch((Error)=> {
        console.log(Error)
      })

    }).catch((Error)=> {
        console.log(Error)
      
  })
}
}