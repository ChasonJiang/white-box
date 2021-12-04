import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {

  @Output() content: string=null;
  constructor() { }

  @Output() onSubmit:EventEmitter<any> = new EventEmitter();
  @Output() onChange:EventEmitter<any> = new EventEmitter();
  ngOnInit() {}

  Submit():void{
    this.onSubmit.emit(this.content);
  }
  Change(content:string):void{
    this.content=content;
    this.onChange.emit(content);

  }

}
