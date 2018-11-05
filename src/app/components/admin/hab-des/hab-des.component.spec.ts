import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HabDesComponent } from './hab-des.component';

describe('HabDesComponent', () => {
  let component: HabDesComponent;
  let fixture: ComponentFixture<HabDesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HabDesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HabDesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
