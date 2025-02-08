import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationStatsComponent } from './operation-stats.component';

describe('OperationStatsComponent', () => {
  let component: OperationStatsComponent;
  let fixture: ComponentFixture<OperationStatsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OperationStatsComponent]
    });
    fixture = TestBed.createComponent(OperationStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
