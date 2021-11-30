import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from './search-bar.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [SearchBarComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [SearchBarComponent]
})
export class SearchBarModule { }
