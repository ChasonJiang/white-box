import { Component, OnInit } from '@angular/core';
import { LogoutRequestParams, Requester } from 'src/app/interface/Request';
import { UserService } from 'src/app/services/user.service';
import { sha256 } from 'src/app/util/util';
import { getCurrentUserCard } from 'src/app/util/util';
import { LoginResponse } from 'src/app/interface/Response';
import { AlertController, AnimationController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { MyAnimation } from 'src/app/util/animation';
import { PersonalsetPage } from '../personalset/personalset.page';
import { CurrencysetPage } from '../currencyset/currencyset.page';
import { PpolicyPage } from '../ppolicy/ppolicy.page';
@Component({
  selector: 'app-usersetting',
  templateUrl: './usersetting.page.html',
  styleUrls: ['./usersetting.page.scss'],
})
export class UsersettingPage implements OnInit {
  [x: string]: any;


  private uid:string = getCurrentUserCard().uid;

  private token:string = localStorage.getItem('token');

  constructor(
    private userservice:UserService,
    private alertController:AlertController,
    private router:Router,
    private modalController:ModalController,
    public animationCtrl: AnimationController

  ) { }


  
  ngOnInit() {
  }

  async alert(msg: string){
    const alert = await this.alertController.create({
      header:'提示',
      message: msg,
      buttons:['确认'],
    });

    await alert.present();
  }

  modalDismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  async createPersonalSetModal(){
    let animation=MyAnimation(this.animationCtrl);
    const modal = await this.modalController.create({
      component:PersonalsetPage,
      cssClass:"fullscreen-class",
      enterAnimation:animation.EnterAnimation,
      leaveAnimation:animation.LeaveAnimation,
    });
    return await modal.present();
  }

  async createcurrencysetModal(){
    let animation=MyAnimation(this.animationCtrl);
    const modal = await this.modalController.create({
      component:CurrencysetPage,
      cssClass:"fullscreen-class",
      enterAnimation:animation.EnterAnimation,
      leaveAnimation:animation.LeaveAnimation,
    });
    return await modal.present();
  }

  async createppolicyModal(){
    let animation=MyAnimation(this.animationCtrl);
    const modal = await this.modalController.create({
      component:PpolicyPage,
      cssClass:"fullscreen-class",
      enterAnimation:animation.EnterAnimation,
      leaveAnimation:animation.LeaveAnimation,
    });
    return await modal.present();
  }



  loginout(){
    let req:Requester<LogoutRequestParams>={
      head:{
        type:"LogOut"
      },
      body:{
        uid:this.uid,
        token:this.token,
      }
    };
    console.log(req);
    this.userservice.requestLogOut(req).subscribe({
      next:res=>{
        if(res.success){
          localStorage.clear();
          this.alert(res.message);
        }else{
          this.alert(res.message);
        }
      },
      error:()=>{
        this.alert("登出失败！");
      },
      complete:()=>{
        this.router.navigate(['/login'],{queryParams:{redirectUrl:'/navigation/home'}});

      }

    });
  }

}
