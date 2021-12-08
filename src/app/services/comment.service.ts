import { Injectable } from '@angular/core';
import { Comment } from '../interface/comment'
import { COMMENT } from '../comment'
import { CommentCardIndexRequestParams, CommentCardRequestParams, httpOptions, Requester, SubCommentRequestParams } from '../interface/Request';
import { CommentIndexResponse, CommentResponse, SubCommentResponse } from '../interface/Response';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiUrl } from '../Config';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(
    private httpClient:HttpClient,
  ) { }

  requestCommentIndex(req:Requester<CommentCardIndexRequestParams>):Observable<CommentIndexResponse>{
    return this.httpClient.post<CommentIndexResponse>(ApiUrl,req,httpOptions);
  }

  requestComments(req:Requester<CommentCardRequestParams>):Observable<CommentResponse>{
    return this.httpClient.post<CommentResponse>(ApiUrl,req,httpOptions);
  }

  requestSubComments(req:Requester<SubCommentRequestParams>):Observable<SubCommentResponse>{
    return this.httpClient.post<SubCommentResponse>(ApiUrl,req,httpOptions);
  } 
}
