import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../Auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {


  loginForm!: FormGroup;

  authSubscription!: Subscription;

  error: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {

    this.initializeForm();
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }



  private initializeForm() {

    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, Validators.required)
    })

  }

  onSubmit() {

    if (!this.loginForm.valid) {
      return;
    }

    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    this.authSubscription = this.authService.login(email, password).subscribe(res => {
      console.log('Login', res);
      this.router.navigate(['dashboard']);

    }, errorMessage => {
      this.error = errorMessage.message;
      window.scrollTo(0, 0);
      console.log(this.error);
    })

    console.log('Login Form', this.loginForm);
  }



}
