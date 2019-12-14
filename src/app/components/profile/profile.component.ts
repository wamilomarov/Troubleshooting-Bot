import {Component, OnInit} from '@angular/core';
import {Profile} from '../../interfaces/profile';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile: Profile;
  imageUrl: any;
  hideOldPassword = true;
  hideNewPassword = true;
  hideConfirmNewPassword = true;
  profileForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) {
    this.profile = new class implements Profile {
      email: string;
      name: string;
      photo: string;
    };
    this.profile.email = 'shamil.omarov@ericsson.com';
    this.profile.name = 'Shamil Omarov';
    this.profile.photo = 'http://localhost:4200/assets/img/img_avatar.png';
    this.imageUrl = this.profile.photo;
  }

  ngOnInit() {

    this.profileForm = this.formBuilder.group({
      name: [this.profile.name, Validators.required],
      email: [this.profile.email, [Validators.required, Validators.email]],
      photo: [null, []],
      oldPassword: [null, []],
      newPassword: [null, []],
      confirmNewPassword: [null, []],
    }, {
      validator: this.passwordMatching
    });
  }

  get f() { return this.profileForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.profileForm.invalid) {
      return;
    }

    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.profileForm.value, null, 4));
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
    // this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imageUrl = reader.result;
    }
  }

  passwordMatching(c: AbstractControl): { invalid: boolean } {
    if (c.get('newPassword').value !== c.get('confirmNewPassword').value) {
      return {invalid: true};
    }
  }

}
