import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroAssuntoComponent } from './cadastro-assunto.component';

describe('CadastroAssuntoComponent', () => {
  let component: CadastroAssuntoComponent;
  let fixture: ComponentFixture<CadastroAssuntoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroAssuntoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroAssuntoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
