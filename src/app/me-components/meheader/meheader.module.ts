import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeheaderComponent } from './meheader.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UsersettingPageModule } from 'src/app/me/usersetting/usersetting.module';



@NgModule({
  declarations: [MeheaderComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsersettingPageModule
  ],
  exports: [MeheaderComponent]
})
export class MeheaderModule { }
