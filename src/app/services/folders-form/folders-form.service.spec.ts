import { TestBed } from '@angular/core/testing';
import { provideTranslateService } from "@ngx-translate/core";
import { FoldersFormService } from './folders-form.service';

describe('FoldersFormService', () => {
  let service: FoldersFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideTranslateService()]
    });
    service = TestBed.inject(FoldersFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
