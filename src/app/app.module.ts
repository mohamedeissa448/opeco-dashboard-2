import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppComponent } from "./app.component";
import { routing } from "./app.routing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { RichTextEditorAllModule } from "@syncfusion/ej2-angular-richtexteditor";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { LeafletModule } from "@asymmetrik/ngx-leaflet";
import { NgxGalleryModule } from "ngx-gallery";
import { HttpClientModule } from "@angular/common/http";
import { LayoutModule } from "./layout/layout.module";

import { SysSetupModule } from "./components/sys-setup/sys-setup.module";
import { DashboardModule } from "./components/dashboard/dashboard.module";

//import * as $ from 'jquery';
import { from } from "rxjs";
import { AuthenticationModule } from "./authentication/authentication.module";
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [AppComponent, NotFoundComponent],
  imports: [
    BrowserModule,
    // admin Modules
    SysSetupModule,
    DashboardModule,
    AuthenticationModule,
    // end of pharmed modules
    routing,
    HttpClientModule,
    NgbModule,
    LayoutModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RichTextEditorAllModule,
    NgMultiSelectDropDownModule.forRoot(),
    LeafletModule.forRoot(),
    NgxGalleryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
