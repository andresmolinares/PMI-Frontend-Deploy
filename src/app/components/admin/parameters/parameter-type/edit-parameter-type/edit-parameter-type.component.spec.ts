import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditParameterTypeComponent } from './edit-parameter-type.component';

describe('EditParameterTypeComponent', () => {
  let component: EditParameterTypeComponent;
  let fixture: ComponentFixture<EditParameterTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditParameterTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditParameterTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
