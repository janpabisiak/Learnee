import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordsPerPageSelectorComponent } from './words-per-page-selector.component';

describe('WordsPerPageSelectorComponent', () => {
  let component: WordsPerPageSelectorComponent;
  let fixture: ComponentFixture<WordsPerPageSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordsPerPageSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WordsPerPageSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
