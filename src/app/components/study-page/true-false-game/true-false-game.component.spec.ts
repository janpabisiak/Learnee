import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrueFalseGameComponent } from './true-false-game.component';

describe('TrueFalseGameComponent', () => {
  let component: TrueFalseGameComponent;
  let fixture: ComponentFixture<TrueFalseGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrueFalseGameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrueFalseGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
