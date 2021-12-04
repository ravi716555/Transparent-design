import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddItemComponent } from './add-item/add-item.component';
import { AuthGuard } from './auth.guard';
import { CartComponent } from './cart/cart/cart.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { EditItemComponent } from './edit-item/edit-item.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { HomeComponent } from './home/home/home.component';
import { LoginSignupComponent } from './login-signup/login-signup.component';
import { ProfileComponent } from './profile/profile.component';
import { SidebarComponent } from './sidebar/sidebar/sidebar.component';

const routes: Routes = [
  {path:'', redirectTo:"/login",pathMatch:'full'},
  {path:'dashbord', component:DashbordComponent},
  {path:'login', component:LoginSignupComponent},
  {path:'sidebar', component:DashbordComponent,canActivate:[AuthGuard], children:[
    {path:"sidebar", redirectTo:"/home",pathMatch:'full'},
    {path:"home", component:HomeComponent},
    {path:"cart", component:CartComponent},
    {path:"profile", component:ProfileComponent},
    {path:"add/item", component:AddItemComponent},
    {path:"edit/profile", component:EditProfileComponent},
    {path:"edit/item", component:EditItemComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
