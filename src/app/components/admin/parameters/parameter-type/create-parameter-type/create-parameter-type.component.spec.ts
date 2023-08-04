import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateParameterTypeComponent } from './create-parameter-type.component';

describe('CreateParameterTypeComponent', () => {
  let component: CreateParameterTypeComponent;
  let fixture: ComponentFixture<CreateParameterTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateParameterTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateParameterTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
