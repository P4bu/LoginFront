import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor( private router:Router) {}

  qr(){
    this.router.navigate(['tab3']);
  }
}

