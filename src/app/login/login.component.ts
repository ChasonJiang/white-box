import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { LoginRequestParams, Requester } from '../interface/Request';
import { UserService } from '../services/user.service';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { sha256 } from '../util/util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private uid:string=null;
  private pwd:string=null;
  @Input() redirectUrl?:string;
  private loginLock:boolean=false;
  private showSpinner:boolean=false;

  constructor(
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private userService: UserService,
    private alertController:AlertController,
    public modalController:ModalController,


  ) { }

  ngOnInit() {
    // this.activatedRoute.queryParams.subscribe({
    //   next:params =>{
    //       this.redirectUrl = params.redirectUrl;
    //   },
    //   error:() => {
    //       this.redirectUrl='/';
    //   }
    // });
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
        // this.router.navigate(['/navigation']);
        if(this.redirectUrl!=undefined){
          this.router.navigate([this.redirectUrl]);
        }else{
          this.activatedRoute.queryParams.subscribe({
            next:params =>{
              this.router.navigate([params.redirectUrl]);
            },
            error:() => {
              this.router.navigate(['/navigation']);
            }
          });
        }
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
  async toSignUp(){
    const modal = await this.modalController.create({
      component:SignUpComponent,
      cssClass:"fullscreen-class",
      // componentProps:{
      //   'pid': pid,
      // },
    });
    return await modal.present();
    // this.router.navigate(['/signup']);
  }

  toForgetting(){

  }

}
