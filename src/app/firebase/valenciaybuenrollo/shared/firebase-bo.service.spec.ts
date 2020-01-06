import { TestBed } from '@angular/core/testing';

import { FirebaseBOService } from './firebase-bo.service';

describe('FirebaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FirebaseBOService = TestBed.get(FirebaseBOService);
    expect(service).toBeTruthy();
  });
});
