import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class CursoService{
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }
    private cursoUrl = 'http://localhost:3002/api/modules/cursos/';

    constructor(private httpClient: HttpClient){}

    getCursos(){
        return this.httpClient.get(this.cursoUrl + 'curso');
    }

    // getCursoById(idCurso: string){
    //     return this.httpClient.get(this.cursoUrl + 'cursoId' + idCurso);
    // }

    guardarCurso(curso: any){
        return this.httpClient.post(this.cursoUrl + 'curso', JSON.stringify(curso), this.httpOptions); 
    }

    editarCurso(idCurso, curso){
        return this.httpClient.put(this.cursoUrl + 'curso/' + idCurso, JSON.stringify(curso), this.httpOptions);
    }

    borrarCurso(idCurso){
        return this.httpClient.delete(this.cursoUrl + 'curso/' + idCurso, this.httpOptions);
    }

}