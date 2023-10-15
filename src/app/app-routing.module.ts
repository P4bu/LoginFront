import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { UserGuard } from './guard/user.guard';
import { Tab2Page } from './pages/tab2/tab2.page';
import { Tab3Page } from './pages/tab3/tab3.page';

const routes: Routes = [
  {
    path:'',
    component : LoginComponent
  },
  {
    path:'registro',
    component: RegisterComponent
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule),
    //canLoad:[UserGuard]
    //ruta para ingresar a los tabs home/tabs/tab1
  },
  {
    path: 'tab2',
    component: Tab2Page
  },
  {
    path: 'tab3',
    component: Tab3Page
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
