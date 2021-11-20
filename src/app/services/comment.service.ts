import { Injectable } from '@angular/core';
import { Comment } from '../interface/comment'
import { COMMENT } from '../comment'

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor() { }

  requestComments(){
    return COMMENT;
  }
}
