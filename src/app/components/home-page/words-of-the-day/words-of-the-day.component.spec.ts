import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordsOfTheDayComponent } from './words-of-the-day.component';

describe('WordsOfTheDayComponent', () => {
  let component: WordsOfTheDayComponent;
  let fixture: ComponentFixture<WordsOfTheDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordsOfTheDayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WordsOfTheDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
