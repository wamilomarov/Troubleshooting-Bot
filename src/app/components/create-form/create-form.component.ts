import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
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

  newCsr: NewCsr;
  // tslint:disable-next-line:variable-name
  constructor(private _formBuilder: FormBuilder, private csrService: CsrService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  submit = () => {
    this.csrService.create(this.newCsr)
      .subscribe(() => {
        this.snackBar.open("CSR saved successfully.", "Ok", {
          duration: 2000,
        })
      })
  };

  checkCsrId = () => {
    this.csrService.check(this.newCsr.csr_id)
      .subscribe(
        data => { console.log(data)},
        error => {return error;}
      )
  }

}

export class NewCsr
{
  csr_id: string;
  slogan: string;
  problem_description: string;
  solution_description: string;
}
