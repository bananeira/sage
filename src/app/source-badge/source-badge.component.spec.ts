import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceBadgeComponent } from './source-badge.component';

describe('GithubBadgeComponent', () => {
  let component: SourceBadgeComponent;
  let fixture: ComponentFixture<SourceBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SourceBadgeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
