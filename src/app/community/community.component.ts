import { Component, Input, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';

// import Swiper core and required modules
import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, Zoom, Navigation} from 'swiper';
import { IonSlides } from '@ionic/angular';
import { SwiperComponent } from 'swiper/angular';
import { IonInfiniteScroll } from '@ionic/angular';
SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom, Navigation]);

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class CommunityComponent implements OnInit {
  @ViewChild("swiperRef", { static: false }) swiperRef?: SwiperComponent;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;  constructor() { }
  @Input() index:number=0;
  
  ngOnInit() {}

  onSlideChange(event){
    if(this.swiperRef.swiperRef.activeIndex!=0){
      this.infiniteScroll.disabled = true;
    }
    else{
      // this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
    }
    // console.log(this.swiperRef.swiperRef.activeIndex);
  }
  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }


}
