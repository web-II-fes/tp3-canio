import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Persona } from '../Persona';
import {PersonaService} from '../../servicios/persona.service';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {

  personaForm: FormGroup;
  
  personas: any[] = [];
  idPersona: any;

  persona : any;
  param: any;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private router: Router, private personaService: PersonaService) { }

  ngOnInit(): void {
    
    this.getPersona();
    this.param = this.route.snapshot.params;

    if (Object.keys(this.param).length) {
      this.persona = this.param;
    } 

    this.initForm(this.persona);

    this.route.paramMap.subscribe((param) => {
			debugger;
			this.idPersona = param.get('id');

			if (this.idPersona !== 'new') {
				this.getPersonaById(this.idPersona);
			}
    });
    
  }

  
  initForm(editarPersona : Persona){
    this.personaForm = this.fb.group({
      nombre : [editarPersona ? editarPersona.nombre:'', Validators.required],
      apellido : [editarPersona ? editarPersona.apellido:'', Validators.required],
      edad : [editarPersona ? editarPersona.edad:'']
    
    });
  }

 
  getPersona(){
    this.personaService.getPersonas().subscribe((personas: any) => {
      this.personas = personas;
    });
  }

  getPersonaById(idPersona: String) {
		this.personaService.getPersonaById(idPersona).subscribe((data) => {
			debugger;
			let personaId = data;

			this.personaForm.patchValue(personaId);
		});
	}
  
  submit(){
    debugger;
    if (this.idPersona){
      this.personaService.editarPersona(this.idPersona, this.personaForm.value).subscribe((persona) => {
        // console.log("Persona editada: ", persona);
      });
    } else{
      this.personaService.guardarPersona(this.personaForm.value).subscribe(persona => {
        console.log("Persona Nueva: ", persona);
        // let personaNueva = persona;
      });
    }

    this.router.navigate(['/persona/mostrarPersona']);
    
  };

}
