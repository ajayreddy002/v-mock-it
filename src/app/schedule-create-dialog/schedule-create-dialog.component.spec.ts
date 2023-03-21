import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleCreateDialogComponent } from './schedule-create-dialog.component';

describe('ScheduleCreateDialogComponent', () => {
  let component: ScheduleCreateDialogComponent;
  let fixture: ComponentFixture<ScheduleCreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleCreateDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
