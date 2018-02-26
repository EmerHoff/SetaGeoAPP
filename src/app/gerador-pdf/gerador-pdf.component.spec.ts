import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeradorPdfComponent } from './gerador-pdf.component';

describe('GeradorPdfComponent', () => {
  let component: GeradorPdfComponent;
  let fixture: ComponentFixture<GeradorPdfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeradorPdfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeradorPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
