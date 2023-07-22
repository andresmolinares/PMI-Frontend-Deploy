import { TestBed } from '@angular/core/testing';

import { MagneticResonanceGuard } from './magnetic-resonance.guard';

describe('MagneticResonanceGuard', () => {
  let guard: MagneticResonanceGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MagneticResonanceGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
