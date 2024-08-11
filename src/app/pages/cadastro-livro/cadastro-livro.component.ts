import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/services/api.service';
import { LivroModel } from '../../model/livro.model';
import { AssuntoModel } from '../../model/assunto.model';
import { AutorModel } from '../../model/autor.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LivroAutor } from '../../model/livroAutor.model';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-cadastro-livro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro-livro.component.html',
  styleUrls: ['./cadastro-livro.component.scss']
})
export class CadastroLivroComponent implements OnInit {
  model: LivroModel = {
    codl: 0,
    titulo: '',
    editora: '',
    edicao: 0,
    anoPublicacao: '',
    statusReg: 1,
    dataCriacao: new Date(),
    livroAssunto: { livroCodl: 0, assuntoCodAs: 0, statusReg: 1 },
    livroAutores: [] 
  };
  editMode = false;
  assuntos: AssuntoModel[] = [];
  autores: AutorModel[] = [];

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.carregarAssuntos();
    this.carregarAutores();
  
    const state = history.state as { codl?: number };
    if (state && state.codl) {
      this.editMode = true;
      this.apiService.getLivroById(state.codl).subscribe({
        next: (data) => {
          console.log('Dados recebidos do backend:', data);
          this.model = data;
          
          console.log('Assunto do livro antes de atribuição:', data.livroAssuntoEntity);
          this.model.livroAssunto = data.livroAssuntoEntity;
          
          console.log('Autores do livro antes de atribuição:', data.livroAutores);
          this.model.livroAutores = data.livroAutores;
      
          console.log('Lista de Assuntos:', this.assuntos);
          const assunto = this.assuntos.find(a => a.codAs === this.model.livroAssunto.assuntoCodAs);
          if (assunto) {
            this.model.assuntoNome = assunto.descricao;
            console.log('Assunto encontrado:', assunto);
          } else {
            console.log('Assunto não encontrado para codAs:', this.model.livroAssunto.assuntoCodAs);
          }
          
          console.log('Lista de Autores:', this.autores);
          this.model.livroAutores.forEach(autor => {
            const autorData = this.autores.find(a => a.codAu === autor.autorCodAu);
            if (autorData) {
              autor.autorNome = autorData.nome;
              console.log('Autor encontrado:', autorData);
            } else {
              console.log('Autor não encontrado para codAu:', autor.autorCodAu);
            }
          });
        },
        error: (error) => {
          console.error('Erro ao carregar o livro', error);
        }
      });
    }
  }
  

  carregarAssuntos(): void {
    console.log("carregarAssuntosList");
    this.apiService.getAssuntoList().subscribe({
      next: (data) => {
        this.assuntos = data;
      },
      error: (error) => {
        console.error('Erro ao carregar os assuntos', error);
      }
    });
  }

  carregarAutores(): void {
    console.log("carregarAutoresList");
    this.apiService.getAutorList().subscribe({
      next: (data) => {
        this.autores = data;
      },
      error: (error) => {
        console.error('Erro ao carregar os autores', error);
      }
    });
  }

  
  selecionarAssunto(assunto: AssuntoModel): void {
    this.model.livroAssunto.assuntoCodAs = assunto.codAs;
    this.model.assuntoNome = assunto.descricao; // Armazena o nome do assunto
  }

  selecionarAutor(autor: AutorModel): void {
    if (!this.model.livroAutores.some(a => a.autorCodAu === autor.codAu)) {
      this.model.livroAutores.push({ livroCodl: this.model.codl, autorCodAu: autor.codAu, statusReg: 1 });
    }
  }

  getAutorNome(codAu: number): string | null {
    const autor = this.autores.find(a => a.codAu === codAu);
    return autor ? autor.nome : 'Autor Desconhecido';
  }
  removerAutor(autor: LivroAutor): void {
    this.model.livroAutores = this.model.livroAutores.filter(a => a.autorCodAu !== autor.autorCodAu);
  }

  
  onSubmit(): void {
    
   const payload = {
      codl: this.model.codl,
      titulo: this.model.titulo,
      editora: this.model.editora,
      edicao: this.model.edicao,
      anoPublicacao: this.model.anoPublicacao,
      statusReg: this.model.statusReg, 
      
      livroAssuntoEntity: {
        livroCodl: this.model.codl,
        assuntoCodAs: this.model.livroAssunto.assuntoCodAs
      },
      livroAutores: this.model.livroAutores.map(autor => ({
        livroCodl: this.model.codl,
        autorCodAu: autor.autorCodAu
      }))
    };
  
    if (this.editMode) {
      this.apiService.updateLivro(payload).subscribe({
        next: () => this.router.navigate(['/livro-list']),
        error: (errorResponse) => this.handleError(errorResponse)
      });
    } else {
      this.apiService.createLivro(payload).subscribe({
        next: () => this.router.navigate(['/livro-list']),
        error: (errorResponse) => this.handleError(errorResponse)
      });
    }
  }
  
  
  handleError(errorResponse: HttpErrorResponse): void {
    console.error('Erro ao processar a solicitação:', errorResponse);
    if (errorResponse.status === 400 && errorResponse.error.errors) {
      for (const field in errorResponse.error.errors) {
        if (errorResponse.error.errors.hasOwnProperty(field)) {
          console.log(`Erro no campo ${field}:`, errorResponse.error.errors[field]);
        }
      }
    }
  }
  
  
  cancelar(): void {
    this.router.navigate(['/livro-list']);
  }
}
