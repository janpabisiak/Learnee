import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordListSearchBarComponent } from './word-list-search-bar.component';

describe('WordListSearchBarComponent', () => {
  let component: WordListSearchBarComponent;
  let fixture: ComponentFixture<WordListSearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordListSearchBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WordListSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
