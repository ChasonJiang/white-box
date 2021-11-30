import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunityAreaComponent } from './community-area.component';


@NgModule({
  declarations: [CommunityAreaComponent],
  imports: [
    CommonModule
  ],
  exports:[CommunityAreaComponent]
})
export class CommunityAreaModule { }
