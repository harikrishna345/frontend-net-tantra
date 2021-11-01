import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(public router: Router) {}
  islogo: boolean = false;
  ngOnInit(): void {
    if (
      localStorage.getItem('token') != null &&
      localStorage.getItem('token') != null
    ) {
      this.islogo = true;
    }
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  orders() {
    this.router.navigate(['/orders']);
  }
  service() {
    if (
      localStorage.getItem('role') == '2' ||
      localStorage.getItem('role') == '1'
    ) {
      this.router.navigate(['/user']);
    }
  }
}
