import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as firebase from 'firebase/app' ;
import 'firebase/firestore';
import 'firebase/auth';




@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  content: string;
  title: string;
  editorConfig: any;
  @Output('postCreated') postCreated = new EventEmitter();
  constructor() { 
   
      this.editorConfig = {
      "editable": true,
      "spellcheck": true,
      "height": "auto",
      "min height": "150px",
      "width": "auto",
       "minwidth": "0",
      "translate":"yes",
      "enableToolbar": true,
      "showToolbar": false,
      "placeholder": "Enter text here .. ",
      "imageEndPoint": " ",
      "toolbar": [
      ["bold", "italic", "underline", "strikeThrough","superscript", "subscript"],
      ["Justifyleft", "Justifycenter", "JustifyRight", "Justify All", "indent", "outdent"],
      ["cut", "copy", "delete", "removeFormat", "undo","redo"],
      ["Paragraph", "blockquote", "removeBlockquote",
      "HorizontalLine",  "orderedList", "unorderedList"],
      ["link", "unlink"/*, "image"*/],
      ["code"]
      ]
    }
    
  }
      


  ngOnInit() {
  }

  createPost(){

//     let contentNode = schema.nodeFromJSON(this.content);
  //   let html: DocumentFragment = DOMSerializer.fromSchema(
    //   schema
     //).serializeFragment(contentNode.content);
    
    firebase.firestore().collection("posts").add({
      title: this.title,
      content: this.content,
      owner: firebase.auth().currentUser.uid,
      created: firebase.firestore.FieldValue.serverTimestamp()
    }).then((data) => {
      console.log(data);
      this.postCreated.emit();
    }).catch((Error) => {
      console.log(Error);
    })

  }
}
