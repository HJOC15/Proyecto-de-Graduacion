import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenesEmpastadosPersonaPageComponent } from './ordenes-empastados-persona-page.component';

describe('OrdenesEmpastadosPersonaPageComponent', () => {
  let component: OrdenesEmpastadosPersonaPageComponent;
  let fixture: ComponentFixture<OrdenesEmpastadosPersonaPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrdenesEmpastadosPersonaPageComponent]
    });
    fixture = TestBed.createComponent(OrdenesEmpastadosPersonaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
