import { IAluno } from 'app/shared/model//aluno.model';
import { IAtividade } from 'app/shared/model//atividade.model';

export interface INota {
    id?: number;
    nota?: number;
    aluno?: IAluno;
    atividade?: IAtividade;
}

export class Nota implements INota {
    constructor(public id?: number, public nota?: number, public aluno?: IAluno, public atividade?: IAtividade) {}
}
