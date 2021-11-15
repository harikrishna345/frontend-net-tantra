import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtClientService } from '../jwt-client.service';
import { UserService } from '../user.service';
declare var $:any;
@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss'],
})
export class ServiceComponent implements OnInit {
  constructor(
    private userService: UserService,
    private service: JwtClientService,
    private fb: FormBuilder,
    private router: Router
  ) {}
  serviceForm: FormGroup;
  submitted: any = false;
  error: any = '';
  suc: any;
  ngOnInit(): void {
    this.serviceForm = this.fb.group({
      serviceType: ['', Validators.required],
      date: ['', Validators.required],
      slot: ['', Validators.required],
      ownerName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      userId: '',
      addres: ['', Validators.required],
      expDelDate: '',
      createdAt: '',
      updatedAt: '',
      status:'1'
    });
    var date = new Date();

    // Number($('input[name=numberType]:checked').val());
    this.serviceForm.patchValue({
      serviceType: localStorage.getItem('serviceId'),
      createdAt:
        date.toISOString().split('T')[0] +
        ' ' +
        date.toTimeString().split(' ')[0],
      updatedAt:
        date.toISOString().split('T')[0] +
        ' ' +
        date.toTimeString().split(' ')[0],
      userId: localStorage.getItem('userId'),
      slot: Number($('input[name=slot]:checked').val()),
    });
  }
  get lf() {
    return this.serviceForm.controls;
  }
  signUp() {
    this.submitted = true;
    if (this.serviceForm.invalid) {
      return;
    } else {
      this.userService.saveOrder(this.serviceForm.value).subscribe((data) => {
        this.suc="Service Booked Successfully";
          setTimeout(() => {
            if (localStorage.getItem('role') == '1') {
              this.router.navigate(['serviceman']);
            } else {
              this.router.navigate(['user']);
            }
          }, 1500);
        });
      }
    }
  }

