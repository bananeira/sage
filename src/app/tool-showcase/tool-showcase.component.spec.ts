import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolShowcaseComponent } from './tool-showcase.component';

describe('ToolShowcaseComponent', () => {
  let component: ToolShowcaseComponent;
  let fixture: ComponentFixture<ToolShowcaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolShowcaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
