import { IAluno } from 'app/shared/model//aluno.model';
import { IAula } from 'app/shared/model//aula.model';
import { IPeriodoLetivo } from 'app/shared/model//periodo-letivo.model';

export interface IFalta {
    id?: number;
    quantidade?: number;
    data?: string;
    aluno?: IAluno;
    aula?: IAula;
    periodoLetivo?: IPeriodoLetivo;
}

export class Falta implements IFalta {
    constructor(
        public id?: number,
        public quantidade?: number,
        public data?: string,
        public aluno?: IAluno,
        public aula?: IAula,
        public periodoLetivo?: IPeriodoLetivo
    ) {}
}
