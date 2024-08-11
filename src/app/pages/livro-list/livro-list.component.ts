
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/services/api.service';
import { LivroModel } from '../../model/livro.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-livro-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './livro-list.component.html',
  styleUrls: ['./livro-list.component.scss']
})
export class LivroListComponent implements OnInit {
  livros: LivroModel[] = [];

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.carregarLivros();
  }

  carregarLivros(): void {
    this.apiService.getLivroList().subscribe({
      next: (data) => {
        console.log('Dados recebidos:', data);
        this.livros = data;
      },
      error: (error) => {
        console.error('Erro ao carregar a lista de livros', error);
      },
      complete: () => {
        console.log('Lista de livros carregada com sucesso.');
      }
    });
  }

  criarNovoLivro(): void {
    this.router.navigate(['/cadastro-livro']);
  }

  editarLivro(livro: LivroModel): void {
    console.log(livro.codl);
    this.router.navigate(['/cadastro-livro'], { state: { codl: livro.codl } });
  }

  excluirLivro(livro: LivroModel): void {
    if (confirm(`Tem certeza que deseja excluir o livro: ${livro.titulo}?`)) {
      this.apiService.deleteLivro(livro.codl).subscribe(() => {
        this.livros = this.livros.filter(l => l.codl !== livro.codl);
        console.log('Livro excluído com sucesso.');
      }, error => {
        console.error('Erro ao excluir o livro', error);
      });
    }
  }
}
