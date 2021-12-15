import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CurrencysetPageRoutingModule } from './currencyset-routing.module';

import { CurrencysetPage } from './currencyset.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CurrencysetPageRoutingModule
  ],
  declarations: [CurrencysetPage]
})
export class CurrencysetPageModule {}
