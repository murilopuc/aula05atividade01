import { IPessoa } from 'app/shared/model//pessoa.model';
import { IDisciplina } from 'app/shared/model//disciplina.model';
import { ITurma } from 'app/shared/model//turma.model';

export interface IProfessor {
    id?: number;
    codigoProfessor?: number;
    nome?: string;
    pessoa?: IPessoa;
    disciplina?: IDisciplina;
    turma?: ITurma;
}

export class Professor implements IProfessor {
    constructor(
        public id?: number,
        public codigoProfessor?: number,
        public nome?: string,
        public pessoa?: IPessoa,
        public disciplina?: IDisciplina,
        public turma?: ITurma
    ) {}
}
