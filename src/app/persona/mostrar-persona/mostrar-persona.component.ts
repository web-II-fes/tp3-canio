import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonaService } from 'src/app/servicios/persona.service';
import { Persona } from '../Persona';

@Component({
  selector: 'app-mostrar-persona',
  templateUrl: './mostrar-persona.component.html',
  styleUrls: ['./mostrar-persona.component.css']
})
export class MostrarPersonaComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'apellido', 'edad', 'borrar'];
  dataSource : any[] = [];
  idPersona: any;
  personaForm: FormGroup;

  constructor(private personaService : PersonaService, private router : Router) { }

  ngOnInit(): void {
    this.getPersonas();
  }

  getPersonas(){
    this.personaService.getPersonas().subscribe((data: any) => {
      debugger;
      this.dataSource = data;
    });
  }

  borrarPersona(persona: any){
    debugger;
    this.idPersona = persona._id;
    this.personaService.borrarPersona(this.idPersona).subscribe( respuesta  => {
      console.log("Persona borrada: ", persona)
    });
    this.ngOnInit();
  }

  editarPersona(persona: any) {	
    this.idPersona = persona._id;
    let personaTemp : Persona = {
      nombre : persona.nombre,
      apellido : persona.apellido,
      edad : persona.edad
    };

    this.router.navigate(['/persona/crearPersona', persona]);
    debugger;	
  }


}
