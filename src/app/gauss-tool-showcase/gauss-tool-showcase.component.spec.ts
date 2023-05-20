import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GaussToolShowcaseComponent } from './gauss-tool-showcase.component';

describe('GaussAlgoToolShowcaseComponent', () => {
  let component: GaussToolShowcaseComponent;
  let fixture: ComponentFixture<GaussToolShowcaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GaussToolShowcaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GaussToolShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
