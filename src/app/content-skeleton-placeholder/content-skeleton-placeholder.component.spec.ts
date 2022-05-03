import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentSkeletonPlaceholderComponent } from './content-skeleton-placeholder.component';

describe('ContentPlaceholderComponent', () => {
  let component: ContentSkeletonPlaceholderComponent;
  let fixture: ComponentFixture<ContentSkeletonPlaceholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentSkeletonPlaceholderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentSkeletonPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
