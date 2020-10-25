import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthService } from './services/auth.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from './login/login.component';

import { TokenStorageService } from './services/token-storage.service';

import { authInterceptorProviders } from './helper/auth.interceptor';

@NgModule({
	declarations: [
		LoginComponent
	],
	imports: [ CommonModule, AuthRoutingModule, FormsModule, HttpClientModule ],
	providers: [ authInterceptorProviders, AuthService, TokenStorageService ]
})
export class AuthModule {}