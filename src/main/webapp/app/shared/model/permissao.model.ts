import { IUsuario } from 'app/shared/model//usuario.model';

export interface IPermissao {
    id?: number;
    codigopERMISSAO?: number;
    usuario?: IUsuario;
}

export class Permissao implements IPermissao {
    constructor(public id?: number, public codigopERMISSAO?: number, public usuario?: IUsuario) {}
}
