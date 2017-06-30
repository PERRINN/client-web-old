import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';


@Component({
  selector: 'user',
  template: `
  <div style="font-size:8px"> {{ (user | async)?.uid }} </div>
  <h5>{{ item | async | json }}</h5>
  <input [(ngModel)]="this.firstName" type="text" #newname placeholder="First name" />
  <br />
  <input [(ngModel)]="this.lastName" type="text" #newsize placeholder="Last name" />
  <br />
  <button (click)="updateUserProfile()">Update profile</button>
  `,
})
export class UserComponent {
  item: FirebaseObjectObservable<any>;
  user: Observable<firebase.User>;
  firstName= "";
  lastName= "";

  constructor(db: AngularFireDatabase, afAuth: AngularFireAuth) {
    this.user = afAuth.authState;
    this.item = db.object('/users/123');
    this.firstName = "Nicolas";
    this.lastName = "Perrin";
  }
  updateUserProfile() {
    this.item.update({ firstName: this.firstName, lastName: this.lastName });
  }
}
