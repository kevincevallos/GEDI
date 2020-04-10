import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesTitulacionComponent } from './solicitudes-titulacion.component';

describe('SolicitudesTitulacionComponent', () => {
  let component: SolicitudesTitulacionComponent;
  let fixture: ComponentFixture<SolicitudesTitulacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitudesTitulacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudesTitulacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
