import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplementBuilderShowcaseComponent } from './complement-builder-showcase.component';

describe('ComplementBuilderShowcaseComponent', () => {
  let component: ComplementBuilderShowcaseComponent;
  let fixture: ComponentFixture<ComplementBuilderShowcaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplementBuilderShowcaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplementBuilderShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
