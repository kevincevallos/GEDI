import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElaboradorComponent } from './elaborador.component';

describe('ElaboradorComponent', () => {
  let component: ElaboradorComponent;
  let fixture: ComponentFixture<ElaboradorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElaboradorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElaboradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
