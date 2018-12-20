import { IEntrega } from 'app/shared/model//entrega.model';
import { INota } from 'app/shared/model//nota.model';
import { IDisciplina } from 'app/shared/model//disciplina.model';

export interface IAtividade {
    id?: number;
    codigoAtividade?: number;
    nome?: string;
    entrega?: IEntrega;
    nota?: INota;
    disciplina?: IDisciplina;
}

export class Atividade implements IAtividade {
    constructor(
        public id?: number,
        public codigoAtividade?: number,
        public nome?: string,
        public entrega?: IEntrega,
        public nota?: INota,
        public disciplina?: IDisciplina
    ) {}
}
