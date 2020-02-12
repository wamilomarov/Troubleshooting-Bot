import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CookieService} from 'ngx-cookie-service';
import {ProfileService} from '../../services/profile/profile.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile: any = {};
  imageUrl: any;
  hideOldPassword = true;
  hideNewPassword = true;
  hideConfirmNewPassword = true;
  form: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private cookieService: CookieService,
    private profileService: ProfileService,
    private snackBar: MatSnackBar)
  {
    this.profile._id = cookieService.get('user._id');
    this.profile.email = cookieService.get('user.email');
    this.profile.username = cookieService.get('user.username');
    this.profile.name = cookieService.get('user.name');
    this.profile.photo = 'http://localhost:4200/assets/img/img_avatar.png';
    this.imageUrl = this.profile.photo;
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: [this.profile.name, Validators.required],
      username: [this.profile.username, Validators.required],
      email: [this.profile.email, [Validators.required, Validators.email]],
      photo: [null],
      old_password: [null],
      new_password: [null],
      new_password_confirmation: [null],
    }, {
      validator: [this.checkPasswords, this.oldPasswordRequired, this.newPasswordLength]
    });
  }

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
    this.profileService.update(this.form.value).subscribe(
      data => {
        this.snackBar.open("Profile was successfully updated!", "Ok", {duration: 2000})
      },
      error => {
        for (let key in error.error.errors)
        {
          this.form.controls[key].setErrors({message: error.error.errors[key]})
        }
      }
    )
  }

  triggerImageInput = () => {
    document.getElementById('imageInput').click();
  };

  preview(files) {
    if (files.length === 0)
    {
      return;
    }

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      // this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    console.log(files[0]);
    // this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imageUrl = reader.result;
    }
  }

  checkPasswords(group: FormGroup) {
    let pass = group.get('new_password').value;
    let confirmPass = group.get('new_password_confirmation').value;
    return pass === confirmPass ? null : group.controls.new_password_confirmation.setErrors({message: 'Passwords should match.'});
  }

  oldPasswordRequired(group: FormGroup) {
    let newPass = group.get('new_password').value;
    let oldPass = group.get('old_password').value;
    if (newPass)
    {
      if (oldPass)
      {
        return  null;
      }
      else
      {
        group.controls.old_password
          .setErrors({message: 'Provide old password to set new password.'});
      }
    }
    return null;
  }

  newPasswordLength(group: FormGroup) {
    let newPass = group.get('new_password').value;
    return !newPass || newPass.length >= 5 ? null : group.controls.new_password
      .setErrors({message: 'Password should be at least 5 characters long.'});
  }
}
