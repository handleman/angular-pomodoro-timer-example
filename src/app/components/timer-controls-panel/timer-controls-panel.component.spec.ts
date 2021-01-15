import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerControlsPanelComponent } from './timer-controls-panel.component';

describe('TimerControlsPanelComponent', () => {
  let component: TimerControlsPanelComponent;
  let fixture: ComponentFixture<TimerControlsPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimerControlsPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimerControlsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
