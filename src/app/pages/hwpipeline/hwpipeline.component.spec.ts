import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KuiperLinucCIComponent } from './hwpipeline.component';

describe('HwpipelineComponent', () => {
  let component: KuiperLinucCIComponent;
  let fixture: ComponentFixture<KuiperLinucCIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KuiperLinucCIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KuiperLinucCIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
