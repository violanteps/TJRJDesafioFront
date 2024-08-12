import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-valor-livro-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './valor-livro-list.component.html',
  styleUrls: ['./valor-livro-list.component.scss']
})
export class ValorLivroListComponent implements OnInit {
  livros: any[] = [];

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.carregarLivros();
  }

  carregarLivros(): void {
    this.apiService.getLivroList().subscribe({
      next: (data) => {
        this.livros = data;
      },
      error: (error) => {
        console.error('Erro ao carregar a lista de livros', error);
      }
    });
  }

  editarValorLivro(livro: any): void {
    this.router.navigate(['/cadastro-valor-livro'], { state: { livroId: livro.codl } });
  }
}
