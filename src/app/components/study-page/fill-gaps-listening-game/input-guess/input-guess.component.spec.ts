import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputGuessComponent } from './input-guess.component';

describe('InputGuessComponent', () => {
  let component: InputGuessComponent;
  let fixture: ComponentFixture<InputGuessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputGuessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputGuessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
