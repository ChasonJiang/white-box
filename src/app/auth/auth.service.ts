import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  loginCheck(url: string){
    if(this.userService.loginStatusCheck()){
      return true;
    }
    this.router.navigate(['/login'],{queryParams:{redirectUrl:url}});
    return false;

  }
}
