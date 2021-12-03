import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowlongcardComponent } from './showlongcard.component';
import { GamelongcardComponent } from '../gamelongcard/gamelongcard.component';



@NgModule({
  declarations: [ShowlongcardComponent,GamelongcardComponent],
  imports: [
    CommonModule
  ]
})
export class ShowlongcardModule { }
