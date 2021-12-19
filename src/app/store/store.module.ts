import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreComponent } from './store.component';
import { StoreRoutingModule } from './store-routing.module';
import { GamelistComponent } from './gamelist/gamelist.component';
import { DetailedGameComponent } from './detailedgame/detailedgame.component'; 
import { SwiperModule } from 'swiper/angular';
import { GamecardModule } from './gamecard/gamecard.module';
import { GamelongcardModule } from './gamelongcard/gamelongcard.module';


import { FormsModule } from '@angular/forms';
import { SearchBarComponent } from '../common-component/search-bar/search-bar.component';
import { GamesearchComponent } from './gamesearch/gamesearch.component';
import { AdddetailedgameModule } from './adddetailedgame/adddetailedgame.module';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [StoreComponent,GamelistComponent,DetailedGameComponent,SearchBarComponent,GamesearchComponent],
  imports: [
    CommonModule,
    IonicModule,
    StoreRoutingModule,
    SwiperModule,
    GamecardModule,
    GamelongcardModule,
    FormsModule,
    AdddetailedgameModule
  ],
  entryComponents:[GamelistComponent]
})
export class StoreModule { }
