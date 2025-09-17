import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeatMapItemComponent } from './heat-map-item.component';

describe('HeatMapItemComponent', () => {
  let component: HeatMapItemComponent;
  let fixture: ComponentFixture<HeatMapItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeatMapItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeatMapItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
