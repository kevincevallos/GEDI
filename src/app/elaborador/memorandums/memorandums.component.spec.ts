import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemorandumsComponent } from './memorandums.component';

describe('MemorandumsComponent', () => {
  let component: MemorandumsComponent;
  let fixture: ComponentFixture<MemorandumsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemorandumsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemorandumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
