import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordListOptionsComponent } from './word-list-options.component';

describe('WordListOptionsComponent', () => {
  let component: WordListOptionsComponent;
  let fixture: ComponentFixture<WordListOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordListOptionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WordListOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
