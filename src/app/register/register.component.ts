import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../Auth/auth.service';
import { Registeration } from '../model/registeration.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  genders = ['male', 'female', 'other'];
  states = ['state', 'West bengal', 'Jharkhand', 'karnataka', 'Maharashtra'];
  citys = ['city', 'New Town', 'Dhanbad', 'Bengaluru', 'Pune'];

  registrationData = new Registeration();

  registerForm!: FormGroup;


  constructor(private authService: AuthService) { }


  ngOnInit() {
    this.initForm();
  }


  initForm() {

    this.registerForm = new FormGroup({
      'userInfo': new FormGroup({
        'firstName': new FormControl(Validators.required),
        'lastName': new FormControl(Validators.required),
        'address': new FormControl(Validators.required),
        'pincode': new FormControl(Validators.required),
        'dob': new FormControl(Validators.required),
        'gender': new FormControl(Validators.required),
        'state': new FormControl('state', Validators.required),
        'city': new FormControl('city', Validators.required),
      }),
      'email': new FormControl(null, [Validators.email, Validators.required]),
      'password': new FormControl(null, Validators.required),
    })
  }



  onSubmit() {

    this.registerHere()
    this.authService.signUp(this.registrationData).subscribe(resPonse => console.log('Success', resPonse));
    console.log('Register Form', this.registerForm);
  }

  // function for adding registeration data
  registerHere() {
    this.registrationData.firstName = this.registerForm.value.userInfo.firstName;
    this.registrationData.lastName = this.registerForm.value.userInfo.lastName;
    this.registrationData.address = this.registerForm.value.userInfo.address;
    this.registrationData.gender = this.registerForm.value.userInfo.gender;
    this.registrationData.state = this.registerForm.value.userInfo.state;
    this.registrationData.city = this.registerForm.value.userInfo.city;
    this.registrationData.dob = this.registerForm.value.userInfo.dob;
    this.registrationData.pincode = this.registerForm.value.userInfo.pincode;
    this.registrationData.email = this.registerForm.value.email;
    this.registrationData.password = this.registerForm.value.password;
  }

  onReset() {
    this.registerForm.reset();
  }

}
