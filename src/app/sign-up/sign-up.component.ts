import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { JwtClientService } from '../jwt-client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  constructor(
    private userService: UserService,
    private service: JwtClientService,
    private fb: FormBuilder,
    private router: Router
  ) {}
  signUpForm: FormGroup;
  submitted: any = false;
  error: any = '';
  suc: any;
  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      userName: ['', Validators.required],
      userRole: '2',
    });
  }
  get lf() {
    return this.signUpForm.controls;
  }
  signUp() {
    this.submitted = true;
    if (this.signUpForm.invalid) {
      return;
    } else {
      this.userService.verifyUser(this.signUpForm.value).subscribe((data) => {
        if (data == true) {
          this.error = '';
          this.userService.addUser(this.signUpForm.value).subscribe((data) => {
            this.suc = 'Account created successfully';
            setTimeout(() => {
              this.router.navigate(['login']);
            }, 1500);
          });
        } else {
          this.suc = '';
          this.error = 'Email Already exits';
        }
      });
    }
  }
}
