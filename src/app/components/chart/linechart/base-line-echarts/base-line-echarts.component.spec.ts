import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseLineEchartsComponent } from './base-line-echarts.component';

describe('BaseLineEchartsComponent', () => {
  let component: BaseLineEchartsComponent;
  let fixture: ComponentFixture<BaseLineEchartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseLineEchartsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseLineEchartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
