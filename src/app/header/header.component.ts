import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {



  logOut(){
    localStorage.clear()
    window.location.reload()
  }


  public isLoggedIn() {
    const token : string | null = localStorage.getItem('auth-token');
    if(token !== null)
    {
      return true;
    } else {
      return false;
    }
  }
}
