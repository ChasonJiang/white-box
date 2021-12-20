import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCardComponent } from './user-card.component';
import { MomentModule } from 'src/app/me/moment/moment.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [UserCardComponent],
  imports: [
    CommonModule,
    // IonicModule,
    // FormsModule,
    // MomentModule,

  ],
  exports:[
    UserCardComponent,
    
  ]
})
export class UserCardModule { }
