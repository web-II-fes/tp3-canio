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

  constructor(private fb: FormBuilder, private cursoService : CursoService, private paramRoute : ActivatedRoute, private router : Router) { }

  ngOnInit(): void {
    this.initForm();

    this.paramRoute.paramMap.subscribe((param) => {
      debugger;
      this.idCurso = param.get('id');

      // if (this.idCurso !== 'new'){
      //   this.getCursoById(this.idCurso);
      // }
      if (this.idCurso === 'new'){
        this.initForm();
      }
    });

    this.initForm();

    this.getCurso();
  }


  initForm(){
    this.cursoForm = this.fb.group({
      nombre : ['', Validators.required],
      profesor : ['', Validators.required],
      anio : [''],
      estado : ['']
    
    });
  }

  getCurso(){
    this.cursoService.getCursos().subscribe((cursos: any) => {
      this.cursos = cursos;
    });
  }
  editarCurso(curso: any){
    this.idCurso = curso._id;
    this.cursoForm.patchValue({
      nombre: curso.nombre,
      profesor: curso.profesor,
      anio: curso.anio,
      estado: curso.estado
    });
  }

  borrarCurso(curso: any){
    debugger;
    this.idCurso = curso._id;
    this.cursoService.borrarCurso(this.idCurso).subscribe( respuesta  => {
      console.log("Curso borrado: ", curso)
    });
  }
  
  submit(){
    debugger;
    // if (this.idCurso){
    //   this.cursoService.editarCurso(this.idCurso, this.cursoForm.value).subscribe(curso => {
    //     console.log("Curso editado: ", curso);
    //   });
    // } else{
      this.cursoService.guardarCurso(this.cursoForm.value).subscribe(curso => {
        console.log("Nuevo Curso: ", curso);
      });
      this.router.navigate(['/mostrar-curso-component']);
    }

}
