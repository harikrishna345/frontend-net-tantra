import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit {
  constructor(public userService: UserService) {}
  userOrdersList: any = [];
  userRole: any = '';
  ngOnInit(): void {
    this.userRole = localStorage.getItem('role');
    if (this.userRole == '1') {
      this.userService.getServiceManOrdersList().subscribe((data) => {
        this.userOrdersList = data;
      });
    } else {
      this.userService.getUserOrdersList().subscribe((data) => {
        this.userOrdersList = data;
      });
    }
     $(()=> {
       $('#exampleModal').modal();
     });
  }
  updateStatus(item,id){
       var postData:any = {};
       postData = item;
        postData.status = id;
      this.userService.updateStatus(postData,postData.id).subscribe((data) => {
        this.ngOnInit();

      });
  }
}
