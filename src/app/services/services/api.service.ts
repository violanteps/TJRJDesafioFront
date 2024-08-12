import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private baseUrl = 'https://localhost:5000/api';

  constructor(private http: HttpClient) {}

  //Livro
  getLivroList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/Livro/GetLivroList`);
  }

  getLivroById(codl: number): Observable<any> {
    let params = new HttpParams().set('codl', codl.toString());
    return this.http.get(`${this.baseUrl}/Livro/GetLivro`, { params });
  }

  createLivro(livro: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/Livro/CreateLivro`, livro);
  }

  updateLivro(livro: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/Livro/UpdateLivro`, livro);
  }

  deleteLivro(codl: number): Observable<any> {
    let params = new HttpParams().set('codl', codl.toString());
    return this.http.delete(`${this.baseUrl}/Livro/DeleteLivro`, { params });
  }

  
  //Autor
  getAutorList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/Autor/GetAutorList`);
  }

  getAutorById(codAu: number): Observable<any> {
    let params = new HttpParams().set('codAu', codAu.toString());
    return this.http.get(`${this.baseUrl}/Autor/GetAutor`, { params });
  }

  createAutor(autor: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/Autor/CreateAutor`, autor);
  }

  updateAutor(autor: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/Autor/UpdateAutor`, autor);
  }

  deleteAutor(codAu: number): Observable<any> {
    let params = new HttpParams().set('codAu', codAu.toString());
    return this.http.delete(`${this.baseUrl}/Autor/DeleteAutor`, { params });
  }

  
  //Assunto
  getAssuntoList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/Assunto/GetAssuntoList`);
  }

  getAssuntoById(codAs: number): Observable<any> {
    let params = new HttpParams().set('codAs', codAs.toString());
    return this.http.get(`${this.baseUrl}/Assunto/GetAssunto`, { params });
  }

  createAssunto(assunto: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/Assunto/CreateAssunto`, assunto);
  }

  updateAssunto(assunto: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/Assunto/UpdateAssunto`, assunto);
  }

  deleteAssunto(codAs: number): Observable<any> {
    let params = new HttpParams().set('codAs', codAs.toString());
    return this.http.delete(`${this.baseUrl}/Assunto/DeleteAssunto`, { params });
  }


  //Relatórios
  getRelatoriosList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/Relatorio/GetRelatoriosList`);
  }  

  getRelatorioPorAutorComAssunto(tipoRel: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/Relatorio/RelatorioEstoque/${tipoRel}`);
  }

  getRelatorioPorAutorComValor(tipoRel: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/Relatorio/RelatorioEstoque/${tipoRel}`);
  }


  // ValorLivro
  createLivroValor(livroValor: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/ValorLivro/CreateLivroValor`, livroValor);
  }

  getLivroValor(livroCodl: number): Observable<any> {
    let params = new HttpParams().set('livro_Codl', livroCodl.toString());
    return this.http.get(`${this.baseUrl}/ValorLivro/GetLivroValor`, { params });
  }

  getLivroValorList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/ValorLivro/GetLivroValorList`);
  }

  getTipoVendaList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/ValorLivro/GetTipoVendaList`);
  }

  updateLivroValor(livroValor: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/ValorLivro/UpdateLivroValor`, livroValor);
  }

  deleteLivroValor(livroCodl: number, vendaCodv: number): Observable<any> {
    let params = new HttpParams()
      .set('livroCodl', livroCodl.toString())
      .set('vendaCodv', vendaCodv.toString());
    return this.http.delete(`${this.baseUrl}/ValorLivro/DeleteLivroValor`, { params });
  }
}
