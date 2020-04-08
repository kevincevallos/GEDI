import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActasReunionesComponent } from './actas-reuniones.component';

describe('ActasReunionesComponent', () => {
  let component: ActasReunionesComponent;
  let fixture: ComponentFixture<ActasReunionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActasReunionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActasReunionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
