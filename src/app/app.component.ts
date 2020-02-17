import { Component, OnDestroy, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'portfolio';

  constructor( ) {
 	const config = {
	        apiKey: "AIzaSyChm6OkXLIJk-FvtEhkpm2fdnMXzbR_pBs",
		    authDomain: "portfolio-77c7f.firebaseapp.com",
		    databaseURL: "https://portfolio-77c7f.firebaseio.com",
		    projectId: "portfolio-77c7f",
		    storageBucket: "portfolio-77c7f.appspot.com",
		    messagingSenderId: "428897352936",
		    appId: "1:428897352936:web:259e65e77d233750271d5d",
		    measurementId: "G-DGVT1KJZS9"
	    };
	  firebase.initializeApp(config);
 }

	ngOnInit() {}
}
