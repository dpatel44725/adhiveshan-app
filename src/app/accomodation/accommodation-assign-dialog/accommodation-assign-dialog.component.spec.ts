import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationAssignDialogComponent } from './accommodation-assign-dialog.component';

describe('AccommodationAssignDialogComponent', () => {
  let component: AccommodationAssignDialogComponent;
  let fixture: ComponentFixture<AccommodationAssignDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccommodationAssignDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccommodationAssignDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
