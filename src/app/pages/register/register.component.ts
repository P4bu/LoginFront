import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { sitLaboral } from 'src/app/models/sit-laboral';
import { AccountService } from 'src/app/services/account.service';

//confirma match entre password
export function passwordMatchValidator (passwordKey:string, confirmPasswordKey:string) : ValidatorFn{
  return (control : AbstractControl) : {[key : string] : any} | null => {
    const password = control.get(passwordKey)?.value;
    const confirmPassword = control.get(confirmPasswordKey)?.value;
    return password === confirmPassword? null : {passwordMismatch : true};
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})

export class RegisterComponent  implements OnInit {

  modalidades : any
  sitLaboral : any
  comunasRes : any
  comunasTra : any
  registerForm: FormGroup

  constructor(private router: Router, private fb: FormBuilder, private accountService: AccountService) {

    this.registerForm = this.fb.group({
      run: new FormControl('', [Validators.required, Validators.pattern("^[0-9]{7,8}-[0-9kK]{1}$")]),
      nombres: new FormControl('', [Validators.required]),
      apellidos: new FormControl('', [Validators.required]),
      correo: new FormControl('', [Validators.email, Validators.required]),
      contraseña: new FormControl('', [Validators.required, Validators.pattern("^(?=.*[A-Z])[a-z\\d]*(?=.*[^A-Za-z0-9]{2,}).{8,}$")]),
      confirmPassword: new FormControl('', [Validators.required]),
      fecNac: new FormControl('', [Validators.required]),
      IdModalidad: new FormControl(),
      idSitLaboral: new FormControl(''),
      IdComunaRes: new FormControl('', [Validators.required]),
      IdComunaTra: new FormControl(),
      IdEstado: new FormControl('', [Validators.required])
    },
    {
      validators: passwordMatchValidator('contraseña', 'confirmPassword'),
    });

  }

  ngOnInit() {

    this.registerForm.reset()

    this.accountService.getSitLaboral().subscribe((data:any) => {
      this.sitLaboral = data
      })
    this.accountService.getModalidades().subscribe((data:any) => {
      this.modalidades = data
    })
    this.accountService.getComunasRes().subscribe((data:any) => {
      this.comunasRes = data
    })
    this.accountService.getComunasTra().subscribe((data:any) => {
      this.comunasTra = data
    })

    this.registerForm.get('idSitLaboral')?.valueChanges.subscribe((value : any) => {
      if (value == 1) {
        this.registerForm.get('IdEstado')?.setValue(1)
        this.registerForm.get('IdComunaTra')?.addValidators(Validators.required)
        this.registerForm.get('IdModalidad')?.addValidators(Validators.required)
      } else {
        this.registerForm.get('IdEstado')?.setValue(2)
      }
      //console.log(this.registerForm.get('IdEstado')?.value)
    })

    this.registerForm.get('IdModalidad')?.valueChanges.subscribe((value : any) => {
      if (value == 3){
        this.registerForm.get('IdEstado')?.setValue(2)
      } else {
        this.registerForm.get('IdEstado')?.setValue(1)
      }
      //console.log(this.registerForm.get('IdEstado')?.value)
    })

  }

  submitForm(){
    //console.log("submit");
    this.accountService.register(this.registerForm.value);
    this.registerForm.reset()
  }

  backToLogin(){
    this.registerForm.reset()
    this.router.navigate(['/']);
  }
}

