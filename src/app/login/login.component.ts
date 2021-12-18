import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LoginRequestParams, Requester } from '../interface/Request';
import { UserService } from '../services/user.service';
import { sha256 } from '../util/util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private uid:string=null;
  private pwd:string=null;
  private redirectUrl?:string;
  private loginLock:boolean=false;
  
  constructor(
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private userService: UserService,
    private alertController:AlertController,

  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params =>{
      this.redirectUrl = params.redirectUrl;
    });
  }

  async alert(msg: string){
    const alert = await this.alertController.create({
      header:'提示',
      message: msg,
      buttons:['确认'],
    });

    await alert.present();
  }

  login(){
    if(this.loginLock){
      this.alert("正在登录中！");
      return;
    }
    this.loginLock=true;
    if(this.uid==null || this.uid==undefined || this.uid==''){
      this.loginLock=false;
      this.alert("请输入账号！");
      return;
    }
    if(this.pwd==null || this.pwd==undefined || this.pwd==''){
      this.loginLock=false;
      this.alert("请输入密码！");
      return;
    }
    // console.log(params);
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
    this.userService.requestLoginValidation(req).subscribe({next:res=>{
      if(res.success){
        localStorage.setItem('userInfo', JSON.stringify(res.userInfo));
        localStorage.setItem('token', res.token);
        console.log("登录成功！");
        this.router.navigate([this.redirectUrl]);
      }else{
        this.alert(res.message);
        console.log(res.message);
      }
    },complete:()=>{
      this.loginLock=false;
    },error:()=>{
      this.loginLock=false;
    }
  });

  }
  toSignUp(){

  }
  toForgetting(){

  }

}
