import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CursoService } from 'src/app/servicios/curso.service';
import { Curso } from './../curso';

@Component({
  selector: 'app-mostrar-curso',
  templateUrl: './mostrar-curso.component.html',
  styleUrls: ['./mostrar-curso.component.css']
})
export class MostrarCursoComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'profesor', 'anio', 'estado', 'editar', 'borrar'];
  dataSource : any[] = [];

  idCurso: string;

  constructor(private cursoService : CursoService, private router : Router) { }

  ngOnInit(): void {
    this.getCursos();
  }

  getCursos(){
    this.cursoService.getCursos().subscribe((data: any) => {
      debugger;
      this.dataSource = data;
    });
  }

  editar(idCurso){
   
    this.router.navigate(['/crearCurso/' + idCurso]);
    
    debugger;	

  }

  borrar(curso: any){
    debugger;
    this.idCurso = curso._id;
    this.cursoService.borrarCurso(this.idCurso).subscribe( respuesta  => {
      console.log("Curso borrado: ", curso)
    });

    location.reload();

  }

}
