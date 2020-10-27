import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonaComponent } from './persona/crear-persona/persona.component';
import { CursoComponent } from './curso/crear-curso/curso.component';
import { MostrarCursoComponent } from './curso/mostrar-curso/mostrar-curso.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: 'persona',
    loadChildren: () => import('./persona/persona.module').then((m) => m.PersonaModule)
  },
  {
    path: 'crearPersona',
    component: PersonaComponent
  },
  {
    path: 'crearCurso',
    component : CursoComponent

  },
  {
    path: 'crearCurso/:id',
    component : CursoComponent

  },
  {
    path: 'mostrarCurso',
    component : MostrarCursoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
