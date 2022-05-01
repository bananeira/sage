import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeBadgeComponent } from './type-badge.component';

describe('ContributionBadgeComponent', () => {
  let component: TypeBadgeComponent;
  let fixture: ComponentFixture<TypeBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeBadgeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
