import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'auth',
  template: `
    <div style="width:200px">
    <div style="font-size:8px"> {{ (user | async)?.uid }} </div>
    <input [(ngModel)]="this.email" style="display:inline;width:auto;" type="text" id="email" name="email" placeholder="Email"/>
    <br/><br/>
    <input [(ngModel)]="this.password" style="display:inline;width:auto;" type="password" id="password" name="password" placeholder="Password"/>
    <br/><br/>
    <button (click)="login()">Login</button>
    <br/><br/>
    <button (click)="register(email,password)">Register</button>
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
  }
  logout() {
  }
  register() {
  }
}
