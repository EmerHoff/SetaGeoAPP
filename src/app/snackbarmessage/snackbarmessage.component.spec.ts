import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackbarmessageComponent } from './snackbarmessage.component';

describe('SnackbarmessageComponent', () => {
  let component: SnackbarmessageComponent;
  let fixture: ComponentFixture<SnackbarmessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnackbarmessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackbarmessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
