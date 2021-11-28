import { Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-post-editer',
  templateUrl: './post-editer.component.html',
  styleUrls: ['./post-editer.component.scss'],
})
export class PostEditerComponent implements OnInit {
  @Input() editerType: string;
  @ViewChild('Container',{read: ViewContainerRef}) viewContainerRef:ViewContainerRef;
  

  private currentEditerType: string;
  private TypeDict={
    'post':"帖子/动态",
    'paper':"文章/文图"
  }
  constructor(
    private modalController: ModalController,
  ) { }

  ngOnInit() {
    this.currentEditerType=this.TypeDict[this.editerType];
  }

  // async createModal(){
  //   // const modal = await this.modalController.create({

  //   // });
  // }

  modalDismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  sendPost(){
    let cover
    let title = this.viewContainerRef.element.nativeElement.querySelector('title');
    let main_textarea = this.viewContainerRef.element.nativeElement.querySelector('.main-textarea');
    
    console.log(main_textarea.innerText);
  }

  insertImg(){
    // let title = this.viewContainerRef.element.nativeElement.querySelector('title');
    let main_textarea = this.viewContainerRef.element.nativeElement.querySelector('.main-textarea');
    main_textarea.innerText+="[*@IMAGE@*]";

  }

}
