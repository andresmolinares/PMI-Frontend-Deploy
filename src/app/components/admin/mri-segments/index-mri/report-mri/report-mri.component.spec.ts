import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportMriComponent } from './report-mri.component';

describe('ReportMriComponent', () => {
  let component: ReportMriComponent;
  let fixture: ComponentFixture<ReportMriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportMriComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportMriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
