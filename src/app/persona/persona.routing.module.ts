import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './../guards/auth.guard';
import { MostrarPersonaComponent } from './mostrar-persona/mostrar-persona.component';
import { PersonaComponent } from './crear-persona/persona.component';

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        children: [
        {
            path: 'mostrarPersona',
            component: MostrarPersonaComponent
        },
        {
            path: 'crearPersona',
            component: PersonaComponent
        }
    ]
    }
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class PersonaRoutingModule { }