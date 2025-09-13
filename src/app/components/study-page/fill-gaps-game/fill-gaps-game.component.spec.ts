import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FillGapsGameComponent } from './fill-gaps-game.component';

describe('FillGapsGameComponent', () => {
  let component: FillGapsGameComponent;
  let fixture: ComponentFixture<FillGapsGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FillGapsGameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FillGapsGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
