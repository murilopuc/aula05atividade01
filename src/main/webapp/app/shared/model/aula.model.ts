import { ITurma } from 'app/shared/model//turma.model';
import { IFalta } from 'app/shared/model//falta.model';
import { IPeriodoLetivo } from 'app/shared/model//periodo-letivo.model';

export interface IAula {
    id?: number;
    quantidade?: number;
    data?: string;
    turma?: ITurma;
    falta?: IFalta;
    periodoLetivo?: IPeriodoLetivo;
}

export class Aula implements IAula {
    constructor(
        public id?: number,
        public quantidade?: number,
        public data?: string,
        public turma?: ITurma,
        public falta?: IFalta,
        public periodoLetivo?: IPeriodoLetivo
    ) {}
}
