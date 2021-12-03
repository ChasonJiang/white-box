import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TopicSearchRequestParams } from 'src/app/interface/Request';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Input() tid:number;
  searchResults:number[];
  constructor(
    private modalController: ModalController,
    private searchService: SearchService<TopicSearchRequestParams>,
  ) { }

  ngOnInit() {}

  goBack(){
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  searchSubmit(content: string){
    this.searchService.search({
      header:{
        uid:JSON.parse(localStorage.getItem('userInfo')).uid,type:''
      },
      body:{
        tid:this.tid,
        content:content
      }as TopicSearchRequestParams
    }).subscribe(res => {
      this.searchResults=res.pid;
      console.log(this.searchResults); 

    })

  }


}
