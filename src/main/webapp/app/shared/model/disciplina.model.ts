import { IProfessor } from 'app/shared/model//professor.model';
import { IAtividade } from 'app/shared/model//atividade.model';

export interface IDisciplina {
    id?: number;
    codigoDisciplina?: number;
    nome?: string;
    professor?: IProfessor;
    atividade?: IAtividade;
}

export class Disciplina implements IDisciplina {
    constructor(
        public id?: number,
        public codigoDisciplina?: number,
        public nome?: string,
        public professor?: IProfessor,
        public atividade?: IAtividade
    ) {}
}
