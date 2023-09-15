import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenesEmpastadosPageComponent } from './ordenes-empastados-page.component';

describe('OrdenesEmpastadosPageComponent', () => {
  let component: OrdenesEmpastadosPageComponent;
  let fixture: ComponentFixture<OrdenesEmpastadosPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrdenesEmpastadosPageComponent]
    });
    fixture = TestBed.createComponent(OrdenesEmpastadosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
