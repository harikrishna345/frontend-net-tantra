import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../user.service';
import { JwtClientService } from '../jwt-client.service';
import { Router } from '@angular/router';
declare var $:any;
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
  @ViewChild('dTable',{static:false}) dataTable:any;
  signUpForm: FormGroup;
  submitted: any = false;
  error: any = '';
  suc: any;
  ngAfterViewInit() {
       $(this.dataTable.nativeElement).DataTable();
  }
  settinngs(){
    $('#exampleModalLong').modal('show');
  }
  close(){
     $('#exampleModalLong').modal('hide');
  }
  ngOnInit(): void {

    // $(()=> {
    //   $('#example').DataTable({
    //     ordering: true,
    //     searching: true,
    //     order: [[0, 'asc']], //default
    //   });
    // });


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
