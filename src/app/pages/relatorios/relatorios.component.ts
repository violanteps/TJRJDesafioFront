import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-relatorios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.scss']
})
export class RelatoriosComponent implements OnInit {
  relatorioData: any[] = [];
  tipoRel: number = 0;

  constructor(
    private router: Router, // Adicionei o Router aqui
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    const state = history.state as { tipoRel?: number };
    if (state && state.tipoRel) {
      this.tipoRel = state.tipoRel
      switch (state.tipoRel) {
        case 1:
          this.apiService.getRelatorioPorAutorComAssunto(state.tipoRel).subscribe({
            next: (data) => this.relatorioData = data,
            error: (error) => console.error('Erro ao carregar o relatório por autor com assunto', error)
          });
          break;
        case 2:
          this.apiService.getRelatorioPorAutorComValor(state.tipoRel).subscribe({
            next: (data) => this.relatorioData = data,
            error: (error) => console.error('Erro ao carregar o relatório por autor com valor', error)
          });
          break;
        // Adicione mais cases para outros tipos de relatórios
        default:
          console.error('Tipo de relatório desconhecido.');
      }
    } else {
      console.error('O estado não contém o parâmetro tipoRel.');
    }
  }

  voltar(): void {
    this.router.navigate(['/relatorios-list']);
  }

  gerarRelatorioPDF(): void {
    // Implemente a lógica para gerar o relatório em PDF aqui
    console.log('Gerando relatório em PDF...');
  }

}
