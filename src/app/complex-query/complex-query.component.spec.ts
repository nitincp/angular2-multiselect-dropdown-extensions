import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplexQueryComponent } from './complex-query.component';

describe('ComplexQueryComponent', () => {
  let component: ComplexQueryComponent;
  let fixture: ComponentFixture<ComplexQueryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplexQueryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplexQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
