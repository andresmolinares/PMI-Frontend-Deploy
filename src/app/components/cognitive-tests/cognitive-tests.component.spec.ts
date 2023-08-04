import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CognitiveTestsComponent } from './cognitive-tests.component';

describe('CognitiveTestsComponent', () => {
  let component: CognitiveTestsComponent;
  let fixture: ComponentFixture<CognitiveTestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CognitiveTestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CognitiveTestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
