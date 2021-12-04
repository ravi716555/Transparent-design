import { Component, AfterViewInit , ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login-signup/login.service';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.scss']
})
export class DashbordComponent implements OnInit, AfterViewInit{
   userdata:any = [];
   userImage=String;
   admin:boolean = false;
  constructor(private elementRef:ElementRef, private loginService:LoginService, private router:Router) {
   
   }
  
  

  ngOnInit(): void {
    var data:any = localStorage.getItem('user');
    this.userdata = JSON.parse(data);
    this.userImage = this.userdata.imageUrl;
    this.admin = this.userdata.isAdmin;
  }
  ngAfterViewInit() {
    this.elementRef.nativeElement.querySelector('.header_toggle')
                                  .addEventListener('click', this.onClick.bind(this));
  }
  onClick(event:any) {
    let nav = document.getElementById('navbar')
    const toggleBtn = document.getElementById("header-toggle")

    nav?.classList.toggle('show-menu');
    toggleBtn?.classList.toggle("fa-bars")
    
  }

  logout(){
    this.loginService.logout().subscribe((result:any) =>{
      if(!result.success){
        alert(result.message);
        return;
      }
      sessionStorage.clear()
      this.router.navigate(['/login'])
    })
  }

}
