import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPersonComponent } from './order-person.component';

describe('OrderPersonComponent', () => {
  let component: OrderPersonComponent;
  let fixture: ComponentFixture<OrderPersonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderPersonComponent]
    });
    fixture = TestBed.createComponent(OrderPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
