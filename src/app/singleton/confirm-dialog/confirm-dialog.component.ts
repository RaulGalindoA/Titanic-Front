import { Component, Inject, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AnimationItem } from 'lottie-web';
import { DialogData } from '../../interfaces/dialog-data';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent implements OnInit {
  optionsWarning: AnimationOptions = {
    path: '/assets/animations/warning-TLD.json',
  };

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  confirm() {
    this.dialogRef.close(true);
  }

  ngOnInit(): void {}
}
