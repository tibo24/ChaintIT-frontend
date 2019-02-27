import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatSnackBar } from "@angular/material";
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-new-sensor-dialog',
  templateUrl: './new-sensor-dialog.component.html',
  styleUrls: ['./new-sensor-dialog.component.css']
})
export class NewSensorDialogComponent implements OnInit {

  form: FormGroup;
  lrcid: string;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<NewSensorDialogComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) data) {
    this.lrcid = data.lrcid;
  }

  ngOnInit() {
    this.form = this.fb.group({
      lrcid: [this.lrcid],
    });
  }

  submit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    } else {
      this.openSnackbar('Gelieven alles in te vullen aub');
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
