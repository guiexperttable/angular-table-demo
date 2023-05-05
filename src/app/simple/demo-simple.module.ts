import {NgModule} from '@angular/core';

import {TableComponent} from "@guiexpert/angular-table";
import {DemoSimpleComponent} from "./demo-simple.component";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [DemoSimpleComponent],
  imports: [
    TableComponent,
    RouterModule.forChild([
      {
        path: "simple",
        component: DemoSimpleComponent
      }
    ]),
  ],
  providers: [],
  bootstrap: [DemoSimpleComponent],
})
export class DemoSimpleModule {
}
