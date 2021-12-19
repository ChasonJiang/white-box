import { Component, OnInit } from '@angular/core';
import { NavController, RouterLinkDelegate } from '@ionic/angular';
import { LoginRequestParams, Requester } from 'src/app/interface/Request';
import { UserService } from 'src/app/services/user.service';
import { sha256 } from 'src/app/util/util';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private uid:string;

  private pwd:string;

  errorMessage:any;

  constructor(
    private userService: UserService,
    public nav: NavController,
    ) { }

    
  ngOnInit() {
  }


  click(){}

  login(){
    let req: Requester<LoginRequestParams>={
      head: {
        type:"LogIn",
        // uid:this.uid,
      },
      body:{
        uid:this.uid,
        pwd:sha256(this.pwd),
      }
    };
    console.log(req);
    this.userService.requestLogin(req).subscribe({next:res=>{
      if(res.success){
        localStorage.setItem('userInfo', JSON.stringify(res.userInfo));
        localStorage.setItem('token', res.token);
        console.log("登录成功！");
      }else{
        console.log(res.message);
      }
    }});

  }

  
}
