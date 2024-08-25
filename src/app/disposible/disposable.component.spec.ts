import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisposableComponent } from './disposable.component';

describe('DisposibleComponent', () => {
  let component: DisposableComponent;
  let fixture: ComponentFixture<DisposableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisposableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisposableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
