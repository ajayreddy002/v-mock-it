import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetBookComponent } from './meet-book.component';

describe('MeetBookComponent', () => {
  let component: MeetBookComponent;
  let fixture: ComponentFixture<MeetBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeetBookComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeetBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
