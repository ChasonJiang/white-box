import { Component, OnInit, ViewEncapsulation } from '@angular/core';

// import Swiper core and required modules
import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, Zoom, Navigation} from 'swiper';
import { IonSlides } from '@ionic/angular';

SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom, Navigation]);

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class CommunityComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}
