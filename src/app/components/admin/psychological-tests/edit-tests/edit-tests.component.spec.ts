import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarTestsComponent } from './edit-tests.component';

describe('EditarTestsComponent', () => {
  let component: EditarTestsComponent;
  let fixture: ComponentFixture<EditarTestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarTestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarTestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
