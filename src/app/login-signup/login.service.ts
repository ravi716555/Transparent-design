import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry, tap  } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';
import { User } from '../user.model';

interface AuthResponceData{
  address: String,
  age: String,
  city: String,
  createdAt: String,
  imageUrl: String,
  mobile_numbar: Number,
  email:string,
  name: String,
  updatedAt: String,
  _id:String,
  token:String
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private httpHeaders = new HttpHeaders ({
    'Content-Type': 'application/json',
    'Accept': "application/json;odata=verbose"
  });
  private url ='http://localhost:3000';
  
  user = new Subject<User>()
  constructor(private http:HttpClient) {
   }

/******************************************************
  functionName:login
  MadeBy:Ravi kumar
  Date: 29/01/2020       
*******************************************************/ 
login(userData:any){
  return this.http.post<AuthResponceData>(this.url +'/users/login',userData,{ headers: this.httpHeaders })
  .pipe( 
    retry(1),
    catchError(this.handleError)
    );
}

signup(userData:any){
  return this.http.post<AuthResponceData>(this.url +'/users',userData,{ headers: this.httpHeaders })
  .pipe( 
    retry(1),
    catchError(this.handleError)
    );
}

logout(){
  return this.http.post(this.url +'/users/logoutAll',{ headers: this.httpHeaders })
  .pipe( 
    retry(1),
    catchError(this.handleError)
    );
}

getToken(){
  return sessionStorage.getItem('token')
}

uploadProfilePic(file:File){
  const formData: FormData = new FormData();

    formData.append('avatar', file);
  return this.http.post(this.url +'/user/me/avatar',formData)
  .pipe( 
    retry(1),
    catchError(this.handleError)
    );
}

getProduct(){
  return this.http.get(this.url +'/allproduct',{ headers: this.httpHeaders })
  .pipe( 
    retry(1),
    catchError(this.handleError)
    );
}

addTOCART(data:any){
  return this.http.post(this.url +'/cart',data,{ headers: this.httpHeaders })
  .pipe( 
    retry(1),
    catchError(this.handleError)
    );
}
getCART(){
  return this.http.get(this.url +'/cart',{ headers: this.httpHeaders })
  .pipe( 
    retry(1),
    catchError(this.handleError)
    );
}
deleteCartItem(id:any){
  return this.http.delete(this.url +`/cart/${id}`,{ headers: this.httpHeaders })
  .pipe( 
    retry(1),
    catchError(this.handleError)
    );
}

getProfile(){
  return this.http.get(this.url +'/users/me',{ headers: this.httpHeaders })
  .pipe( 
    retry(1),
    catchError(this.handleError)
    );
}

updateUser(data:any){
  return this.http.patch(this.url +'/users/me',data,{ headers: this.httpHeaders })
  .pipe( 
    retry(1),
    catchError(this.handleError)
    );
}
updateCart(data:any){
  return this.http.post(this.url +'/cart/update',data,{ headers: this.httpHeaders })
  .pipe( 
    retry(1),
    catchError(this.handleError)
    );
}

addItem(data:any){
  return this.http.post(this.url +'/allproduct',data,{ headers: this.httpHeaders })
  .pipe( 
    retry(1),
    catchError(this.handleError)
    );
}
updateItem(id:any,data:any){
  return this.http.patch(this.url +`/allproduct/${id}`,data,{ headers: this.httpHeaders })
  .pipe( 
    retry(1),
    catchError(this.handleError)
    );
}

uploadItemImage(id:any,file:File){
  const formData: FormData = new FormData();

    formData.append('item_image', file);
  return this.http.post(this.url +`/allproduct/${id}/image`,formData)
  .pipe( 
    retry(1),
    catchError(this.handleError)
    );
}
deleteProduct(id:any){
  return this.http.delete(this.url +`/allproduct/${id}`,{ headers: this.httpHeaders })
  .pipe( 
    retry(1),
    catchError(this.handleError)
    );
}

/******************************************************
  functionName:updateOverGroup
  MadeBy:Ravi Kumar
  Date: 4/11/2019       
 *******************************************************/

handleError(error: HttpErrorResponse){
  if(error.status == 0){
    console.log(error.status)
  }
  else if(error.status == 400){
    console.log(error.status)
  }
  else if(error.status == 404){
    console.log(error.status)
  }
  else if(error.status == 500){
    console.log(error.status)
  }
  else if(error.status == 501){
    console.log(error.status)
  }
  else if(error.status == 503){
    console.log(error.status)
  }
  else if(error.status == 511){
    console.log(error.status)
  }
  return throwError(error.statusText);
  }
}
