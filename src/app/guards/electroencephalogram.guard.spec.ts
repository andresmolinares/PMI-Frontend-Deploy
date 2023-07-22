import { TestBed } from '@angular/core/testing';

import { ElectroencephalogramGuard } from './electroencephalogram.guard';

describe('ElectroencephalogramGuard', () => {
  let guard: ElectroencephalogramGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ElectroencephalogramGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
