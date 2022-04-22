import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContributionBadgeComponent } from './contribution-badge.component';

describe('ContributionBadgeComponent', () => {
  let component: ContributionBadgeComponent;
  let fixture: ComponentFixture<ContributionBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContributionBadgeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContributionBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
