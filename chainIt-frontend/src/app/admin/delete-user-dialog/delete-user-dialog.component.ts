import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-delete-user-dialog',
  templateUrl: './delete-user-dialog.component.html',
  styleUrls: ['./delete-user-dialog.component.css']
})
export class DeleteUserDialogComponent implements OnInit {

  title: string;

  constructor(
    private dialogRef: MatDialogRef<DeleteUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.title = data.title;
    }

  ngOnInit() {
  }

  deleteUser(firstname: string, userId: string) {
    this.dialogRef.close({firstname, userId});
  }

  close() {
    this.dialogRef.close();
  }

}
