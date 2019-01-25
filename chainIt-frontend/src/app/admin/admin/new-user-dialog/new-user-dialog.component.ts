import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatSnackBar } from "@angular/material";
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-new-user-dialog',
  templateUrl: './new-user-dialog.component.html',
  styleUrls: ['./new-user-dialog.component.css']
})
export class NewUserDialogComponent implements OnInit {

  form: FormGroup;
  firstname: string;
  lastname: string;
  email: string;
  password: string;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<NewUserDialogComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) data) {
    this.firstname = data.firstname;
    this.lastname = data.lastname;
    this.email = data.email;
    this.password = data.password;
  }

  ngOnInit() {
    this.form = this.fb.group({
      firstname: [this.firstname, []],
      lastname: [this.lastname, []],
      email: [this.email, []],
      password: [this.password, []],
    });
  }

  submit() {
    var value = this.form.value;
    if (value.firstname && value.lastname && value.email && value.password) {
      this.dialogRef.close(this.form.value);
    } else {
      this.openSnackbar('Gelieven alles in te vullen aub')
    }
  }

  close() {
    this.dialogRef.close();
  }

  openSnackbar(message: string) {
    this.snackBar.open(message, 'Ok', {
      duration: 3000,
    });
  }

}
