import { IProfessor } from 'app/shared/model//professor.model';
import { IAula } from 'app/shared/model//aula.model';

export interface ITurma {
    id?: number;
    codigoTurma?: number;
    nome?: string;
    professor?: IProfessor;
    aula?: IAula;
}

export class Turma implements ITurma {
    constructor(
        public id?: number,
        public codigoTurma?: number,
        public nome?: string,
        public professor?: IProfessor,
        public aula?: IAula
    ) {}
}
