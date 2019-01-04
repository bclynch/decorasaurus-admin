import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AdminService } from 'src/app/services/admin.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService
  ) {

  }

  ngOnInit() {
  }

  loginAdmin(e?) {
    if (e) e.preventDefault();

    this.adminService.loginAdmin(this.loginForm.value.email, this.loginForm.value.password);
  }

  registerAdmin() {
    if (this.loginForm.valid) this.adminService.createAdmin(this.loginForm.value.email, this.loginForm.value.password);
  }
}
