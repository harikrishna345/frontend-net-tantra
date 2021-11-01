import { Router } from '@angular/router';
import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { JwtClientService } from '../jwt-client.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private userService: UserService,
    private service: JwtClientService,
    private fb: FormBuilder,
    private router:Router
  ) {}
  authRequest: any = {
    email: 'javatechie@gmail.com',
    password: 'password',
  };
  response: any;
  token: any;
  loginForm: FormGroup;
  submitted: any = false;
  error: any = '';
  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  get lf() {
    return this.loginForm.controls;
  }
  login() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    } else {
      this.getAccessToken(this.loginForm.value);
    }
  }
  public getAccessToken(authRequest) {
    this.userService.authenticate(authRequest).subscribe((data) => {
      if (data.status != '0') {
        this.token = data;
        this.error = '';
        this.userService.getToken1(this.token).subscribe((data) => {
          localStorage.setItem('token', this.token.token);
          localStorage.setItem('role', data[0].userRole);
          localStorage.setItem('userId', data[0].id);
          if (data[0].userRole == '1') {
               this.router.navigate(['serviceman']);
          }else{
             this.router.navigate(['user']);
          }
        });
      } else {
        this.error = data.error;
      }
    });
  }
  accessApi() {
    this.getAccessToken(this.authRequest);
  }
}
