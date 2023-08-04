import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameterTypeComponent } from './parameter-type.component';

describe('ParameterTypeComponent', () => {
  let component: ParameterTypeComponent;
  let fixture: ComponentFixture<ParameterTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParameterTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParameterTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
