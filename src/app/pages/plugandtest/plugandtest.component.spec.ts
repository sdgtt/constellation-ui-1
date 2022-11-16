import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlugandtestComponent } from './plugandtest.component';

describe('PlugandtestComponent', () => {
  let component: PlugandtestComponent;
  let fixture: ComponentFixture<PlugandtestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlugandtestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlugandtestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
