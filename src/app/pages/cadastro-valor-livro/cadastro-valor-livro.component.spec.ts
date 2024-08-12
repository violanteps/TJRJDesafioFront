import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroValorLivroComponent } from './cadastro-valor-livro.component';

describe('CadastroValorLivroComponent', () => {
  let component: CadastroValorLivroComponent;
  let fixture: ComponentFixture<CadastroValorLivroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroValorLivroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroValorLivroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
