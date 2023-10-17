import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

//confirma match entre password
export function passwordMatchValidator (passwordKey:string, confirmPasswordKey:string) : ValidatorFn{
  return (control : AbstractControl) : {[key : string] : any} | null => {
    const password = control.get(passwordKey)?.value;
    const confirmPassword = control.get(confirmPasswordKey)?.value;
    return password === confirmPassword ? null : {passwordMismatch : true};
  } 
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})

export class RegisterComponent  implements OnInit {

  registerForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private accountService: AccountService) {
    this.registerForm = this.fb.group({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.pattern("^(?=.*[A-Z])[a-z\\d]*(?=.*[^A-Za-z0-9]{2,}).{8,}$")]),
      confirmPassword: new FormControl(''),
      date: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      run: new FormControl('', [Validators.required, Validators.pattern("^[0-9]{7,8}-[0-9kK]{1}$")]),
      work: new FormControl('yes'),
      day: new FormControl({ value: 'not', disabled: false }),
      stade: new FormControl('', [Validators.required]),
      stade2: new FormControl({ value: '', disabled: false }),
    }, {
      validator: passwordMatchValidator('password', 'confirmPassword'),
    });
  }

  ngOnInit() {
    
  }

  submitForm(){
    console.log("submit");
    this.accountService.register(this.registerForm.value);
  }

  backToLogin(){
    this.router.navigate(['/']);
  }
}

