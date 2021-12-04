import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonalsetPageRoutingModule } from './personalset-routing.module';

import { PersonalsetPage } from './personalset.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersonalsetPageRoutingModule
  ],
  declarations: [PersonalsetPage]
})
export class PersonalsetPageModule {}