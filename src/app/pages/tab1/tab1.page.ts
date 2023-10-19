import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  answerForm: FormGroup;
  idUsuario: string = ''
  tipoTransporte: any
  esCompartido: boolean = false
  transporte: any


  constructor(private router: Router, private fb: FormBuilder, private homeService : HomeService) {
    this.answerForm = this.fb.group({
      idTipoTransporte: new FormControl([Validators.required]),
      esCompartido: new FormControl([Validators.required]),
      idTransporte: new FormControl([Validators.required]),
      km_recorrido: new FormControl(),
      minutos_recorrido: new FormControl(),
    });
  }

  ngOnInit() {

    this.homeService.getIdUser().subscribe((data:any) => {
      this.idUsuario = data.id
      console.log(this.idUsuario)
    })

    this.homeService.getTipoTransportes().subscribe((data:any) => {
      this.tipoTransporte = data
      console.log(this.tipoTransporte)
    })

    this.homeService.getTransportes().subscribe((data:any) => {
      this.transporte = data
      console.log(this.transporte)
    })

    this.answerForm?.get('esCompartido')?.valueChanges.subscribe((value) => {
      console.log(value)
      if(value == 'true'){
        this.answerForm?.get('km_recorrido')?.setValidators([Validators.required])
        this.answerForm?.get('minutos_recorrido')?.setValidators([Validators.required])
      }
    })

    this.answerForm?.get('idTipoTransporte')?.valueChanges.subscribe((value) => {
      if(value == 2){
        this.answerForm?.get('esCompartido')?.setValue(true)
      }
    })

  }


  submitForm(){
    console.log("submit")
    this.homeService.submitEncuesta(this.answerForm.value, this.idUsuario, this.esCompartido).subscribe({
      next: (resp:any) => {
        console.log(resp);
        this.router.navigate(['/home/tabs/tab2']);
      },
      error: error => {
        console.error(error);
      }
    })
  }

  backToLogin(){
    this.router.navigate(['/']);
  }

}
