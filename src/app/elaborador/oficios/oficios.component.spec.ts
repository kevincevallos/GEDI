import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OficiosComponent } from './oficios.component';

describe('OficiosComponent', () => {
  let component: OficiosComponent;
  let fixture: ComponentFixture<OficiosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OficiosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OficiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
