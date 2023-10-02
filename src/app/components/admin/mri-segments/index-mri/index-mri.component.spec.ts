import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexMriComponent } from './index-mri.component';

describe('IndexMriComponent', () => {
  let component: IndexMriComponent;
  let fixture: ComponentFixture<IndexMriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexMriComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexMriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
