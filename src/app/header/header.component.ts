import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private activateRoute: ActivatedRoute) { }

  email: string = '';

  ngOnInit() {
    console.log('Activated routes ', this.activateRoute);
    this.activateRoute.queryParams.subscribe((param: Params) => {
      this.email = param['email'];
    })
  }

}
