import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioindexComponent } from './relatorioindex.component';

describe('RelatorioindexComponent', () => {
  let component: RelatorioindexComponent;
  let fixture: ComponentFixture<RelatorioindexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatorioindexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
