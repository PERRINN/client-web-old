import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

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
  user: FirebaseObjectObservable<any>;
  messages: FirebaseListObservable<any>;
  constructor(af: AngularFire) {
    this.user = af.database.object('/user');
    this.messages = af.database.list('/messages');
    this.draftMessage = "";
  }
  addMessage() {
    if (this.draftMessage!="") {
    this.messages.push({ text: this.draftMessage, sender: "Nicolas" });
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
