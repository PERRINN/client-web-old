import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'auth',
  template: `
    <div> {{ (user | async)?.email }} </div>
    <br/><br/>
    <input [(ngModel)]="this.email" style="display:inline;width:auto;" type="text" id="email" name="email" placeholder="Email"/>
    <br/><br/>
    <input [(ngModel)]="this.password" style="display:inline;width:auto;" type="password" id="password" name="password" placeholder="Password"/>
    <br/><br/>
    <button (click)="login()">Login</button>
    <br/><br/>
    <button (click)="register()">Register</button>
    <br/><br/>
    <button (click)="logout()">Logout</button>
  `,
})

export class AuthComponent  {

  email="";
  password="";
  user: Observable<firebase.User>;

  constructor(public afAuth: AngularFireAuth) {
    this.user = afAuth.authState;
  }

  login() {
    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password);
  }
  logout() {
    this.afAuth.auth.signOut();
  }
  register() {
    this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.password);
  }
}
