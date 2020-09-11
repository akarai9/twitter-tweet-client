import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMetricComponent } from './show-metric.component';

describe('ShowMetricComponent', () => {
  let component: ShowMetricComponent;
  let fixture: ComponentFixture<ShowMetricComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowMetricComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowMetricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
