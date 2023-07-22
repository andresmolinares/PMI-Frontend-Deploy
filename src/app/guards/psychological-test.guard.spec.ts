import { TestBed } from '@angular/core/testing';

import { PsychologicalTestGuard } from './psychological-test.guard';

describe('PsychologicalTestGuard', () => {
  let guard: PsychologicalTestGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PsychologicalTestGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
