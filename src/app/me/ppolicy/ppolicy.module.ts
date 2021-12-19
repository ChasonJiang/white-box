import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PpolicyPageRoutingModule } from './ppolicy-routing.module';

import { PpolicyPage } from './ppolicy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    // PpolicyPageRoutingModule
  ],
  declarations: [PpolicyPage],
  exports: [PpolicyPage]
})
export class PpolicyPageModule {}
