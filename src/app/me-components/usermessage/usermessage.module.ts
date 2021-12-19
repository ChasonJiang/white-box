import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsermessageComponent } from './usermessage.component';
import { UserdataModule } from '../userdata/userdata.module';
import { UsersettingPageModule } from 'src/app/me/usersetting/usersetting.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [UsermessageComponent],
  imports: [
    CommonModule,
    UserdataModule,
    UsersettingPageModule

  ],
  exports: [UsermessageComponent]
})
export class UsermessageModule { }
