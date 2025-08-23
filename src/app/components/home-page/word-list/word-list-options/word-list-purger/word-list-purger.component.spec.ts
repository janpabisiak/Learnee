import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordListPurgerComponent } from './word-list-purger.component';

describe('WordListPurgerComponent', () => {
  let component: WordListPurgerComponent;
  let fixture: ComponentFixture<WordListPurgerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordListPurgerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WordListPurgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
