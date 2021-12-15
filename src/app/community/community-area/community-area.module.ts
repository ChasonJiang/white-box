import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunityAreaComponent } from './community-area.component';
import { CommunityCardModule } from './community-card/community-card.module';
import { SearchBarModule } from 'src/app/common-component/search-bar/search-bar.module';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [CommunityAreaComponent],
  imports: [
    IonicModule,
    CommonModule,
    CommunityCardModule,
    SearchBarModule,
    CommunityCardModule
  ],
  exports:[CommunityAreaComponent]
})
export class CommunityAreaModule { }
