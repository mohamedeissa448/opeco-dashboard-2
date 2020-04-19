import { NotFoundComponent } from "./components/not-found/not-found.component";
import { AuthGuardService } from "./authentication/services/auth-guard.service";
import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";

export const routes: Routes = [
  { path: "", redirectTo: "dashboard", pathMatch: "full" },
  {
    path: "sys-setup",
    loadChildren: () =>
      import("../app/components/sys-setup/sys-setup.module").then(
        m => m.SysSetupModule
      )
    //canActivate: [AuthGuardService]
  },
  {
    path: "dashboard",
    loadChildren: () =>
      import("../app/components/dashboard/dashboard.module").then(
        m => m.DashboardModule
      )
  },

  {
    path: "authentication",
    loadChildren: () =>
      import("../app/authentication/authentication.module").then(
        m => m.AuthenticationModule
      )
  },
  {
    path: "**",
    component: NotFoundComponent,
    canActivate: [AuthGuardService]
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
  useHash: false
});
