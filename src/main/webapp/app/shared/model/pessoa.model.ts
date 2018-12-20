import { IUsuario } from 'app/shared/model//usuario.model';
import { IAluno } from 'app/shared/model//aluno.model';
import { IProfessor } from 'app/shared/model//professor.model';

export interface IPessoa {
    id?: number;
    codigoPessoa?: number;
    nome?: string;
    usuario?: IUsuario;
    aluno?: IAluno;
    professor?: IProfessor;
}

export class Pessoa implements IPessoa {
    constructor(
        public id?: number,
        public codigoPessoa?: number,
        public nome?: string,
        public usuario?: IUsuario,
        public aluno?: IAluno,
        public professor?: IProfessor
    ) {}
}
