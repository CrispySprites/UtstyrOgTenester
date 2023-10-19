import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDto } from '../interfaces/UserDto';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private api: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  user: FormGroup = this.fb.group<UserDto>({
    email: "",
    password: ""
  })
  errorMessage: string = "";

  hide = true;

  login() {
    if (this.user.valid){
      this.api.login(this.user.value).subscribe(r => {
        if(r.error !== undefined){
          console.log(r.error)
          this.errorMessage = r.error.message;
        } else {
          window.location.reload()
          this.router.navigate([''])
          this._snackBar.open("Logger inn", "Okay", {
            duration: 3000
          });
        }
      })
    }
  }
}
