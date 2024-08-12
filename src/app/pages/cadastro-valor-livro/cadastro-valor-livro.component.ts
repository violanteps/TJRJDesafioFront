import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TipoVenda } from '../../model/livroVenda.model';
import { LivroValor } from '../../model/livroValor.model';

@Component({
  selector: 'app-cadastro-valor-livro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro-valor-livro.component.html',
  styleUrls: ['./cadastro-valor-livro.component.scss']
})
export class CadastroValorLivroComponent implements OnInit {
  livro: any = {};
  tiposVenda: TipoVenda[] = [];
  livroValores: LivroValor[] = [];
  valorPorTipo: { [key: number]: number } = {};

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    const state = history.state as { livroId: number };
    if (state && state.livroId) {
      this.apiService.getLivroById(state.livroId).subscribe({
        next: (data) => {
          this.livro = data;
          console.log('Livro carregado:', this.livro);
        },
        error: (error) => console.error('Erro ao carregar o livro', error)
      });

      this.apiService.getTipoVendaList().subscribe({
        next: (data) => this.tiposVenda = data,
        error: (error) => console.error('Erro ao carregar os tipos de venda', error)
      });

      this.apiService.getLivroValor(state.livroId).subscribe({
        next: (data) => {
          this.livroValores = data;
          this.livroValores.forEach(v => {
            this.valorPorTipo[v.vendaCodv] = v.valorVenda;
          });
        },
        error: (error) => console.error('Erro ao carregar os valores do livro', error)
      });
    } else {
      console.error('Livro não encontrado.');
      this.router.navigate(['/valor-livro-list']);
    }
  }

  getValorVenda(codv: number): number {
    return this.valorPorTipo[codv] || 0;
  }

  salvarValor(codv: number): void {
    const valor = this.valorPorTipo[codv] || 0;
    const livroValor: LivroValor = {
      livroCodl: this.livro.codl,
      vendaCodv: codv,
      valorVenda: valor,
      statusReg: 1
    };

    this.apiService.createLivroValor(livroValor).subscribe({
      next: () => {
        console.log('Valor salvo com sucesso');
        this.livroValores.push(livroValor);
      },
      error: (error) => console.error('Erro ao salvar o valor', error)
    });
  }
  
  excluirValor(codv: number): void {
    this.apiService.deleteLivroValor(this.livro.codl, codv).subscribe({
      next: () => {
        delete this.valorPorTipo[codv];
        this.livroValores = this.livroValores.filter(v => v.vendaCodv !== codv);
        console.log('Valor excluído com sucesso');
      },
      error: (error) => console.error('Erro ao excluir o valor', error)
    });
  }
  
  editarValor(codv: number): void {
    const valor = this.valorPorTipo[codv] || 0;
    const livroValor: LivroValor = {
      livroCodl: this.livro.codl,
      vendaCodv: codv,
      valorVenda: valor,
      statusReg: 1
    };

    this.apiService.createLivroValor(livroValor).subscribe({
      next: () => {
        console.log('Valor salvo com sucesso');
        this.livroValores.push(livroValor);
      },
      error: (error) => console.error('Erro ao salvar o valor', error)
    });
  }




  voltar(): void {
    this.router.navigate(['/valor-livro-list']);
  }
}
