import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunityCardComponent } from './community-card.component';



@NgModule({
  declarations: [CommunityCardComponent],
  imports: [
    CommonModule
  ],
  exports:[CommunityCardComponent]
})
export class CommunityCardModule { }
