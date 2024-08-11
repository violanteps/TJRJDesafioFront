import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/services/api.service';
import { AssuntoModel } from '../../model/assunto.model';
import { FormsModule } from '@angular/forms'; // Importe o FormsModule
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-cadastro-assunto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro-assunto.component.html',
  styleUrls: ['./cadastro-assunto.component.scss']
})
export class CadastroAssuntoComponent implements OnInit {
  model = new AssuntoModel();
  editMode = false;
  assuntoId: number | null = null;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const state = history.state as { codAs?: number };
    console.log('Estado codAs:', state.codAs);

    if (state && state.codAs) {
      this.editMode = true;
      this.apiService.getAssuntoById(state.codAs).subscribe({
        next: (data) => {
          this.model = data;
        },
        error: (error) => {
          console.error('Erro ao carregar o assunto', error);
        },
        complete: () => {
          console.log('Requisição completa.');
        }
      });
    } else {
      console.error('O estado não contém o parâmetro codAs.');
    }
  }


  onSubmit(): void {
    if (this.editMode) {
      this.apiService.updateAssunto(this.model).subscribe(() => {
        this.router.navigate(['/assunto-list']);
      });
    } else {
      this.apiService.createAssunto(this.model).subscribe(() => {
        this.router.navigate(['/assunto-list']);
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/assunto-list']);
  }
}

