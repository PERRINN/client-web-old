import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router'

@Component({
  selector: 'app-root',
  template: `
  <div id='main_container'>
    <div id='middle_column'>
      <div id='menu'>
        <member></member>
        <div style="float: left; width: 45px; margin-right: 15px; margin-bottom: 20px;">
        <img src="./../assets/App icons/icon_chat_01.svg" style="width:45px" routerLink="/chat" routerLinkActive="active">
        <div style="text-align: center; font-size: 9px; color: #FFF;">Chat</div>
        </div>
        <div style="float: left; width: 45px; margin-right: 15px; margin-bottom: 20px;">
        <img src="./../assets/App icons/icon_maps_01.svg" style="width:45px">
        <div style="text-align: center; font-size: 9px; color: #FFF;">Map</div>
        </div>
        <div style="float: left; width: 45px; margin-right: 15px; margin-bottom: 20px;">
        <img src="./../assets/App icons/icon_share_01.svg" style="width:45px">
        <div style="text-align: center; font-size: 9px; color: #FFF;">Wallet</div>
        </div>
        <div style="float: left; width: 45px; margin-right: 15px; margin-bottom: 20px;">
        <img src="./../assets/App icons/icon_images_02.svg" style="width:45px">
        <div style="text-align: center; font-size: 9px; color: #FFF;">Images</div>
        </div>
        <div style="float: left; width: 45px; margin-right: 15px; margin-bottom: 20px;">
        <img src="./../assets/App icons/icon_winner_gradient.svg" style="width:45px; border-radius:4px;" routerLink="/team" routerLinkActive="active">
        <div style="text-align: center; font-size: 9px; color: #FFF;">Team</div>
        </div>
        <div style="color:white; clear:left; font-size:10px">{{ (currentTeam | async)?.name }}</div>
      </div>
      <div id='app_container'>
        <router-outlet></router-outlet>
      </div>
    </div>
  </div>
  `,
})
export class AppComponent {
  currentUser: FirebaseObjectObservable<any>;
  currentUserID: string;
  firstName: string;
  lastName: string;
  photoURL: string;
  currentTeam: FirebaseObjectObservable<any>;
  currentTeamID: string;

  constructor(public afAuth: AngularFireAuth, public db: AngularFireDatabase, public router: Router) {
    this.afAuth.authState.subscribe((auth) => {
        if (auth == null) {
          this.currentUserID = "";
          this.firstName = "";
          this.lastName = "";
          this.photoURL = "./../assets/App icons/me.png";
          this.currentTeamID = "";
          this.currentTeam = null;
        }
        else {
          this.currentUserID = auth.uid;
          this.currentUser = db.object('users/' + (auth ? auth.uid : "logedout"));
          this.currentUser.subscribe(snapshot => {
            this.firstName = snapshot.firstName;
            this.lastName = snapshot.lastName;
            this.photoURL = snapshot.photoURL;
            this.currentTeamID = snapshot.currentTeam;
            this.currentTeam = db.object('teams/' + this.currentTeamID);
          });
        }
    });
  }

}
