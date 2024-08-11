import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/services/api.service';
import { CommonModule } from '@angular/common';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

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
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    const state = history.state as { tipoRel?: number };
    
    console.log(state);
    //Se eu tentar acessar a pagina diretamente eu sou direcionado para a lista
    if (!state || typeof state.tipoRel === 'undefined') {
      this.router.navigate(['/relatorios-list']);
      return;
    }

    if (state && state.tipoRel) {
      this.tipoRel = state.tipoRel;
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
    const doc = new jsPDF();

    
    const title = this.tipoRel === 1 ? 'Relatório de Livros por Autor e Assunto' : 'Relatório de Livros por Autor e Valor';
    doc.text(title, 14, 20); 
    
    if (this.tipoRel === 1) {
        autoTable(doc, {
            startY: 30, 
            head: [['Autor', 'Livro', 'Assunto']],
            body: this.relatorioData.map(relatorio => [relatorio.autor, relatorio.livro, relatorio.assunto]),
        });
    } else if (this.tipoRel === 2) {
        autoTable(doc, {
            startY: 30, 
            head: [['Autor', 'Livro', 'Valor', 'Tipo de Venda']],
            body: this.relatorioData.map(relatorio => [
                relatorio.autor, 
                relatorio.livro, 
                `R$ ${relatorio.valor}`, 
                relatorio.tipoVenda
            ]),
        });
    }

    doc.save('relatorio-livros.pdf');
}

}
