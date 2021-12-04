import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit,AfterViewInit {

  constructor(private elementRef:ElementRef) { }

  ngOnInit(): void {
    console.log(sessionStorage.getItem('token'))
  }
  ngAfterViewInit() {
    let arrow =this.elementRef.nativeElement.querySelectorAll('.arrow');
    for(let i=0; i< arrow.length;i++){
      arrow[i].addEventListener('click', (e:any)=>{
        let arrowPoint = e.target.parentElement.parentElement;
        arrowPoint.classList.toggle("showMenu")
      })
    }

    let sidebar =this.elementRef.nativeElement.querySelector('.sidebar');
    let sidebarBtn =this.elementRef.nativeElement.querySelector('.fa-bars');
    sidebarBtn.addEventListener('click', ()=>{
      sidebar.classList.toggle("close")
    })
  }

}
