import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from '../login-signup/login.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  userInfo:any;
  userdata:any=[]
  name=String;
  email=String;
  address=String;
  mobileNumber=Number;
  city=String;
  age=Number;
  @Input()imageUrl:any;
  userId:any;
  selectedFiles?: FileList;
  currentFile?: File;
  
  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
    this.getUser()
  }
  getUser(){
    this.loginService.getProfile().subscribe(result =>{
      this.userInfo = result
      for(const arrayItem in this.userInfo){
        this.userdata[arrayItem] = this.userInfo[arrayItem]
      }
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

  showPreview(event:any) {
    this.selectedFiles = event.target.files;
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]); 
    reader.onload = (_event) => { 
      this.imageUrl = reader.result; 
    }
    this.uploadImg()
  }
  uploadImg(){
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
  
      if (file) {
        this.currentFile = file;
        this.loginService.uploadProfilePic(this.currentFile).subscribe(res =>{
          location.reload()
         
        })
      }
    }
    
  }
  

  editProfile(){
    const itemData ={
      name:this.name,
      email:this.email,
      age:this.age,
      address:this.address,
      city:this.city,
      mobile_number:this.mobileNumber
    }
    this.loginService.updateUser(itemData).subscribe(res =>{
      console.log(res)
    })
  }
}
