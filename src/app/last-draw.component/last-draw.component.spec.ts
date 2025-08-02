import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastDrawComponent } from './last-draw.component';

describe('LastDrawComponent', () => {
  let component: LastDrawComponent;
  let fixture: ComponentFixture<LastDrawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LastDrawComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LastDrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
