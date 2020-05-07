import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {GroupComponent} from './group/group.component';
import {ChatComponent} from './chat/chat.component';
import {HomePageComponent} from './home-page/home-page.component';
import {GroupChatComponent} from './group-chat/group-chat.component';
import {AllChatComponent} from './all-chat/all-chat.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: LoginComponent},
  {path: 'groups', component: GroupComponent},
  {path: 'chat/:id', component: ChatComponent},
  {path: 'home', component: HomePageComponent},
  {path: 'groupChat/:id', component: GroupChatComponent},
  {path: 'all-chat', component: AllChatComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
