import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MomentComponent } from './moment.component';
import { PostCardDetailModule } from 'src/app/common-component/post-card-detail/post-card-detail.module';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [MomentComponent],
  imports: [
    IonicModule,
    CommonModule,
    PostCardDetailModule,
  ],
  exports:[MomentComponent]
})
export class MomentModule { }
