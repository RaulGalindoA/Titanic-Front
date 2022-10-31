import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseFileDialogComponent } from './choose-file-dialog.component';

describe('ChooseFileDialogComponent', () => {
  let component: ChooseFileDialogComponent;
  let fixture: ComponentFixture<ChooseFileDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseFileDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChooseFileDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
