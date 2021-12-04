import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login-signup/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userdata:any ={};
  admin:boolean = false;
  allProduct:any = [];
  constructor(private loginService:LoginService, private router:Router) { }

  ngOnInit(): void {
    var data:any = localStorage.getItem('user');
    this.userdata = JSON.parse(data);
    this.admin = this.userdata.isAdmin;
    this.getItems();
  }



  getItems(){
    this.loginService.getProduct().subscribe((result: any) =>{
      if(!result.success){
        alert(result.message)
        return;
      }
      this.allProduct = result.Data;
    })
  }

  addToCart(data:any){
    let itemData = {
      name:data.name,
      description:data.description,
      category:data.category,
      price:data.price,
      quantity:1,
      imageUrl:data.imageUrl,
      item_id:data._id
  }
  console.log(itemData)
  this.loginService.addTOCART(itemData).subscribe(result =>{
    console.log(result)
    this.router.navigate(['/sidebar/cart'])
  })
  }

  deleteItem(data:any){
    let id = data._id
    this.loginService.deleteProduct(id).subscribe(res =>{
      console.log(res)
      for(let i=0; i<=this.allProduct.length-1; i++){
        if(this.allProduct[i]._id == id){
          this.allProduct.splice(i,1)
        }
      }
    })
  }

  editItem(data:any){
    localStorage.setItem('editData',JSON.stringify(data));
    this.router.navigate(['/sidebar/edit/item'])
  }

}
