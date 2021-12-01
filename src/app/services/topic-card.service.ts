import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TopicCard } from '../interface/Topic';
import { TOPIC_CARD } from '../TopicCard';

@Injectable({
  providedIn: 'root'
})
export class TopicCardService {

  constructor() { }

  requestTopicCard():Observable<TopicCard[]>{
    return of(TOPIC_CARD);
  }
}
