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

  constructor(private router: Router, private fb: FormBuilder, private accountService: AccountService) {}

  ngOnInit() {
    
  }

  registerForm = this.fb.group({
    run: new FormControl('', [Validators.required, Validators.pattern("^[0-9]{7,8}-[0-9kK]{1}$")]),
    nombres: new FormControl('', [Validators.required]),
    apellidos: new FormControl('', [Validators.required]),
    correo: new FormControl('', [Validators.email, Validators.required]),
    contraseña: new FormControl('', [Validators.required, Validators.pattern("^(?=.*[A-Z])[a-z\\d]*(?=.*[^A-Za-z0-9]{2,}).{8,}$")]),
    confirmPassword: new FormControl(''),
    fecNac: new FormControl('', [Validators.required]),
    IdModalidad: 1, //new FormControl({ value: 'not', disabled: false }),
    idSitLaboral: 1, //new FormControl('yes'),
    IdComunaRes: 1, //new FormControl('', [Validators.required]),
    IdComunaTra: 1, //new FormControl({ value: '', disabled: false }),
    IdEstado: 1
  }, {
    validators: passwordMatchValidator('contraseña', 'confirmPassword'),
  });

  submitForm(){
    console.log("submit");
    this.accountService.register(this.registerForm.value);
  }

  backToLogin(){
    this.router.navigate(['/']);
  }
}

