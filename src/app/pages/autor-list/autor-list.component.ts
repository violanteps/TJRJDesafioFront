import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importando CommonModule
import { Router } from '@angular/router';
import { ApiService } from '../../services/services/api.service';
import { AutorModel } from '../../model/autor.model';

@Component({
  selector: 'app-autor-list',
  standalone: true, 
  imports: [CommonModule],
  templateUrl: './autor-list.component.html',
  styleUrls: ['./autor-list.component.scss']
})
export class AutorListComponent implements OnInit {
  model = new AutorModel();
  autores: AutorModel[] = [];

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.carregarAutores();
  }

  carregarAutores(): void {
    this.apiService.getAutorList().subscribe({
      next: (data) => {
        console.log('Dados recebidos:', data);
        this.autores = data;
      },
      error: (error) => {
        console.error('Erro ao carregar a lista de autores', error);
      },
      complete: () => {
        console.log('Lista de autores carregada com sucesso.');
      }
    });
  }

  criarNovoAutor(): void {
    this.router.navigate(['/cadastro-autor']);
  }

  editarAutor(autor: AutorModel): void {
    console.log(autor.codAu);
    this.router.navigate(['/cadastro-autor'], { state: { codAu: autor.codAu } });
  }

  excluirAutor(autor: AutorModel): void {
    if (confirm(`Tem certeza que deseja excluir o autor: ${autor.nome}?`)) {
      this.apiService.deleteAutor(autor.codAu).subscribe(() => {
        this.autores = this.autores.filter(a => a.codAu !== autor.codAu);
        console.log('Autor excluído com sucesso.');
      }, error => {
        console.error('Erro ao excluir o autor', error);
      });
    }
  }
}
