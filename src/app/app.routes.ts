import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CadastroAutorComponent } from './pages/cadastro-autor/cadastro-autor.component';
import { CadastroAssuntoComponent } from './pages/cadastro-assunto/cadastro-assunto.component';
import { CadastroLivroComponent } from './pages/cadastro-livro/cadastro-livro.component';
import { AssuntoListComponent } from './pages/assunto-list/assunto-list.component';
import { AutorListComponent } from './pages/autor-list/autor-list.component';
import { LivroListComponent } from './pages/livro-list/livro-list.component';
import { RelatoriosListComponent } from './pages/relatorios-list/relatorios-list.component';
import { RelatoriosComponent } from './pages/relatorios/relatorios.component';
import { ValorLivroListComponent } from './pages/valor-livro-list/valor-livro-list.component';
import { CadastroValorLivroComponent } from './pages/cadastro-valor-livro/cadastro-valor-livro.component';
import { DescricaoProjetoComponent } from './pages/descricao-projeto/descricao-projeto.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'cadastro-autor', component: CadastroAutorComponent },
    { path: 'cadastro-assunto', component: CadastroAssuntoComponent },
    { path: 'cadastro-livro', component: CadastroLivroComponent },
    { path: 'assunto-list', component: AssuntoListComponent},
    { path: 'autor-list', component: AutorListComponent},
    { path: 'livro-list', component: LivroListComponent},
    { path: 'relatorios-list', component: RelatoriosListComponent},
    { path: 'relatorios', component: RelatoriosComponent},
    { path: 'valor-livro-list', component: ValorLivroListComponent},
    { path: 'cadastro-valor-livro', component: CadastroValorLivroComponent},
    { path: 'descricao-projeto', component: DescricaoProjetoComponent}, 
];
