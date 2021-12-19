import { AfterViewInit, Component, Input, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';

// import Swiper core and required modules
import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, Zoom, Navigation} from 'swiper';
import { AlertController, AnimationController, IonSlides, ModalController } from '@ionic/angular';
import { SwiperComponent } from 'swiper/angular';
import { IonInfiniteScroll } from '@ionic/angular';
import { PostEditerComponent } from '../common-component/post-editer/post-editer.component';
import { getCurrentUserCard } from '../util/util';
import { LoginValidationRequestParams, Requester } from '../interface/Request';
import { UserCard } from '../interface/User';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { MyAnimation } from '../util/animation';
SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom, Navigation]);

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class CommunityComponent implements OnInit, AfterViewInit {
  @ViewChild("swiperRef", { static: false }) swiperRef?: SwiperComponent;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @Input() index:number=0;
  // isShow:boolean=false;
  constructor(
    private modalController: ModalController,
    private userService: UserService,
    private router: Router,
    private alertController:AlertController,
    public animationCtrl: AnimationController

  ) { }

  ngOnInit() {}

  ngAfterViewInit(){
    // this.isShow=true;
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
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
    let userCard:UserCard=getCurrentUserCard();
    let token:string=localStorage.getItem('token');
    let animation=MyAnimation(this.animationCtrl);
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
                'paperMode' : paperMode
              },
              enterAnimation:animation.EnterAnimation,
              leaveAnimation:animation.LeaveAnimation,
            });
            return await modal.present();

          }else{
            console.log(this.router.url)
            this.router.navigate(['/login'],{queryParams:{redirectUrl:this.router.url}});
            this.alert(res.message);
          }
        },
        error: () => {
          this.router.navigate(['/login'],{queryParams:{redirectUrl:this.router.url}});
          this.alert("token验证失败！");
        }
      });
  
    }

  }

}
