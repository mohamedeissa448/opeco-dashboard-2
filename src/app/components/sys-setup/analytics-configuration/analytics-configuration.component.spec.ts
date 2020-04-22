import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsConfigurationComponent } from './analytics-configuration.component';

describe('AnalyticsConfigurationComponent', () => {
  let component: AnalyticsConfigurationComponent;
  let fixture: ComponentFixture<AnalyticsConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyticsConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyticsConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
