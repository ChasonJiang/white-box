import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MytaskPageRoutingModule } from './mytask-routing.module';

import { MytaskPage } from './mytask.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MytaskPageRoutingModule
  ],
  declarations: [MytaskPage]
})
export class MytaskPageModule {}
