import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordListSortComponent } from './word-list-sort.component';

describe('WordListSortComponent', () => {
  let component: WordListSortComponent;
  let fixture: ComponentFixture<WordListSortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordListSortComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WordListSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
