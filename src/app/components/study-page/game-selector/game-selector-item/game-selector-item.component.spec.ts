import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameSelectorItemComponent } from './game-selector-item.component';

describe('GameSelectorItemComponent', () => {
  let component: GameSelectorItemComponent;
  let fixture: ComponentFixture<GameSelectorItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameSelectorItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameSelectorItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
