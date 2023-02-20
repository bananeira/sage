import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RsaToolShowcaseComponent } from './rsa-tool-showcase.component';

describe('RsaToolShowcaseComponent', () => {
  let component: RsaToolShowcaseComponent;
  let fixture: ComponentFixture<RsaToolShowcaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RsaToolShowcaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RsaToolShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
