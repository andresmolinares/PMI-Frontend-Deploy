import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTestsComponent } from './new-tests.component';

describe('NewTestsComponent', () => {
  let component: NewTestsComponent;
  let fixture: ComponentFixture<NewTestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewTestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
