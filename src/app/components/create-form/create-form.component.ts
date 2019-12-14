import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {CsrService} from '../../services/csr/csr.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class CreateFormComponent implements OnInit {
  firstStep: FormGroup;
  secondStep: FormGroup;

  // tslint:disable-next-line:variable-name
  constructor(private _formBuilder: FormBuilder, private csrService: CsrService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.firstStep = this._formBuilder.group({
      customer: [null, Validators.required],
      contact_person: [null, Validators.required],
      contact_person_name: [null, Validators.required],
      contact_person_email: [null, [Validators.required, Validators.email]],
    });
    this.secondStep = this._formBuilder.group({
      csr_id: [null, Validators.required],
      slogan: [null, Validators.required],
      problem_description: [null, Validators.required],
      solution_description: [null, Validators.required],
    });
  }

  submit = () => {
    var object = {...this.firstStep.value, ...this.secondStep.value};
    this.csrService.create(object)
      .then(() => {
        this.snackBar.open("CSR saved successfully.", "Ok", {
          duration: 2000,
        })
      })
  }

}
