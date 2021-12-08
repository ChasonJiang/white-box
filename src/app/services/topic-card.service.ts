import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiUrl } from '../Config';
import { httpOptions, Requester, TopicCardRequestParams } from '../interface/Request';
import { TopicCardIndexResponse, TopicCardResponse } from '../interface/Response';
import { TopicCard } from '../interface/Topic';
import { TOPIC_CARD } from '../TopicCard';

@Injectable({
  providedIn: 'root'
})
export class TopicCardService {

  constructor(
    private httpClient:HttpClient,
  ) { }

  requestTopicCardIndexList(req: Requester<void>):Observable<TopicCardIndexResponse> {
    return this.httpClient.post<TopicCardIndexResponse>(ApiUrl,req,httpOptions);
  }

  requestTopicCard(req:Requester<TopicCardRequestParams>):Observable<TopicCardResponse>{
    return this.httpClient.post<TopicCardResponse>(ApiUrl,req,httpOptions);
  }
}
