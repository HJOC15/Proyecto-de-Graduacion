import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpastadosPageComponent } from './empastados-page.component';

describe('EmpastadosPageComponent', () => {
  let component: EmpastadosPageComponent;
  let fixture: ComponentFixture<EmpastadosPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmpastadosPageComponent]
    });
    fixture = TestBed.createComponent(EmpastadosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
