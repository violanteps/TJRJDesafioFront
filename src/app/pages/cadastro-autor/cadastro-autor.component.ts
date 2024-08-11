import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/services/api.service';
import { AutorModel } from '../../model/autor.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro-autor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro-autor.component.html',
  styleUrls: ['./cadastro-autor.component.scss']
})
export class CadastroAutorComponent implements OnInit {
  model = new AutorModel();
  editMode = false;
  autorId: number | null = null;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const state = history.state as { codAu?: number };
    console.log('Estado codAu:', state.codAu);

    if (state && state.codAu) {
      this.editMode = true;
      this.apiService.getAutorById(state.codAu).subscribe({
        next: (data) => {
          this.model = data;
        },
        error: (error) => {
          console.error('Erro ao carregar o autor', error);
        },
        complete: () => {
          console.log('Requisição completa.');
        }
      });
    } else {
      console.error('Não contém o parâmetro codAu.');
    }
  }

  onSubmit(): void {
    if (this.editMode) {
      this.apiService.updateAutor(this.model).subscribe(() => {
        this.router.navigate(['/autor-list']);
      });
    } else {
      this.apiService.createAutor(this.model).subscribe(() => {
        this.router.navigate(['/autor-list']);
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/autor-list']);
  }
}
