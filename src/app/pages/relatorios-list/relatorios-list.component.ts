import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/services/api.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-relatorios-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './relatorios-list.component.html',
  styleUrl: './relatorios-list.component.scss'
})
export class RelatoriosListComponent implements OnInit {
  relatorios: any[] = [];
  relatoriosFiltrados: any[] = [];
  filtro: string = '';

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.carregarRelatorios();
  }

  carregarRelatorios(): void {
    this.apiService.getRelatoriosList().subscribe({
      next: (data) => {
        this.relatorios = data;
        this.filtrarRelatorios();
      },
      error: (error) => {
        console.error('Erro ao carregar os relatórios', error);
      }
    });
  }

  filtrarRelatorios(): void {
    this.relatoriosFiltrados = this.relatorios.filter(relatorio => 
      relatorio.tipoRel.toString().includes(this.filtro) ||
      relatorio.assunto.toLowerCase().includes(this.filtro.toLowerCase())
    );
  }

  visualizarRelatorio(relatorio: any): void {
    console.log("tipoRel " + relatorio.tipoRel);
    this.router.navigate(['/relatorios'], { state: { tipoRel: relatorio.tipoRel } });
  }
}
