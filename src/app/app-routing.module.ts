import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListUsersComponent } from './list-users/list-users.component';
import { DetailUsersComponent } from './detail-users/detail-users.component';
import { CreateUsersComponent } from './create-users/create-users.component';
import { EditUserComponent } from './edit-user/edit-user.component';


const routes: Routes = [
  {path:'list-users',component:ListUsersComponent},
  {path:'list-users/detail/:id',component:DetailUsersComponent},
  {path:'create-users',component:CreateUsersComponent},
  {path:'edit-user/:id',component:EditUserComponent},
  {path:'**',pathMatch:'full',redirectTo:'/list-users'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
