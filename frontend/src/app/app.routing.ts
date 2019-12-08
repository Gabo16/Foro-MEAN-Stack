import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { TopicDetailComponent } from './components/topic-detail/topic-detail.component';
import { TopicsComponent } from './components/topics/topics.component';
import { UserGuard } from './guards/user.guard';
import { NoIdentityGuard } from './guards/no-identity.guard';
import { UsersComponent } from './components/users/users.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'inicio', component: HomeComponent },
	{ path: 'registro', component: RegisterComponent, canActivate: [NoIdentityGuard] },
	{ path: 'ingresar', component: LoginComponent, canActivate: [NoIdentityGuard] },
	{ path: 'ajustes', component: UserEditComponent, canActivate: [UserGuard] },
	{ path: 'usuarios', component: UsersComponent },
	{ path: 'usuario/:id', component: UserDetailComponent },
	{ path: 'buscar/:termino', component: SearchComponent },
	{ path: 'temas', component: TopicsComponent },
	{ path: 'temas', component: TopicsComponent },
	{ path: 'temas/:page', component: TopicsComponent },
	{ path: 'tema/:id', component: TopicDetailComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
