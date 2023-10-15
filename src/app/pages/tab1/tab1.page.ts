import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  answerForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private accountService: AccountService) {
    this.answerForm = this.fb.group({
      answer1: new FormControl('public', [Validators.required]),
      answer2: new FormControl({ value: 'yes', disabled: false }),
      answer3: new FormControl('', [Validators.required]),
      answer4: new FormControl('', [Validators.required]),
      answer5: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    
  }


  submitForm(){
    console.log("submit");
    //post a la api
    this.accountService.answer();
    this.router.navigate(['tab2']);
  }

  backToLogin(){
    this.router.navigate(['/']);
  }

}
