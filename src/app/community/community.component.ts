import { AfterViewInit, Component, Input, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';

// import Swiper core and required modules
import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, Zoom, Navigation} from 'swiper';
import { IonSlides, ModalController } from '@ionic/angular';
import { SwiperComponent } from 'swiper/angular';
import { IonInfiniteScroll } from '@ionic/angular';
import { PostEditerComponent } from '../common-component/post-editer/post-editer.component';
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
  ) { }

  ngOnInit() {}

  ngAfterViewInit(){
    // this.isShow=true;
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  async createPostEditerModal(paperMode){
    const modal = await this.modalController.create({
      component:PostEditerComponent,
      cssClass: 'fullscreen-class',
      componentProps:{
        'paperMode' : paperMode
      }
    });

    return await modal.present();
  }


}
