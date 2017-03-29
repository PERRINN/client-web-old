import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { AuthComponent }   from './auth.component';
import { ChatComponent }     from './chat.component';
import { UserComponent } from './user.component';

const appRoutes: Routes = [
  { path: 'chat/:id', component: ChatComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'user', component: UserComponent },
  { path: '',   redirectTo: '/chat', pathMatch: 'full' },
  { path: '**', component: ChatComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
