import { Component, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-comment-editer',
  templateUrl: './comment-editer.component.html',
  styleUrls: ['./comment-editer.component.scss'],
})
export class CommentEditerComponent implements OnInit {
   content:string=null;


  constructor(
    private modalController: ModalController,
  ) { }

  ngOnInit() {}

  modalDismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  Submit(){
    console.log(this.content);
    this.modalDismiss();
  }

}
