import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WotdItemComponent } from './wotd-item.component';

describe('WotdItemComponent', () => {
  let component: WotdItemComponent;
  let fixture: ComponentFixture<WotdItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WotdItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WotdItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
