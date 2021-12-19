import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up.component';
import { SignUpRoutingModule } from './sgin-up-routing.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [SignUpComponent],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SignUpRoutingModule
  ],
  exports: [SignUpComponent]
})
export class SignUpModule { }
