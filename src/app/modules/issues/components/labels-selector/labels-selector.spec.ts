import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelsSelector } from './labels-selector';

describe('LabelsSelector', () => {
  let component: LabelsSelector;
  let fixture: ComponentFixture<LabelsSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LabelsSelector]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabelsSelector);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
