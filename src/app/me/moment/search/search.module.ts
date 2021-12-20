import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { SearchBarModule } from 'src/app/common-component/search-bar/search-bar.module';



@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    SearchBarModule,
  ],
  exports:[SearchComponent]
})
export class SearchModule { }
