import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  answerForm: FormGroup;
  idUsuario: any;
  tipoTransporte: any;
  transporte: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private homeService: HomeService,
    private alertController: AlertController
  ) {
    this.answerForm = this.fb.group({
      idTipoTransporte: new FormControl([Validators.required]),
      esCompartido: new FormControl([Validators.required]),
      idUsuario: new FormControl(''),
      idTransporte: new FormControl([Validators.required]),
      km_recorrido: new FormControl(),
      minutos_recorrido: new FormControl(),
      dias_trabajo: new FormControl(),
    });
  }

  ngOnInit() {
    this.homeService.getIdUser().subscribe((data: any) => {
      this.idUsuario = data.id;
      console.log(this.idUsuario);
      this.answerForm?.get('idUsuario')?.setValue(this.idUsuario);
    });

    this.homeService.getTipoTransportes().subscribe((data: any) => {
      this.tipoTransporte = data;
      console.log(this.tipoTransporte);
    });

    this.homeService.getTransportes().subscribe((data: any) => {
      this.transporte = data;
      console.log(this.transporte);
    });

    this.answerForm?.get('esCompartido')?.valueChanges.subscribe((value) => {
      console.log(value);
      if (value == 'true') {
        this.answerForm
          ?.get('km_recorrido')
          ?.setValidators([Validators.required]);
        this.answerForm
          ?.get('minutos_recorrido')
          ?.setValidators([Validators.required]);
        this.answerForm
          ?.get('dias_trabajo')
          ?.setValidators([Validators.required]);
      }
    });

    this.answerForm
      ?.get('idTipoTransporte')
      ?.valueChanges.subscribe((value) => {
        if (value == 1) {
          this.answerForm?.get('esCompartido')?.setValue(true);
        }
      });
  }

  submitForm() {
    console.log('submit');
    this.homeService.submitEncuesta(this.answerForm.value).subscribe({
      next: (resp: any) => {
        console.log(resp);
        this.router.navigate(['/home/tabs/tab2']);
      },
      error: async (error) => {
        console.error(error);
        const alert = await this.alertController.create({
          header: '⚠️ Atención',
          subHeader: 'No es sujeto de la encuesta',
          message:
            error.error.message ||
            'No cumple con los criterios para participar en esta encuesta.',
          cssClass: 'custom-alert',
          backdropDismiss: false,
          buttons: [
            {
              text: 'Entendido',
              role: 'cancel',
              cssClass: 'custom-alert-button',
            },
          ],
        });
        await alert.present();
      },
    });
  }

  backToLogin() {
    this.router.navigate(['/']);
  }
}
