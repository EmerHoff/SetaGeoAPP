import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapgastoComponent } from './mapgasto.component';

describe('MapgastoComponent', () => {
  let component: MapgastoComponent;
  let fixture: ComponentFixture<MapgastoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapgastoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapgastoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
