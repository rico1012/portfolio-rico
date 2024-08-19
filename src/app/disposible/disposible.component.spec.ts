import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisposibleComponent } from './disposible.component';

describe('DisposibleComponent', () => {
  let component: DisposibleComponent;
  let fixture: ComponentFixture<DisposibleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisposibleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisposibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
