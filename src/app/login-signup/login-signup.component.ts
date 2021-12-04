import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.scss']
})
export class LoginSignupComponent implements OnInit {
  signUpMode:boolean=false;
  constructor(private loginService:LoginService, private router:Router) { }
   
  ngOnInit(): void {
    localStorage.clear();
    sessionStorage.clear();
  }

  addClass(){
    this.signUpMode = true;
  }
  removeClass(){
    this.signUpMode = false;
  }

  login(email:any,password:any){
    let data={
      email:email,
      password:password
    }
    this.loginService.login(data).subscribe((result:any) =>{
      console.log(result)
      if(!result.Data){
        alert(result.message)
        return;
      }
      sessionStorage.setItem('token',result.token);
      localStorage.setItem('user', JSON.stringify(result.Data))
      this.router.navigate(['/sidebar/home'])
    })
  }

  signup(name:any,email:any,password:any){
    let data = {
      name:name,
      email:email,
      password:password
    }
    this.loginService.signup(data).subscribe((result:any) =>{

      if(!result.Data){
        alert(result.message)
        return;
      }
      sessionStorage.setItem('token', result.token);
      localStorage.setItem('user', JSON.stringify(result.Data))
      this.router.navigate(['/sidebar'])
    })
  }
 
}
