import { IAtividade } from 'app/shared/model//atividade.model';

export interface IEntrega {
    id?: number;
    quantidade?: number;
    atividade?: IAtividade;
}

export class Entrega implements IEntrega {
    constructor(public id?: number, public quantidade?: number, public atividade?: IAtividade) {}
}
