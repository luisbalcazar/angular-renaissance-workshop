import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroItem } from './hero-item';

describe('HeroItem', () => {
  let component: HeroItem;
  let fixture: ComponentFixture<HeroItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
