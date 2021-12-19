import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, AnimationController, IonRefresher, ModalController } from '@ionic/angular';
import { PostEditerComponent } from 'src/app/common-component/post-editer/post-editer.component';
import { LoginValidationRequestParams, Requester } from 'src/app/interface/Request';
import { TopicCard } from 'src/app/interface/Topic';
import { UserCard } from 'src/app/interface/User';
import { UserService } from 'src/app/services/user.service';
import { MyAnimation } from 'src/app/util/animation';
import { getCurrentUserCard } from 'src/app/util/util';
import { SearchComponent } from './search/search.component';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss'],
})
export class TopicComponent implements OnInit {
  @Input() topicCard:TopicCard;
  @ViewChild(IonRefresher) ionRefresher:IonRefresher;
  isFollow: boolean=false;
  constructor(
    private modalController: ModalController,
    private userService: UserService,
    private router: Router,
    private alertController:AlertController,
    public animationCtrl: AnimationController
  ) { }

  ngOnInit() {
  }

  goBack(){
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }
  follow(){
    this.isFollow=!this.isFollow;
    console.log(this.isFollow);
  }

  async alert(msg: string){
    const alert = await this.alertController.create({
      header:'提示',
      message: msg,
      buttons:['确认'],
    });

    await alert.present();
  }


  async createPostEditerModal(paperMode){
    let animation=MyAnimation(this.animationCtrl);
    let userCard:UserCard=getCurrentUserCard();
    let token:string=localStorage.getItem('token');
    if(token!=null ){
      let req: Requester<LoginValidationRequestParams>={
        head:{
          type:"LoginValidation"
        },
        body:{
          uid:userCard.uid,
          token:token
        }        
      }
      console.log(token);
      this.userService.requestLoginValidat(req).subscribe({
        next: async res => {
          if(res.success){
            // console.log(res.message);
            const modal = await this.modalController.create({
              component:PostEditerComponent,
              cssClass: 'fullscreen-class',
              componentProps:{
                'paperMode' : paperMode,
                'topics':[this.topicCard],
              },
              enterAnimation:animation.EnterAnimation,
              leaveAnimation:animation.LeaveAnimation,
            });
        
            return await modal.present();

          }else{
            this.goBack();
            // console.log(this.router.url)
            this.router.navigate(['/login'],{queryParams:{redirectUrl:this.router.url}});
            this.alert(res.message);
          }
        },
        error: () => {
          this.goBack();
          this.router.navigate(['/login'],{queryParams:{redirectUrl:this.router.url}});
          this.alert("token验证失败！");
        }
      });
  
    }

  }

  // async createPostEditerModal(paperMode){
  //   const modal = await this.modalController.create({
  //     component:PostEditerComponent,
  //     cssClass: 'fullscreen-class',
  //     componentProps:{
  //       'paperMode' : paperMode,
  //       'topics':[this.topicCard],
  //     }
  //   });

  //   return await modal.present();
  // }

  async createSearchModal() {
    let animation=MyAnimation(this.animationCtrl);

    const modal = await this.modalController.create({
      component:SearchComponent,
      cssClass:'fullscreen-class',
      enterAnimation:animation.EnterAnimation,
      leaveAnimation:animation.LeaveAnimation,
    });

    return await modal.present();
  }

  doRefresh(event) {
    
  }
}
