import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../services/snackbar.service';
import { UserService } from '../services/user.service';
import { GlobalConstaints } from '../shared/global-constaints';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm: any = FormGroup;
  responseMessage: any;


  constructor(private _formBuilder: FormBuilder,
    private _userService: UserService,
    public _dialogRef: MatDialogRef<ForgotPasswordComponent>,
    private _ngxService: NgxUiLoaderService,
    
    private _snackBarService: SnackbarService) { }


  ngOnInit(): void {
    this.forgotPasswordForm = this._formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(GlobalConstaints.emaileRegix)]]
    });
  }

  handleSubmit() {
    this._ngxService.start();
    var formatDate = this.forgotPasswordForm.value;
    var data = {
      email: formatDate.email
    }
    this._userService.forgotPassword(data).subscribe((response: any) => {
      this._ngxService.stop;
      this.responseMessage = response?.message;
      this._dialogRef.close();
      this._snackBarService.openSnackBar(this.responseMessage, "");
      
    }, (error) => {
      this._ngxService.stop();
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = GlobalConstaints.genericError;
      }
      this._snackBarService.openSnackBar(this.responseMessage, GlobalConstaints.error);
    })
  }

}
