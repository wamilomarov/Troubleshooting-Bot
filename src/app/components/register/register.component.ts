import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ProfileService} from '../../services/profile/profile.service';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(
    private profileService: ProfileService,
    private _formBuilder: FormBuilder,
    private router: Router,
    private cookieService: CookieService
  ) {
  }

  ngOnInit() {
    this.form = this._formBuilder.group({
      name: [null, Validators.required],
      username: [null, Validators.required],
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required, Validators.minLength(5)]],
      password_confirmation: [null, [Validators.required]],
    }, {validators: [this.checkPasswords]});
  }

  checkPasswords(group: FormGroup) {
    let pass = group.get('password').value;
    let confirmPass = group.get('password_confirmation').value;
    return pass === confirmPass ? null : group.controls.password_confirmation.setErrors({notSame: 'Passwords should match.'});
  }

  onRegister = () => {
    this.profileService.register(this.form.value)
      .subscribe(
        data => {
          this.cookieService.set('afterRegister', 'true');
          this.router.navigate(['login']);
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
