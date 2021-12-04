import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamelongcardComponent } from '../gamelongcard/gamelongcard.component';
import { GamesearchComponent } from './gamesearch.component';
import { GamelongcardModule } from '../gamelongcard/gamelongcard.module';


@NgModule({
  declarations: [GamelongcardComponent,GamesearchComponent],
  imports: [
    CommonModule,
    GamelongcardModule
  ]
})
export class GamesearchModule { }
