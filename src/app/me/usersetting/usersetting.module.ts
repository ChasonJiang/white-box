import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsersettingPageRoutingModule } from './usersetting-routing.module';

import { UsersettingPage } from './usersetting.page';
import { PersonalsetPageModule } from '../personalset/personalset.module';
import { MytaskPageModule } from '../mytask/mytask.module';
import { CurrencysetPageModule } from '../currencyset/currencyset.module';
import { PpolicyPageModule } from '../ppolicy/ppolicy.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersonalsetPageModule,
    MytaskPageModule,
    CurrencysetPageModule,
    PpolicyPageModule,
    // UsersettingPageRoutingModule
  ],
  declarations: [UsersettingPage],
  exports: [UsersettingPage]
})
export class UsersettingPageModule {}
