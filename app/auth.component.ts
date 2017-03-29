import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'auth',
  template: `
    <div style="width:200px">
    <div style="font-size:8px"> {{ (af.auth | async)?.uid }} </div>
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
  constructor(public af: AngularFire) {}
  login() {
    this.af.auth.login({email: this.email,password: this.password});
  }
  logout() {
     this.af.auth.logout();
  }
  register() {
     this.af.auth.createUser({email: this.email,password: this.password});
  }
}
