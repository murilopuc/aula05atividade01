import { IPermissao } from 'app/shared/model//permissao.model';
import { IPessoa } from 'app/shared/model//pessoa.model';

export interface IUsuario {
    id?: number;
    codigo?: number;
    nome?: string;
    permissao?: IPermissao;
    pessoa?: IPessoa;
}

export class Usuario implements IUsuario {
    constructor(public id?: number, public codigo?: number, public nome?: string, public permissao?: IPermissao, public pessoa?: IPessoa) {}
}
