import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreComponent } from './store.component';
import { StoreRoutingModule } from './store-routing.module';
import { GamelistComponent } from './gamelist/gamelist.component';
import { DetailedGameComponent } from './detailedgame/detailedgame.component'; 
import { SwiperModule } from 'swiper/angular';
import { GamecardModule } from './gamecard/gamecard.module';
import { GamelongcardModule } from './gamelongcard/gamelongcard.module';
import { GamelongcardComponent } from './gamelongcard/gamelongcard.component';
import { AdddetailedgameComponent } from './adddetailedgame/adddetailedgame.component';

@NgModule({
  declarations: [StoreComponent,GamelistComponent,DetailedGameComponent,GamelongcardComponent,AdddetailedgameComponent],
  imports: [
    CommonModule,
    StoreRoutingModule,
    SwiperModule,
    GamecardModule,
    GamelongcardModule
  ],
  entryComponents:[GamelistComponent]
})
export class StoreModule { }
