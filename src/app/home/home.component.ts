import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { SignupComponent } from '../signup/signup.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private _dialog: Dialog) { }

  ngOnInit(): void {
  }

  handleSignupAction(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width= "55px";
    this._dialog.open(SignupComponent, dialogConfig);
  }

  handleForgotPasswordAction(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width= "55px";
    this._dialog.open(ForgotPasswordComponent, dialogConfig);
  }
}
