import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamecardComponent } from './gamecard.component';


@NgModule({
  declarations: [GamecardComponent],
  imports: [
    CommonModule
  ],
  exports:[GamecardComponent]
})
export class GamecardModule { }
