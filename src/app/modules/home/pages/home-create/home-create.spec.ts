import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCreate } from './home-create';

describe('HomeCreate', () => {
  let component: HomeCreate;
  let fixture: ComponentFixture<HomeCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
