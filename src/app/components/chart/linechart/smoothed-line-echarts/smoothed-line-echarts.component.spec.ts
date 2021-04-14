import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmoothedLineEchartsComponent } from './smoothed-line-echarts.component';

describe('SmoothedLineEchartsComponent', () => {
  let component: SmoothedLineEchartsComponent;
  let fixture: ComponentFixture<SmoothedLineEchartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmoothedLineEchartsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmoothedLineEchartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
