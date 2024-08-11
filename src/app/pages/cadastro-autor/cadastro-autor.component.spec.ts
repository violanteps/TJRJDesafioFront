import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroAutorComponent } from './cadastro-autor.component';

describe('CadastroAutorComponent', () => {
  let component: CadastroAutorComponent;
  let fixture: ComponentFixture<CadastroAutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroAutorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroAutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
