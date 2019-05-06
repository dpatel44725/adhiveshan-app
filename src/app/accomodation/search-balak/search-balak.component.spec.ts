import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBalakComponent } from './search-balak.component';

describe('SearchBalakComponent', () => {
  let component: SearchBalakComponent;
  let fixture: ComponentFixture<SearchBalakComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchBalakComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBalakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
