import { Component, OnInit } from '@angular/core';
import { RegisterRequestParams, Requester } from 'src/app/interface/Request';
import { UserService } from 'src/app/services/user.service';
import { sha256 } from 'src/app/util/util';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.css'],
})
export class RegisterPage implements OnInit {

  private phone:string;
  private pwd:string;

  constructor(
    private userService: UserService,
  ) { }

  register(){
    let registerInfo:RegisterRequestParams={
      phone:this.phone,
      pwd:sha256(this.pwd),
      // userName:'test',
      // birthDay:new Date().getTime().toString(),
      // avatarUrl:'',
    };
    console.log(registerInfo);
    let req:Requester<RegisterRequestParams>={
      head:{
        type: 'SignUp'
      },body:registerInfo
    }

    this.userService.requestRegister(req).subscribe({next:res=>{
      if(res.success){
        console.log('注册成功!');
      }else{
        console.log(res.message);
      }
    },error:() =>{
      console.log('注册失败！');
    }
  });

  }



  ngOnInit() {
  }

}

