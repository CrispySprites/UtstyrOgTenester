import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDto } from '../interfaces/UserDto';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private api: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  user: FormGroup = this.fb.group<UserDto>({
    email: "",
    password: ""
  })

  login() {
    if (this.user.valid){
      this.api.login(this.user.value).subscribe(r => {
        if(r.error !== undefined){
          console.log(r.error)
        } else {
          this.router.navigate(['']);
        }
      })
    }
  }
}
