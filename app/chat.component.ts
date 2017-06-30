import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Component({
  selector: 'chat',
  template: `
  <h1>{{ user | async | json }}</h1>
  <ul style="list-style: none;">
    <li *ngFor="let message of messages | async">
    <button (click)="deleteMessage(message.$key)">Delete</button>
    <mark>{{message.sender}}</mark>
    {{message.text}}
    </li>
  </ul>
  <input style="width: 100%" type="text" (keydown.enter)="addMessage()" [(ngModel)]="draftMessage" />
    `,
})
export class ChatComponent {
  draftMessage: string;
  messages: FirebaseListObservable<any>;
  constructor(db: AngularFireDatabase) {
    this.messages = db.list('/messages');
    this.draftMessage = "";
  }
  addMessage() {
    if (this.draftMessage!="") {
    this.messages.push({ text: this.draftMessage, sender: firebase.auth().currentUser.uid });
    this.draftMessage = "";
    }
  }
  updateMessage(key: string, newText: string) {
    this.messages.update(key, { text: newText });
  }
  deleteMessage(key: string) {
    this.messages.remove(key);
  }
  deleteAllMessages() {
    this.messages.remove();
  }
}
