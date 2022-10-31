import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Person } from '../../interfaces/person';

@Component({
  selector: 'app-add-person-dialog',
  templateUrl: './add-person-dialog.component.html',
  styleUrls: ['./add-person-dialog.component.scss']
})
export class AddPersonDialogComponent implements OnInit {

  person!: Person;

  myForm: FormGroup = this.fb.group({
    _id: [, [ Validators.required ]  ],
    Survived: [, [ Validators.required, ]  ],
    Pclass: [, [ Validators.required ]  ],
    Name: [, [ Validators.required ]  ],
    Sex: [, [ Validators.required ]  ],
    Age: [, [ Validators.required ]  ],
    SiblingsSpouses: [, [ Validators.required ]  ],
    ParentsChildren: [, [ Validators.required ]  ],
    Fare: [, [ Validators.required ]  ],
  })
  
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

}
