import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LangBadgeComponent } from './lang-badge.component';

describe('LangBadgeComponent', () => {
  let component: LangBadgeComponent;
  let fixture: ComponentFixture<LangBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LangBadgeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LangBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
