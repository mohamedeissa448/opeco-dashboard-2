import { AnalyticsConfigurationComponent } from "./analytics-configuration/analytics-configuration.component";
import { ContactComponent } from "./contact/contact.component";
import { projectsSectionComponent } from "./projects/projects.component";
import { SysSetupAuthGuardService } from "./../../authentication/services/sys-setup-auth-guard.service";
import { AuthGuardService } from "./../../authentication/services/auth-guard.service";
import { HomeComponent } from "./home/home.component";
import { from } from "rxjs";
import { WeekDay } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { AboutUsComponent } from "./about-us/about-us.component";
import { serviceSectionComponent } from "./service-section/service-section.component";

const routes: Routes = [
  {
    path: "sys-setup",
    children: [
      {
        path: "manage-home-section",
        component: HomeComponent,
        data: {
          title: "RxP CMS Manager » System Setup » Home Section"
        },
        canActivate: [AuthGuardService]
      },
      {
        path: "manage-aboutUs-section",
        component: AboutUsComponent,
        data: {
          title: "RxP CMS Manager » System Setup » About Section"
        },
        canActivate: [AuthGuardService]
      },
      {
        path: "manage-services-section",
        component: serviceSectionComponent,
        data: {
          title: "RxP CMS Manager » System Setup » Services Section"
        },
        canActivate: [AuthGuardService]
      },
      {
        path: "manage-projects-section",
        component: projectsSectionComponent,
        data: {
          title: "RxP CMS Manager » System Setup » Projects Section"
        },
        canActivate: [AuthGuardService]
      },
      {
        path: "manage-contact-section",
        component: ContactComponent,
        data: {
          title: "RxP CMS Manager » System Setup » Contact Section"
        },
        canActivate: [AuthGuardService]
      },

      {
        path: "manage-analytics-configuration-section",
        component: AnalyticsConfigurationComponent,
        data: {
          title:
            "RxP CMS Manager » System Setup » Analytics Configuration Section"
        },
        canActivate: [AuthGuardService]
      }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
