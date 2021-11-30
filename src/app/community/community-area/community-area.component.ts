import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-community-area',
  templateUrl: './community-area.component.html',
  styleUrls: ['./community-area.component.scss'],
})
export class CommunityAreaComponent implements OnInit {

  constructor() { }

  ngOnInit() {}
  searchSubmit(searchContent:string){
    console.log(searchContent);
  }

}
