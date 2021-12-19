import { Component, OnInit } from '@angular/core';
import { LogoutRequestParams, Requester } from 'src/app/interface/Request';
import { UserService } from 'src/app/services/user.service';
import { sha256 } from 'src/app/util/util';
import { getCurrentUserCard } from 'src/app/util/util';
import { LoginResponse } from 'src/app/interface/Response';
import { AlertController, ModalController } from '@ionic/angular';
@Component({
  selector: 'app-usersetting',
  templateUrl: './usersetting.page.html',
  styleUrls: ['./usersetting.page.scss'],
})
export class UsersettingPage implements OnInit {
  [x: string]: any;


  private uid:string = getCurrentUserCard().uid;

  private token:string = localStorage.getItem('token');

  constructor(private userservice:UserService) { }


  
  ngOnInit() {
  }




  loginout(){
    console.log(1)
    let req:Requester<LogoutRequestParams>={
      head:{
        type:"LogOut"
      },

      body:{
        uid:this.uid,
        token:this.token,
      }
    };
    console.log(req);
    this.userservice.requestLogOut(req).subscribe({next:res=>{
      console.log('2');
    },error:()=>{
      console.log('123');
    }

    })


  }

}
