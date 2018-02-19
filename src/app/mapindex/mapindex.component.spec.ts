import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapindexComponent } from './mapindex.component';

describe('MapindexComponent', () => {
  let component: MapindexComponent;
  let fixture: ComponentFixture<MapindexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapindexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
