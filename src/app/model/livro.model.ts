import { LivroAssunto } from "./livroAssunto.model";
import { LivroAutor } from "./livroAutor.model";

export class LivroModel {
    codl: number;
    titulo: string;
    editora: string;
    edicao: number;
    anoPublicacao: string;
    statusReg: number;
    dataCriacao : Date;
    livroAssunto: LivroAssunto;
    livroAutores: LivroAutor[];
    assuntoNome?: string;
}
