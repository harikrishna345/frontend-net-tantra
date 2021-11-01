import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  constructor(private router:Router) {}
  collection: any = [];
  ngOnInit(): void {
    $(document).ready(function () {
      $('#news-slider').owlCarousel({
        items: 4,
        loop: true,
        margin: 10,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
      });
    });
    this.collection = [
      {
        id: 1,
        img: 'assets/images/bike-repair.jpg',
        des: '',
        title: 'Bike Repair Service',
      },
      {
        id: 2,
        img: 'assets/images/bike-engine-repair-500x500.jpg',
        des: '',
        title: 'Engine Service',
      },
      {
        id: 3,
        img: 'assets/images/brake.jpg',
        des: '',
        title: 'Brake Service',
      },
      {
        id: 4,
        img: 'assets/images/inspection.jpg',
        des: '',
        title: 'Inspection & Checks',
      },
      {
        id: 5,
        img: 'assets/images/bike-tyre-fix-1.png',
        des: '',
        title: 'Tyre Service',
      },
    ];
  }
  bookService(id) {
    localStorage.setItem('serviceId', id);
    this.router.navigate(['/book-service']);
  }
}
