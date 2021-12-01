import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunityCardComponent } from './community-card.component';
import { TopicModule } from '../../topic/topic.module';



@NgModule({
  declarations: [CommunityCardComponent],
  imports: [
    CommonModule,
    TopicModule,
  ],
  exports:[CommunityCardComponent]
})
export class CommunityCardModule { }
