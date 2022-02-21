import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NotesComponent } from './notes/notes.component';
import { MainComponent } from './main/main.component';
import { AuthComponent } from './auth/auth.component';


const routes: Routes = [
  {path : 'notes', component: NotesComponent},
  {path : 'main', component: MainComponent},
  {path : 'auth', component: AuthComponent},
  { path: '', redirectTo: '/notes', pathMatch: 'full' },
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
