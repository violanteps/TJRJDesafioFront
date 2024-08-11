import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private baseUrl = 'https://localhost:5000/api';

  constructor(private http: HttpClient) {}

  
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

  getRelatoriosList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/Relatorio/GetRelatoriosList`);
  }  

  getRelatorioPorAutorComAssunto(tipoRel: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/Relatorio/RelatorioEstoque/${tipoRel}`);
  }

  getRelatorioPorAutorComValor(tipoRel: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/Relatorio/RelatorioEstoque/${tipoRel}`);
  }
}
