import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmWordDeletionModalComponent } from './confirm-word-deletion-modal.component';

describe('ConfirmWordDeletionModalComponent', () => {
  let component: ConfirmWordDeletionModalComponent;
  let fixture: ComponentFixture<ConfirmWordDeletionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmWordDeletionModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmWordDeletionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
