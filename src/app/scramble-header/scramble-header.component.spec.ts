import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrambleHeaderComponent } from './scramble-header.component';

describe('ScrambleHeaderComponent', () => {
  let component: ScrambleHeaderComponent;
  let fixture: ComponentFixture<ScrambleHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrambleHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScrambleHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
