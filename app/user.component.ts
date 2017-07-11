import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router'

@Component({
  selector: 'user',
  template: `
  <div class="user">
  <div>
  <div style="float: left; width: 50%;">
  <input [(ngModel)]="this.firstName" placeholder="First name" />
  <input [(ngModel)]="this.lastName" placeholder="Last name" />
  <input [(ngModel)]="this.photoURL" placeholder="Photo URL" />
  </div>
  <div style="float: right; width: 50%;">
  <img [src]="this.photoURL" style="opacity:1; object-fit:contain; height:200px; width:100%" routerLink="/user" routerLinkActive="active">
  </div>
  </div>
  <div>
  <div style="float: right; width: 50%;">
  <button (click)="updateUserProfile()">Update profile</button>
  <button (click)="this.router.navigate(['login'])">Login/Logout</button>
  </div>
  </div>
  <div>
  <div style="float: right; width: 50%; text-align: right;">
  <div style="font-size:9px">ID: {{ focusUserID }}</div>
  </div>
  </div>
  </div>
  `,
})
export class UserComponent {
  currentUser: FirebaseObjectObservable<any>;
  currentUserID: string;
  focusUser: FirebaseObjectObservable<any>;
  focusUserID: string;
  firstName: string;
  lastName: string;
  photoURL: string;

  constructor(public afAuth: AngularFireAuth, public db: AngularFireDatabase, public router: Router) {
    this.afAuth.authState.subscribe((auth) => {
        if (auth == null) {
          this.focusUserID = "";
          this.currentUserID = "";
          this.firstName = "";
          this.lastName = "";
          this.photoURL = "./../assets/App icons/me.png";
        }
        else {
          db.object('users/' + auth.uid).subscribe( snapshot => {
            this.currentUserID = auth.uid;
            this.currentUser = db.object('users/' + this.currentUserID);
            this.focusUserID = snapshot.focusUserID;
            this.focusUser = db.object('users/' + this.focusUserID);
            this.focusUser.subscribe(snapshot2 => {
              this.firstName = snapshot2.firstName;
              this.lastName = snapshot2.lastName;
              this.photoURL = snapshot2.photoURL;
            });
          });
        }
    });
  }

  updateUserProfile() {
    this.focusUser.update({
      firstName: this.firstName, lastName: this.lastName, photoURL: this.photoURL
    });
  }

}
