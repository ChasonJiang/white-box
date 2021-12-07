import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiUrl } from '../Config';
import { httpOptions, Requester, SearchRequestParams, TopicSearchRequestParams } from '../interface/Request';
import { TopicSearchResponse } from '../interface/Response';

@Injectable({
  providedIn: 'root'
})
export class SearchService<T> {

  constructor(
    private httpClient:HttpClient,
  ) { }

  search(req: Requester<any>):Observable<T>{
    return this.httpClient.post<T>(ApiUrl,req,httpOptions);
  }
}
