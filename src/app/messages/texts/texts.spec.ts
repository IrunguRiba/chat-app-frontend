import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Texts } from './texts';

describe('Texts', () => {
  let component: Texts;
  let fixture: ComponentFixture<Texts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Texts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Texts);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
