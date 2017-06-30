import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';


@Component({
  selector: 'user',
  template: `
  <div> {{ (item | async)?.firstName }} {{ (item | async)?.lastName }} </div>
  <img src=this.photoURL style="border-radius:4px; opacity:1; width:90px" routerLink="/user" routerLinkActive="active">
  <br />
  <input [(ngModel)]="this.firstName" placeholder="First name" />
  <br />
  <input [(ngModel)]="this.lastName" placeholder="Last name" />
  <br />
  <input [(ngModel)]="this.photoURL" placeholder="Photo URL" />
  <br />
  <button (click)="updateUserProfile()">Update profile</button>
  `,
})
export class UserComponent {
  item: FirebaseObjectObservable<any>;
  firstName= "";
  lastName= "";
  photoURL= "";
  userId = firebase.auth().currentUser.uid;

  constructor(db: AngularFireDatabase) {
    this.item = db.object('users/' + this.userId);
  }

  updateUserProfile() {
    this.item.update({
      firstName: this.firstName, lastName: this.lastName, photoURL: this.photoURL
    });
  }
}
