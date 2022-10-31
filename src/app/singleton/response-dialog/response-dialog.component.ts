import { Component, Inject, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AnimationItem } from 'lottie-web';
import { DialogData } from '../../interfaces/dialog-data';

@Component({
  selector: 'app-response-dialog',
  templateUrl: './response-dialog.component.html',
  styleUrls: ['./response-dialog.component.scss'],
})
export class ResponseDialogComponent implements OnInit {
  optionsSuccess: AnimationOptions = {
    path: '/assets/animations/success-TLD.json',
  };

  optionsError: AnimationOptions = {
    path: '/assets/animations/error-TLD.json',
  };

  constructor(
    public dialogRef: MatDialogRef<ResponseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {}

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }
}
