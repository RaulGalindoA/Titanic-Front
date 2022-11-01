import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Person } from '../../interfaces/person';
import { TitanicService } from '../../services/titanic-service.service';
import { DialogData } from '../../interfaces/dialog-data';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-person-dialog',
  templateUrl: './add-person-dialog.component.html',
  styleUrls: ['./add-person-dialog.component.scss'],
})
export class AddPersonDialogComponent implements OnInit {
  person!: Person;

  myForm: FormGroup = this.fb.group({
    Survived: [],
    Pclass: [, [Validators.required]],
    Name: [, [Validators.required]],
    Sex: [, [Validators.required]],
    Age: [, [Validators.required]],
    SiblingsSpouses: [, [Validators.required]],
    ParentsChildren: [, [Validators.required]],
    Fare: [, [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private titanicService: TitanicService,
    public dialogRef: MatDialogRef<AddPersonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Person
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.myForm.controls['Survived'].setValue(this.data.Survived);
      this.myForm.controls['Pclass'].setValue(this.data.Pclass);
      this.myForm.controls['Name'].setValue(this.data.Name);
      this.myForm.controls['Sex'].setValue(this.data.Sex);
      this.myForm.controls['Age'].setValue(this.data.Age);
      this.myForm.controls['SiblingsSpouses'].setValue(
        this.data.SiblingsSpouses
      );
      this.myForm.controls['ParentsChildren'].setValue(
        this.data.ParentsChildren
      );
      this.myForm.controls['Fare'].setValue(this.data.Fare);
    }
  }

  addPerson() {
    this.myForm.markAllAsTouched();
    if (this.myForm.invalid) return;
    let auxPerson: Person = {
      _id: this.data && this.data._id ? this.data._id: undefined,
      Age: this.myForm.get('Age')?.value,
      Pclass: this.myForm.get('Pclass')?.value,
      Name: this.myForm.get('Name')?.value,
      Sex: this.myForm.get('Sex')?.value,
      SiblingsSpouses: this.myForm.get('SiblingsSpouses')?.value,
      ParentsChildren: this.myForm.get('ParentsChildren')?.value,
      Fare: this.myForm.get('Fare')?.value,
      Survived: this.myForm.get('Survived')?.value,
    };

    this.person = auxPerson;

    if (this.data) {
      this.titanicService.updatePerson(this.person).subscribe({
        next: (resp) => {
          let dialogData: DialogData = {
            header: 'Success',
            message: resp.message,
            success: true,
          };
          this.dialogRef.close(dialogData);
        },
      });
    } else {
      this.titanicService.addPerson(this.person).subscribe({
        next: (resp) => {
          let dialogData: DialogData = {
            header: 'Success',
            message: resp.message,
            success: true,
          };
          this.dialogRef.close(dialogData);
        },
      });
    }
  }
}
