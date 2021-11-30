import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {

  content: string=null;
  constructor() { }

  @Output() onSubmit:EventEmitter<any> = new EventEmitter();
  ngOnInit() {}

  Submit():void{
    this.onSubmit.emit(this.content);
  }

}
