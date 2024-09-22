import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../Auth/auth.service';
import { NotificationService } from '../Auth/notification.service';
import { CacheService } from '../cache/cache.service';
import { NotificationType } from '../model/notificationMessage';
import { Registeration } from '../model/registeration.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  signupSub!: Subscription;
  genders = ['male', 'female', 'other'];
  states = ['state', 'West bengal', 'Jharkhand', 'karnataka', 'Maharashtra'];
  citys = ['city', 'New Town', 'Dhanbad', 'Bengaluru', 'Pune'];

  registrationData = new Registeration();

  registerForm!: FormGroup;


  constructor(private authService: AuthService,
    private cacheService: CacheService,
    private notificationService: NotificationService) { }


  ngOnInit() {
    this.initForm();
  }

  ngOnDestroy() {
    if (this.signupSub) {
      this.signupSub.unsubscribe();
    }
  }


  initForm() {

    this.registerForm = new FormGroup({
      'userInfo': new FormGroup({
        'firstName': new FormControl(null, Validators.required),
        'lastName': new FormControl(null, Validators.required),
        'address': new FormControl(null, Validators.required),
        'pincode': new FormControl(null, Validators.required),
        'dob': new FormControl(null, Validators.required),
        'gender': new FormControl(null, Validators.required),
        'state': new FormControl('state', Validators.required),
        'city': new FormControl('city', Validators.required),
      }),
      'email': new FormControl(null, [Validators.email, Validators.required]),
      'password': new FormControl(null, Validators.required),
    })
  }



  onSubmit() {

    this.registerHere()
    this.signupSub = this.authService.signUp(this.registrationData).subscribe(resPonse => {
      this.notificationService.sendMessage({
        message: 'Registration Successfull',
        type: NotificationType.success
      })
      console.log('Success', resPonse);
    }, errorMessage => {
      this.notificationService.sendMessage({
        message: errorMessage.message,
        type: NotificationType.error
      })
    }
    );
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
    this.cacheService.setRegisterationDetails(this.registrationData);

  }

  onReset() {
    this.registerForm.reset();
  }

}
