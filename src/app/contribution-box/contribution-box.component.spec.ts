import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContributionBoxComponent } from './contribution-box.component';

describe('ContributionBoxComponent', () => {
  let component: ContributionBoxComponent;
  let fixture: ComponentFixture<ContributionBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContributionBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContributionBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
