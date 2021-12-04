import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login-signup/login.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
item:any;
array:any=[];
subTotel:any;
percentage:any;
shipping=15;
grandTotel:any;
btnDisable=Boolean;
  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
    this.loginService.getCART().subscribe((result: any) =>{
      this.item = result.Data;
      
      for(const arrayItem in this.item){
        this.array[JSON.parse(arrayItem)] = this.item[arrayItem].price*this.item[arrayItem].quantity;
        if(this.item[arrayItem].quantity == 1){
          this.item[arrayItem].btnDisable = true;
        }
        else{
          this.item[arrayItem].btnDisable = false;
        }
      }
      this.subTotel = this.array.reduce((a:any, b:any) => a+b,0);
      this.percentage = this.subTotel*5/100;
      this.grandTotel = this.subTotel+this.percentage+this.shipping;
    })
  }
  decrease(data:any){
    let id = data._id;
    let quantity = data.quantity;
    for(const arrayItem in this.item){
      if(id == this.item[arrayItem]._id){
        --this.item[arrayItem].quantity

        this.loginService.updateCart(this.item[arrayItem]).subscribe((result:any) =>{
          if(!result.success){
            alert(result.message);
            return;
          }
        })
        for(const arrayItem in this.item){
          this.array[JSON.parse(arrayItem)] = this.item[arrayItem].price*this.item[arrayItem].quantity;
          if(this.item[arrayItem].quantity == 1){
            this.item[arrayItem].btnDisable = true;
          }
          else{
            this.item[arrayItem].btnDisable = false;
          }
        }
        this.subTotel = this.array.reduce((a:any, b:any) => a+b,0);
        this.percentage = this.subTotel*5/100;
        this.grandTotel = this.subTotel+this.percentage+this.shipping;
      }
      
    }
  }
  increase(data:any){
    let id = data._id;
    for(const arrayItem in this.item){
      if(id == this.item[arrayItem]._id){
          this.item[arrayItem].quantity = ++this.item[arrayItem].quantity

          this.loginService.updateCart(this.item[arrayItem]).subscribe((result:any) =>{
            if(!result.success){
              alert(result.message);
              return;
            }
          })
      }
    }
    for(const arrayItem in this.item){
      this.array[JSON.parse(arrayItem)] = this.item[arrayItem].price*this.item[arrayItem].quantity;
      if(this.item[arrayItem].quantity == 1){
        this.item[arrayItem].btnDisable = true;
      }
      else{
        this.item[arrayItem].btnDisable = false;
      }
    }
    this.subTotel = this.array.reduce((a:any, b:any) => a+b,0);
    this.percentage = this.subTotel*5/100;
    this.grandTotel = this.subTotel+this.percentage+this.shipping;
  }

  removeItem(id:any){
    this.array = []
    this.loginService.deleteCartItem(id).subscribe((result:any) =>{
      if(!result.success){
        alert(result.message);
        return;
      }
      for(const arrayItem in this.item){
        if(id == this.item[arrayItem]._id){
            this.item.splice(arrayItem,1)
        }
      }
      for(const arrayItem in this.item){
        this.array[JSON.parse(arrayItem)] = this.item[arrayItem].price*this.item[arrayItem].quantity;
      }
      this.subTotel = this.array.reduce((a:any, b:any) => a+b,0);
      this.percentage = this.subTotel*5/100;
      this.grandTotel = this.subTotel+this.percentage+this.shipping;
      
    })
  }

}
