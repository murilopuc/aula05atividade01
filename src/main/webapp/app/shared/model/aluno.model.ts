import { IPessoa } from 'app/shared/model//pessoa.model';
import { INota } from 'app/shared/model//nota.model';
import { IFalta } from 'app/shared/model//falta.model';

export interface IAluno {
    id?: number;
    codigoAluno?: number;
    nome?: string;
    pessoa?: IPessoa;
    nota?: INota;
    falta?: IFalta;
}

export class Aluno implements IAluno {
    constructor(
        public id?: number,
        public codigoAluno?: number,
        public nome?: string,
        public pessoa?: IPessoa,
        public nota?: INota,
        public falta?: IFalta
    ) {}
}
