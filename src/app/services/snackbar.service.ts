import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private _snackbar:MatSnackBar) { }

  openSnackBar(message:string,action:string){
    if(action === 'error'){
      this._snackbar.open(message,'',{
        horizontalPosition:'center',
        verticalPosition: 'top',
        duration:2000,
        panelClass:['black-snackbar']
    });
    }
    else{
      this._snackbar.open(message,'',{
        horizontalPosition:'center',
        verticalPosition: 'top',
        duration:2000,
        panelClass:['green-snackbar']
    });
    }
  }
}
