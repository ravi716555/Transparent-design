import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login-signup/login.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {
  imgURL:any = '../../assets/image/lunch-png-4936.png';
  itemInfo:any;
  itemID:any;
  itemData:any=[];
  selectedFiles?: FileList;
  currentFile?: File;
  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
  }
  showPreview(event:any) {
    console.log(event)
    this.selectedFiles = event.target.files;

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }
  uploadeImage(){
   if (this.selectedFiles) {
    const file: File | null = this.selectedFiles.item(0);

    if (file) {
      this.currentFile = file;
      console.log(this.currentFile)
      this.loginService.uploadItemImage( this.itemID,this.currentFile).subscribe(res =>{
        location.reload()
       
      })
    }
  }

  }

  saveItem(name:any,description:any,category:any,price:any){
    const itemData ={
      name:name,
      description:description,
      category:category,
      price:price
    }
    try{
      this.loginService.addItem(itemData).subscribe(res =>{

        this.itemInfo = res
      for(const arrayItem in this.itemInfo){
        this.itemData[arrayItem] = this.itemInfo[arrayItem]
      }
      this.itemID = this.itemData._id;

        this.uploadeImage();
      })
    }
    catch(error){
      console.log(error)
    }
  }
}
