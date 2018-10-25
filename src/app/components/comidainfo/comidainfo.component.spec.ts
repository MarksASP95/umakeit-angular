import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComidainfoComponent } from './comidainfo.component';

describe('ComidainfoComponent', () => {
  let component: ComidainfoComponent;
  let fixture: ComponentFixture<ComidainfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComidainfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComidainfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
