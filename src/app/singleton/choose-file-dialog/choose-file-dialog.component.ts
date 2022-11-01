import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TitanicService } from '../../services/titanic-service.service';

@Component({
  selector: 'app-choose-file-dialog',
  templateUrl: './choose-file-dialog.component.html',
  styleUrls: ['./choose-file-dialog.component.scss'],
})
export class ChooseFileDialogComponent {
  error!: string;
  dragAreaClass!: string;
  draggedFiles: any;
  existFile: boolean = false;
  fName: string = '';

  constructor(
    private titanicService: TitanicService,
    public dialogRef: MatDialogRef<ChooseFileDialogComponent>
  ) {}

  repeating: boolean = false;

  ngOnInit() {
    this.dragAreaClass = 'dragarea';
  }
  onFileChange(event: any) {
    let files: FileList = event.target.files;
    this.saveFiles(files);
  }
  @HostListener('dragover', ['$event']) onDragOver(event: any) {
    this.dragAreaClass = 'droparea';
    event.preventDefault();
  }
  @HostListener('dragenter', ['$event']) onDragEnter(event: any) {
    this.dragAreaClass = 'droparea';
    console.log('entrando');
    event.preventDefault();
  }
  @HostListener('dragend', ['$event']) onDragEnd(event: any) {
    this.dragAreaClass = 'dragarea';
    event.preventDefault();
  }
  @HostListener('dragleave', ['$event']) onDragLeave(event: any) {
    this.dragAreaClass = 'dragarea';
    console.log('soltado');

    event.preventDefault();
  }
  @HostListener('drop', ['$event']) onDrop(event: any) {
    this.dragAreaClass = 'dragarea';
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files) {
      let files: FileList = event.dataTransfer.files;
      this.saveFiles(files);
    }
  }

  saveFiles(files: FileList) {
    if (files.length > 1) this.error = 'Only one file at time allow';
    else {
      this.existFile = true;
      this.error = '';
      console.log(files[0].size, files[0].name, files[0].type);
      this.fName = files[0].name;
      this.draggedFiles = files;
    }
  }

  deleteFiles() {
    this.existFile = false;
    this.draggedFiles = [];
    this.fName = '';
  }

  upload() {
    let formData = new FormData();
    formData.append('file', this.draggedFiles[0]);
    if ( !this.repeating ) formData.append('check', 'true')
    this.titanicService.uploadFile(formData).subscribe({
      next: (response) => {
        console.log('Cargado');
        console.log(response);

        this.dialogRef.close(true);
      },
      error: (error) => {
        console.log('error');
        this.dialogRef.close(false);
      },
      complete() {},
    });
  }
}
