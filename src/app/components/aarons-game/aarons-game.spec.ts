import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AaronsGame } from './aarons-game';

describe('AaronsGame', () => {
  let component: AaronsGame;
  let fixture: ComponentFixture<AaronsGame>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AaronsGame],
    }).compileComponents();

    fixture = TestBed.createComponent(AaronsGame);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
