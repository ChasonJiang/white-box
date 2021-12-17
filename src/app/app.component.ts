import { Component, OnInit } from '@angular/core';
import { LoginRequestParams, Requester } from './interface/Request';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  constructor(
    private userService: UserService,
  ) {}

  ngOnInit() {
    localStorage.clear();
    // if(this.userService.loginStatusCheck()){
    //   console.log('已登录');
    // }else{
    //   let req:Requester<LoginRequestParams>={
    //     head:{
    //     uid:0,
    //     type: 'LogIn'
    //     },
    //     body: {
    //       pwd:"82086786e238139d164932c4b95d4ff877bde605de6ec0187812b53977d2a244"
    //     }
    //   }
    //   this.userService.requestLoginValidation(req)
    //   .subscribe({next:res=>{
    //     if(res.success){
    //       console.log(res);
    //       localStorage.setItem('userInfo', JSON.stringify(res.userInfo));
    //       console.log("登录成功！")
    //     }else{
    //       console.log("登录失败，失败原因："+res.message);
    //     }},
    //     error:() =>{
    //       console.log("登录请求失败！");
    //     }
    //   });
    //   }

    }

}
