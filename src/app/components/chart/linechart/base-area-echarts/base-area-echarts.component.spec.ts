import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseAreaEchartsComponent } from './base-area-echarts.component';

describe('BaseAreaEchartsComponent', () => {
  let component: BaseAreaEchartsComponent;
  let fixture: ComponentFixture<BaseAreaEchartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseAreaEchartsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseAreaEchartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
