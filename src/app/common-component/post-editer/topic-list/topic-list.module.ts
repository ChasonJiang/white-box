import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopicListComponent } from './topic-list.component';
import { SearchBarModule } from '../../search-bar/search-bar.module';
import { CommunityCardModule } from 'src/app/community/community-area/community-card/community-card.module';



@NgModule({
  declarations: [TopicListComponent],
  imports: [
    CommonModule,
    SearchBarModule,
    CommunityCardModule
  ],
  exports:[TopicListComponent]
})
export class TopicListModule { }
