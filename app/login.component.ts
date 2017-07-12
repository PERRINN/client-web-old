import { Component } from '@angular/core';
import { AuthenticationService } from './auth.service';
import { Router } from '@angular/router'

@Component({
  selector: 'login',
  providers: [AuthenticationService],
  template: `
  <div id="login">
    <img src="./../assets/App icons/Perrinn_02.png" style="width:100px; border-radius:5px; opacity:1; padding-bottom:25px;">
    <div class="module form-module">
      <div class="form">
        <form>
          <input [(ngModel)]="this.email" name="email" type="text" placeholder="Email"/>
          <input [(ngModel)]="this.password" name="password" type="password" placeholder="Password"/>
          <button type="button" (click)="this.authService.login(this.email,this.password)">Login</button>
          <button type="button" (click)="this.authService.logout()">Logout</button>
          <button type="button" (click)="this.authService.register(this.email,this.password)">Register</button>
        </form>
      </div>
      <div class="cta"><a href='mailto:contactperrinn@gmail.com'>Contact PERRINN</a></div>
      <div class="cta"><a href='https://docs.google.com/document/d/1IjmDbmcW2IDg5Kj9ENpY3_Fw-oHv3RCJ2f8ZJdbjRpk/pub'>Learn more about us</a></div>
    </div>
  </div>
  `,
})

export class LoginComponent  {

  email: string;
  password: string;

  constructor(
    public authService: AuthenticationService,
    private router: Router
  ) {}

}
