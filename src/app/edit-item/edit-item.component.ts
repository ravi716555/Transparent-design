import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login-signup/login.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss']
})
export class EditItemComponent implements OnInit {
  editData:any;
  imgURL:any;
  itemID:any;
  selectedFiles?: FileList;
  currentFile?: File;
  itemName:any;
  itemDic:any;
  itemCat:any;
  itemPrice:any;
  constructor(private loginService:LoginService, private router:Router) { }

  ngOnInit(): void {
    this.editData = localStorage.getItem("editData");
    this.imgURL = JSON.parse(this.editData).imageUrl;
    this.itemName = JSON.parse(this.editData).name;
    this.itemDic=JSON.parse(this.editData).description;
    this.itemCat=JSON.parse(this.editData).category;
    this.itemPrice=JSON.parse(this.editData).price;
    this.itemID = JSON.parse(this.editData)._id;
    console.log(this.editData)
  }
  showPreview(event:any) {
    this.selectedFiles = event.target.files;

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
    this.uploadeImage()
  }
  uploadeImage(){
    if (this.selectedFiles) {
     const file: File | null = this.selectedFiles.item(0);
 
     if (file) {
       this.currentFile = file;
       this.loginService.uploadItemImage( this.itemID,this.currentFile).subscribe(res =>{
         location.reload()
        
       })
     }
   }
 
   }
   saveItem(){
    const itemData ={
      name:this.itemName,
      description:this.itemDic,
      category:this.itemCat,
      price:this.itemPrice
    }
    try{
      this.loginService.updateItem(this.itemID,itemData).subscribe(res =>{
        this.router.navigate(["/sidebar/home"])
      })
    }
    catch(error){
      console.log(error)
    }
  }
}
