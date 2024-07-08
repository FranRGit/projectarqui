import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlertsComponent } from './components/alerts/alerts.component';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { ChipsComponent } from './components/chips/chips.component';
import { ExpansionComponent } from './components/expansion/expansion.component';
import { FormsComponent } from './components/forms/forms.component';
import { GridListComponent } from './components/grid-list/grid-list.component';
import { MenuComponent } from './components/menu/menu.component';
import { ProgressSnipperComponent } from './components/progress-snipper/progress-snipper.component';
import { ProgressComponent } from './components/progress/progress.component';
import { SlideToggleComponent } from './components/slide-toggle/slide-toggle.component';
import { SliderComponent } from './components/slider/slider.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { TooltipsComponent } from './components/tooltips/tooltips.component';
import { ProductComponent } from './dashboard/dashboard-components/product/product.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FullComponent } from './layouts/full/full.component';
import { TableroComponent } from './tablero/tablero.component';
import { TurnosComponent } from './tablero/components/turnos/turnos.component';
import { AtencionComponent } from './tablero/components/atencion/atencion.component';
import { LoginComponent } from './autenticacion/login/login.component';
import { AutenticacionComponent } from './autenticacion/autenticacion.component';
import { RegisterComponent } from './autenticacion/register/register.component';
import { TableroUsuarioComponent } from './Usuario/tablero-usuario/tablero-usuario.component';
import {canActivate, redirectUnauthorizedTo} from '@angular/fire/auth-guard'
import { TurnoUsuarioComponent } from './Usuario/tablero-usuario/turno-usuario/turno-usuario.component';

const routes: Routes = [
  {
    path: "",
    component: FullComponent, ...canActivate(()=> redirectUnauthorizedTo(['/login'])),
    children: [
      { path: "", redirectTo: "home", pathMatch: "full" },
      { path: "home", component: DashboardComponent },
      { path: "tablero", component: TableroComponent,
        children: [
          { path: "", redirectTo: "turnos", pathMatch: "full" },
          { path: "turnos", component: TurnosComponent },
          { path: "atencion", component: AtencionComponent }
        ]
      },
      { path: "alerts", component: AlertsComponent },
      { path: "forms", component: FormsComponent },
      { path: "table", component: ProductComponent },
      { path: "grid-list", component: GridListComponent },
      { path: "menu", component: MenuComponent },
      { path: "tabs", component: TabsComponent },
      { path: "expansion", component: ExpansionComponent },
      { path: "chips", component: ChipsComponent },
      { path: "progress", component: ProgressComponent },
      { path: "toolbar", component: ToolbarComponent },
      { path: "progress-snipper", component: ProgressSnipperComponent },
      { path: "snackbar", component: SnackbarComponent },
      { path: "slider", component: SliderComponent },
      { path: "slide-toggle", component: SlideToggleComponent },
      { path: "tooltip", component: TooltipsComponent },
      { path: "button", component: ButtonsComponent },
    ]
  },
  {
    path: "autenticacion",
    component: AutenticacionComponent,
    children: [
      { path: "", redirectTo: "login", pathMatch: "full" },
      { path: "login", component: LoginComponent },
      { path: "register", component: RegisterComponent }
    ]
  },

  {
    path: "usuario",
    component: TableroUsuarioComponent, ...canActivate(()=> redirectUnauthorizedTo(['/login'])),
  },
  {path:"turno", component:TurnoUsuarioComponent},

  { path: "", redirectTo: "/autenticacion/login", pathMatch: "full" },
  { path: "**", redirectTo: "/autenticacion/login", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
