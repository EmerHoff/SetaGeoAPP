import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapamarcasComponent } from './mapamarcas.component';

describe('MapamarcasComponent', () => {
  let component: MapamarcasComponent;
  let fixture: ComponentFixture<MapamarcasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapamarcasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapamarcasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
