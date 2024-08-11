import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AssuntoModel } from '../../model/assunto.model';
import { ApiService } from '../../services/services/api.service';


@Component({
  selector: 'app-assunto-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './assunto-list.component.html',
  styleUrls: ['./assunto-list.component.scss']
})
export class AssuntoListComponent implements OnInit {
  model = new AssuntoModel();
  assuntos: AssuntoModel[] = [];

  constructor(private apiService: ApiService, private router: Router) {} 

  ngOnInit(): void {
    this.carregarAssuntos();
  }

  carregarAssuntos(): void {
    this.apiService.getAssuntoList().subscribe({
      next: (data) => {
        console.log('Dados recebidos:', data); 
        this.assuntos = data;
      },
      error: (error) => {
        console.error('Erro ao carregar a lista de assuntos', error);
      },
      complete: () => {
        console.log('Assuntos carregados com sucesso.');
      }
    });
  }



  criarNovoAssunto(): void {
    this.router.navigate(['/cadastro-assunto']);
  }

  editarAssunto(assunto: AssuntoModel): void {
    console.log(assunto.codAs);
    this.router.navigate(['/cadastro-assunto'], { state: { codAs: assunto.codAs } });
  }

  excluirAssunto(assunto: AssuntoModel): void {
    if (confirm(`Tem certeza que deseja excluir o assunto: ${assunto.descricao}?`)) {
      this.apiService.deleteAssunto(assunto.codAs).subscribe(() => {
        this.assuntos = this.assuntos.filter(a => a.codAs !== assunto.codAs);
      });
    }
  }

  formatarData(date: Date): string {
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }
}
