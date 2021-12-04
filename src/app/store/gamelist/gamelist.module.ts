import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamelistComponent } from './gamelist.component';
import { GamelongcardComponent } from '../gamelongcard/gamelongcard.component';

import { GamelongcardModule } from '../gamelongcard/gamelongcard.module';
@NgModule({
  declarations: [GamelistComponent,GamelongcardComponent],
  imports: [

    CommonModule,
    GamelongcardModule,
  ],
 entryComponents: [GamelongcardComponent]
})
export class GamelistModule { }
