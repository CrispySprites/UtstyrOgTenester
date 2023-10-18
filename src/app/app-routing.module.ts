import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { EquipmentComponent } from './equipment/equipment.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "Heim",
    pathMatch: "full"
  },
  {
    path: "Heim",
    component: HomeComponent
  },
  {
    path: "Utstyr",
    component: EquipmentComponent
  },
  {
    path: "Logg-inn",
    component: LoginComponent
  },
  {
    path: "Registrer",
    component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
