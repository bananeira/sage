import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallLinkComponent } from './small-link.component';

describe('SmallLinkComponent', () => {
  let component: SmallLinkComponent;
  let fixture: ComponentFixture<SmallLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmallLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmallLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
