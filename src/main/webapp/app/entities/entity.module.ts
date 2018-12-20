import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { MyAppUsuarioModule } from './usuario/usuario.module';
import { MyAppPermissaoModule } from './permissao/permissao.module';
import { MyAppPessoaModule } from './pessoa/pessoa.module';
import { MyAppAlunoModule } from './aluno/aluno.module';
import { MyAppProfessorModule } from './professor/professor.module';
import { MyAppTurmaModule } from './turma/turma.module';
import { MyAppDisciplinaModule } from './disciplina/disciplina.module';
import { MyAppNotaModule } from './nota/nota.module';
import { MyAppFaltaModule } from './falta/falta.module';
import { MyAppAulaModule } from './aula/aula.module';
import { MyAppAtividadeModule } from './atividade/atividade.module';
import { MyAppEntregaModule } from './entrega/entrega.module';
import { MyAppPeriodoLetivoModule } from './periodo-letivo/periodo-letivo.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        MyAppUsuarioModule,
        MyAppPermissaoModule,
        MyAppPessoaModule,
        MyAppAlunoModule,
        MyAppProfessorModule,
        MyAppTurmaModule,
        MyAppDisciplinaModule,
        MyAppNotaModule,
        MyAppFaltaModule,
        MyAppAulaModule,
        MyAppAtividadeModule,
        MyAppEntregaModule,
        MyAppPeriodoLetivoModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MyAppEntityModule {}
