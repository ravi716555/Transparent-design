import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login-signup/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userInfo:any;
  userdata:any=[]
  name=String;
  email=String;
  address=String;
  mobileNumber=Number;
  city=String;
  age=Number;
  imageUrl=String;
  userId:any;
  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
    this.getUser()
  }

  getUser(){
    this.loginService.getProfile().subscribe(result =>{
      console.log(result)
      this.userInfo = result
      for(const arrayItem in this.userInfo){
        this.userdata[arrayItem] = this.userInfo[arrayItem]
      }
      console.log(this.userdata)
      this.imageUrl = this.userdata.imageUrl;
      this.name = this.userdata.name;
      this.email = this.userdata.email;
      this.address = this.userdata.address;
      this.mobileNumber = this.userdata.mobile_number;
      this.city = this.userdata.city;
      this.age = this.userdata.age;
      this.userId= this.userdata._id;
    })
  }

  updateProfile(){
    let data = {
       name:this.name,
       age:this.age,
       email:this.email,
       address:this.address,
       city:this.city,
       mobile_number:this.mobileNumber
    }
    this.loginService.updateUser(data).subscribe(result =>{
      this.getUser()
    })
  }

}
