import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { DetailedGameComponent } from "./detailedgame.component";
import { SwiperModule } from 'swiper/angular';

@NgModule({
    declarations: [DetailedGameComponent],
    imports: [
      CommonModule,SwiperModule
    ],
    exports: [DetailedGameComponent]
    
  })
  export class DetailedGameModule { }