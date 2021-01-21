import { TestBed } from '@angular/core/testing';

import { SettingsAreSavedGuard } from './settings-are-saved.guard';

describe('SettingsAreSavedGuard', () => {
  let guard: SettingsAreSavedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SettingsAreSavedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
