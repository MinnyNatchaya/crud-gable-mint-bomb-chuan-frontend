import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './components/form/form.component';
import { TableComponent } from './pages/table/table.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/data' },
  { path: 'data', component: TableComponent },
  { path: 'form/:id', component: FormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
