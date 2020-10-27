import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {Curso} from '../curso';

import {CursoService} from '../../servicios/curso.service';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {

  cursoForm: FormGroup;

  cursos: any[] = [];
  idCurso: string;

  param: any;
  curso: any;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private cursoService : CursoService, private paramRoute : ActivatedRoute, private router : Router) { }

  ngOnInit(): void {
    this.getCurso();
    this.param = this.route.snapshot.params;

    if (Object.keys(this.param).length) {
      this.curso = this.param;
    } 

    this.initForm(this.curso);

    this.route.paramMap.subscribe((param) => {
			debugger;
			this.idCurso = param.get('id');

			if (this.idCurso !== 'new') {
				this.getCursoById(this.idCurso);
			}
    });
  }


  initForm(editarCurso : Curso){
    this.cursoForm = this.fb.group({
      nombre : [editarCurso ? editarCurso.nombre:'', Validators.required],
      profesor : [editarCurso ? editarCurso.profesor:'', Validators.required],
      anio : [editarCurso ? editarCurso.anio:''],
      estado : [editarCurso ? editarCurso.estado:'']
    
    });
  }

  getCurso(){
    this.cursoService.getCursos().subscribe((cursos: any) => {
      this.cursos = cursos;
    });
  }

  getCursoById(idCurso: String) {
		this.cursoService.getCursoById(idCurso).subscribe((data) => {
			debugger;
			let cursoId = data;

			this.cursoForm.patchValue(cursoId);
		});
	}

  
  submit(){
    debugger;
    if (this.idCurso){
      this.cursoService.editarCurso(this.idCurso, this.cursoForm.value).subscribe((curso) => {
        // console.log("Persona editada: ", persona);
      });
    } else{
      this.cursoService.guardarCurso(this.cursoForm.value).subscribe(curso => {
        console.log("Curso Nuevo: ", curso);
        // let personaNueva = persona;
      });
    }

    this.router.navigate(['/mostrarCurso']);
    
  };

}
