import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HwpipelineComponent } from './hwpipeline.component';

describe('HwpipelineComponent', () => {
  let component: HwpipelineComponent;
  let fixture: ComponentFixture<HwpipelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HwpipelineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HwpipelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
