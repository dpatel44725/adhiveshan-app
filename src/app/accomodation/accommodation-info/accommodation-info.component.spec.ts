import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationInfoComponent } from './accommodation-info.component';

describe('AccommodationInfoComponent', () => {
  let component: AccommodationInfoComponent;
  let fixture: ComponentFixture<AccommodationInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccommodationInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccommodationInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
