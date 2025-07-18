import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordListItemComponent } from './word-list-item.component';

describe('WordListItemComponent', () => {
  let component: WordListItemComponent;
  let fixture: ComponentFixture<WordListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordListItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WordListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
