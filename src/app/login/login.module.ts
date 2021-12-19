import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SignUpModule } from '../sign-up/sign-up.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    LoginRoutingModule,
    SignUpModule
  ],
  exports: [LoginComponent]
})
export class LoginModule { }
