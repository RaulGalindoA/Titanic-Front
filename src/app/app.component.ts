import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Person } from './interfaces/person';
import { TitanicService } from './services/titanic-service.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddPersonDialogComponent } from './singleton/add-person-dialog/add-person-dialog.component';
import { ChooseFileDialogComponent } from './singleton/choose-file-dialog/choose-file-dialog.component';
import { ResponseDialogComponent } from './singleton/response-dialog/response-dialog.component';
import { DialogData } from './interfaces/dialog-data';
import { ConfirmDialogComponent } from './singleton/confirm-dialog/confirm-dialog.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  // Decorator for darkmode
  @HostBinding('class') className = '';

  title = 'titanicFront';

  // Filters fields
  name: string = '';
  class: string = '';
  sex: string = '';

  pageIndex: number = 0;
  length = 0;
  pageSize = 50;
  pageSizeOptions = [50, 100, 200];

  // Columns displayed in the table
  displayedColumns: string[] = [
    '_id',
    'Survived',
    'Pclass',
    'Name',
    'Sex',
    'Age',
    'SiblingsSpouses',
    'ParentsChildren',
    'Fare',
    'Actions',
  ];

  // Data of the table
  dataSource: Person[] = [];

  toggleControl = new FormControl(false);

  constructor(
    private titanicService: TitanicService,
    private overlay: OverlayContainer,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getAll();
    // When toggling, activates class for darkmode
    this.toggleControl.valueChanges.subscribe((darkMode) => {
      const darkClassName = 'darkMode';
      this.className = darkMode ? darkClassName : '';
      if (darkMode) {
        this.overlay.getContainerElement().classList.add(darkClassName);
      } else {
        this.overlay.getContainerElement().classList.remove(darkClassName);
      }
    });
  }

  addPerson() {
    // Opens the dialog
    const dialogRef = this.dialog.open(AddPersonDialogComponent);
    dialogRef.afterClosed().subscribe((resp) => {
      if (resp) {
        this.dialog.open(ResponseDialogComponent, {
          width: '500px',
          height: '400px',
          data: resp,
        });
        // Reloads the table to add the new person
        this.getAll();
      }
    });
  }

  editPerson(person: Person) {
    // Opens the dialog
    const dialogRef = this.dialog.open(AddPersonDialogComponent, {
      data: person,
    });
    dialogRef.afterClosed().subscribe((resp) => {
      if (resp) {
        this.dialog.open(ResponseDialogComponent, {
          width: '500px',
          height: '400px',
          data: resp,
        });
        // Reloads the table for refreshing the person edited
        this.getAll();
      }
    });
  }

  import() {
    const dialogRef = this.dialog.open(ChooseFileDialogComponent, {
      width: '500px',
      height: '500px',
    });
    dialogRef.afterClosed().subscribe((resp) => {
      // Depending of the dialog Response, shows a new dialog indicating the result
      if (resp) {
        let dialogData: DialogData = {
          message: 'Archivo cargado correctamente.',
          header: 'Éxito',
          success: true,
        };
        this.dialog.open(ResponseDialogComponent, {
          width: '500px',
          height: '400px',
          data: dialogData,
        });
        this.getAll();
      } else if (resp == false) {
        let dialogData: DialogData = {
          message:
            'Ocurrió un error al guardar el archivo, por favor, inténtelo nuevamente.',
          header: 'Error',
          success: false,
        };
        this.dialog.open(ResponseDialogComponent, {
          width: '500px',
          height: '400px',
          data: dialogData,
        });
      }
    });
  }

  getAll() {
    // Calls the service getAll and displays to the table
    this.titanicService.getAll(this.pageSize, this.pageIndex).subscribe({
      next: (resp) => {
        this.dataSource = resp.data!;
        this.length = resp.length!;
      },
      error: (error) => { },
    });
  }

  deletePerson(person: Person) {
    let dialogData: DialogData = {
      message: `¿Are you sure you want to delete: ${person.Name}?`,
      header: 'Warning',
    };
    // Opens the confirmation dialog
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: dialogData,
      width: '500px',
    });
    // If the user clicked yes, calls the service and shows a dialog with the response of the service and refreshes the table
    dialogRef.afterClosed().subscribe((resp) => {
      if (resp) {
        this.titanicService.deletePerson(person).subscribe((resp) => {
          let data: DialogData = {
            header: 'Success',
            message: resp.message,
            success: true,
          };
          this.dialog.open(ResponseDialogComponent, {
            width: '500px',
            height: '400px',
            data,
          });
          this.getAll();
        });
      }
    });
  }

  // If is changed the pagesize or pageindex, is called this function updating the table options
  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getAll();
  }

  // Clears the filters and refreshes the table
  clear() {
    this.name = '';
    this.class = '';
    this.sex = '';
    this.getAll();
  }

  // Calls the endpoint getAll with the selected filters
  filters() {
    this.titanicService
      .getAll(
        this.pageSize,
        this.pageIndex,
        this.name != '' ? this.name : undefined,
        this.class != '' ? this.class : undefined,
        this.sex != '' ? this.sex : undefined
      )
      .subscribe({
        next: (resp) => {
          this.dataSource = resp.data!;
        },
      });
  }
}
