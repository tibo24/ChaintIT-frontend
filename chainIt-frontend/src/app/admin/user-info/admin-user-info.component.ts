import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { MatDialogConfig, MatDialog, MatPaginator } from '@angular/material';
import { NewUserDialogComponent } from '../new-user-dialog/new-user-dialog.component';
import { DeleteUserDialogComponent } from '../delete-user-dialog/delete-user-dialog.component';

@Component({
  selector: 'app-admin-user-info',
  templateUrl: './admin-user-info.component.html',
  styleUrls: ['./admin-user-info.component.css']
})
export class AdminUserInfoComponent implements OnInit {

  displayedColumns: string[] = ['email', 'firstName', 'lastName', 'participant', 'company', 'actions'];
  dataSource = new MatTableDataSource<any[]>();
  cardSizes: any;
  userList;
  response: any[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  cards = this.breakpointObserver.observe(Breakpoints.Large).pipe(
    map(({ matches }) => {
      if (matches) {
        this.cardSizes = [
          { cols: 2, rows: 2 },
          { cols: 2, rows: 2 }
        ];
      } else {
        this.cardSizes = [
          { cols: 4, rows: 2 },
          { cols: 4, rows: 2 }
        ];
      }
    })
  ).subscribe();


  constructor(private breakpointObserver: BreakpointObserver, private dialog: MatDialog, private userService: UserService) { }


  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getAllUsers();
  }

  openRegisterUserDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      company: '',
      selectedParticipant: '',
    };

    const dialogRef = this.dialog.open(NewUserDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          this.userService.registerUser(data)
            .then(() => {
              this.getAllUsers();
            })
        }
      }
    );
  }

  openDeleteUserDialog(firstName: string, userId: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      title: 'Bent u zeker dat u ' + firstName + ' wilt verwijderen?'
    }

    const dialogRef = this.dialog.open(DeleteUserDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      (data) => {
        if (data) {
          this.userService.deleteUser(firstName, userId)
            .then(() => {
              this.getAllUsers();
            })
        }
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAllUsers() {
    this.response = [];
    this.userService.getAllUsers()
      .then((res) => {
        this.response.push(res);
        this.dataSource.data = this.response[0];
      });
  }

}
