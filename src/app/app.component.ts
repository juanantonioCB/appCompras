import { Component,OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  ngOnInit(){
    firebase.initializeApp({
      apiKey: 'AIzaSyD8KjqzVcTSy-wt1iqepDR3xYbBMUFsDcM',
      authDomain: 'comprasapp-2a6e3.firebaseapp.com'
      });
  }
  title = 'appCompras';
}
