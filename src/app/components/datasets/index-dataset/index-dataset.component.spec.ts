import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexDatasetComponent } from './index-dataset.component';

describe('IndexDatasetComponent', () => {
  let component: IndexDatasetComponent;
  let fixture: ComponentFixture<IndexDatasetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexDatasetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexDatasetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
