import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../services/snackbar.service';
import { UserService } from '../services/user.service';
import { GlobalConstaints } from '../shared/global-constaints';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  password = true;
  confirmPassword = true;
  signupForm: any = FormGroup;
  responseMessage: any;

  constructor(
    private _fromBuilder: FormBuilder,
    private _router: Router,
    private _userService: UserService,
    private _snackbarSerervice: SnackbarService,
    public _dialogRef: DialogRef,
    private _ngxService: NgxUiLoaderService

  ) { }

  ngOnInit(): void {
    this.signupForm = this._fromBuilder.group({
      name: [null, [Validators.required, Validators.pattern(GlobalConstaints.nameRegix)]],
      email: [null, [Validators.required, Validators.pattern(GlobalConstaints.emaileRegix)]],
      contactNumber: [null, [Validators.required, Validators.pattern(GlobalConstaints.contactNumberRegix)]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]]
    })
  }

  validateSubmit() {
    if (this.signupForm.controls['password'].value != this.signupForm.controls['confirmPassword'].value) {
      return true;
    } else {
      return false;
    }
  }

  handleSubmit() {
    this._ngxService.start();
    var formData = this.signupForm.value;
    var data = {
      name: formData.name,
      email: formData.email,
      contactNumber: formData.contactNumber,
      password: formData.password,
    }
    this._userService.signup(data).subscribe((response: any) => {
      this._ngxService.stop();
      this._dialogRef.close();
      this.responseMessage = response?.message;
      this._snackbarSerervice.openSnackBar(this.responseMessage, "");
      this._router.navigate(['/']);
    }, (error) => {
      this._ngxService.stop();
      if (error.error?.message) {
        this.responseMessage = error.error?.message();
      } else {
        this.responseMessage = GlobalConstaints.genericError;
        this._snackbarSerervice.openSnackBar(this.responseMessage, GlobalConstaints.error);
      }
    });
  }

}
