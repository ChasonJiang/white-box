import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Requester, TopicSearchRequestParams } from '../interface/Request';
import { TopicSearchResponse } from '../interface/Response';

@Injectable({
  providedIn: 'root'
})
export class SearchService<T> {

  constructor() { }

  search(req: Requester<T>):Observable<TopicSearchResponse>{
    const res=of({
      success:true,
      pid:[0,0,0,0,0,0,0,0,]
    }as TopicSearchResponse);
    return res ;
  }
}
