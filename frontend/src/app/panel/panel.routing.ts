import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { MainComponent } from './components/main/main.component';
import { UserGuard } from '../guards/user.guard';

const panelRoutes: Routes = [
	{
		path: 'panel',
		component: MainComponent,
		canActivate: [ UserGuard ],
		children: [
			{ path: 'listado', component: ListComponent },
			{ path: 'crear', component: AddComponent },
			{ path: 'editar/:id', component: EditComponent },
			{ path: '**', component: ListComponent },
			{ path: '', pathMatch: 'full', redirectTo: 'listado' }
		]
	}
];

@NgModule({
	imports: [ RouterModule.forChild(panelRoutes) ],
	exports: [ RouterModule ]
})
export class PanelRoutingModule {}
