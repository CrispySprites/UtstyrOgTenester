import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { EquipmentComponent } from './equipment/equipment.component';
import { ServicesPageComponent } from './services-page/services-page.component';
import { CustomerComponent } from './customer/customer.component';
import { loginGuard } from './guards/login.guard';
import { RentalAgreemntComponent } from './rental-agreemnt/rental-agreemnt.component';
import { AboutComponent } from './about/about.component';

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
    path: "Om-oss",
    component: AboutComponent
  },
  {
    path: "Kundar",
    canMatch: [loginGuard],
    component: CustomerComponent
  },
  {
    path: "Utleige",
    canMatch: [loginGuard],
    component: RentalAgreemntComponent
  },
  {
    path:"Tenester",
    component: ServicesPageComponent
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
