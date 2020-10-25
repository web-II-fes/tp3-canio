import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { TokenStorageService } from './../services/token-storage.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MostrarPersonaComponent} from './../../../persona/mostrar-persona/mostrar-persona.component'

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {
	form: any = {};
	isLoggedIn = false;
	isLoginFailed = false;
	errorMessage = '';
	roles: string[] = [];

	//recién agregado
	itemForm: FormGroup;


	constructor(private fb: FormBuilder, private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router) {}

	ngOnInit(): void {
		if (this.tokenStorage.getToken()) {
			this.isLoggedIn = true;
		}
		// this.iniciarFormulario();		 
	}


	//recién agregado
	// iniciarFormulario() {
	// 	this.itemForm = this.fb.group({
	// 	  username: [''],
	// 	  password: ['']
	// 	});
	//   }

	onSubmit(): void {
		this.authService.login(this.form).subscribe(
			(data) => {
				debugger;
				this.tokenStorage.saveToken(data.token);

				this.isLoginFailed = false;
				this.isLoggedIn = true;

				this.router.navigate(['/persona/mostrarPersona']);
			},
			(err) => {
				this.errorMessage = err.error.message;
				this.isLoginFailed = true;
			}
		);
	}

	reloadPage(): void {
		window.location.reload();
	}
}