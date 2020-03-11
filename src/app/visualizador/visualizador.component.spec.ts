import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizadorComponent } from './visualizador.component';

describe('VisualizadorComponent', () => {
  let component: VisualizadorComponent;
  let fixture: ComponentFixture<VisualizadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
