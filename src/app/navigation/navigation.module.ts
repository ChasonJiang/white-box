import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavigationComponent } from './navigation.component';
import { NavigationRoutingModule } from './navigation-routing.module';

@NgModule({
  declarations: [NavigationComponent],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    CommonModule,
    NavigationRoutingModule
  ]
})
export class NavigationModule { }
