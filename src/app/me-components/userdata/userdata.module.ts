import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserdataComponent } from './userdata.component';
import { MefirstpageModule } from '../mefirstpage/mefirstpage.module';
import { MesecondpageModule } from '../mesecondpage/mesecondpage.module';



@NgModule({
  declarations: [UserdataComponent],
  imports: [
    CommonModule,
    MefirstpageModule,
    MesecondpageModule
  ],
  exports: [UserdataComponent]
})
export class UserdataModule { }
