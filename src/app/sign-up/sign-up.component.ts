import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { LoginRequestParams, RegisterRequestParams, Requester } from '../interface/Request';
import { UserService } from '../services/user.service';
import { sha256 } from '../util/util';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  private uid:string=null;
  private frist_pwd:string=null;
  private second_pwd:string=null;
  private redirectUrl?:string;
  private signupLock:boolean=false;
  private showSpinner:boolean=false;

  constructor(
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private userService: UserService,
    private alertController:AlertController,
    private modalController: ModalController,

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

  signUp(){
    if(this.signupLock){
      this.alert("正在注册中！");
      return;
    }
    this.signupLock=true;
    if(this.uid==null || this.uid==undefined || this.uid==''){
      this.signupLock=false;
      this.alert("请输入账号！");
      return;
    }
    if(this.frist_pwd==null || this.frist_pwd==undefined || this.frist_pwd==''){
      this.signupLock=false;
      this.alert("请输入密码！");
      return;
    }else if(this.second_pwd==null || this.second_pwd==undefined || this.second_pwd==''){
      this.signupLock=false;
      this.alert("请再次输入密码！");
      return;
    }
    if(this.frist_pwd!=this.second_pwd){
      this.signupLock=false;
      this.alert("两次密码不一致！");
      return;
    }
    // console.log(params);
    let req: Requester<RegisterRequestParams>={
      head: {
        type:"SignUp",
        // uid:this.uid,
      },
      body:{
        phone:this.uid,
        pwd:sha256(this.frist_pwd),
      }
    };
    console.log(req);
    this.userService.requestRegister(req).subscribe({next:res=>{
      if(res.success){
        // localStorage.setItem('userInfo', JSON.stringify(res.userInfo));
        // localStorage.setItem('token', res.token);
        console.log("注册成功！");
        this.alert("注册成功！");
        this.goBack();
        // this.router.navigate(['/login']);

        // this.router.navigate([this.redirectUrl]);
      }else{
        this.alert(res.message);
        console.log(res.message);
      }
    },complete:()=>{
      this.signupLock=false;
    },error:()=>{
      this.signupLock=false;
    }
  });

  }
  toLogin(){
    this.router.navigate(['/login']);
  }
  toForgetting(){

  }
  goBack(){
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
