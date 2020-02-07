import {Component, OnInit} from '@angular/core';
import {ProfileService} from '../../services/profile/profile.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CookieService} from 'ngx-cookie-service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  showSpinner: boolean;
  errorMsg: object = {};

  constructor(
    private profileService: ProfileService,
    private router: Router,
    private _formBuilder: FormBuilder,
    private cookieService: CookieService,
    private snackBar: MatSnackBar) {
    this.showSpinner = false;
  }

  ngOnInit() {
    if (this.cookieService.check('afterRegister') && this.cookieService.get('afterRegister') == 'true')
    {
      this.snackBar.open("You have successfully registered. Please log in to proceed.", "Ok", {
        duration: 2000,
      });
      this.cookieService.delete('afterRegister');
    }
    this.form = this._formBuilder.group({
      username: [null, Validators.required],
      password: [null, [Validators.required, Validators.minLength(5)]],
    });
  }

  onLogin() {
    this.profileService.login(this.form.value)
      .subscribe(
        data => {
          this.router.navigate(['']);
        },
        error => {
          for (let key in error.error.errors)
          {
            this.form.controls[key].setErrors({message: error.error.errors[key]})
          }
        }
      );
  }
}
