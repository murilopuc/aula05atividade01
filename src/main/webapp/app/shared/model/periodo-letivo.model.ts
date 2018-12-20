import { IFalta } from 'app/shared/model//falta.model';
import { IAula } from 'app/shared/model//aula.model';

export interface IPeriodoLetivo {
    id?: number;
    dAtaFinal?: string;
    dataInicial?: string;
    falta?: IFalta;
    aula?: IAula;
}

export class PeriodoLetivo implements IPeriodoLetivo {
    constructor(public id?: number, public dAtaFinal?: string, public dataInicial?: string, public falta?: IFalta, public aula?: IAula) {}
}
