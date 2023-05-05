import {NgModule} from '@angular/core';

import {TableComponent} from "@guiexpert/angular-table";
import {DemoStyleComponent} from "./demo-style.component";
import {RouterModule} from "@angular/router";
import {DemoUltraComponent} from "./ultra/demo-ultra.component";

@NgModule({
  declarations: [DemoStyleComponent, DemoUltraComponent],
  imports: [
    TableComponent,
    RouterModule.forChild([
      {
        path: "style",
        component: DemoStyleComponent
      },
      {
        path: "ultra",
        component: DemoUltraComponent
      }
    ]),
  ],
  providers: [],
  bootstrap: [DemoStyleComponent, DemoUltraComponent],
})
export class DemoStyleModule {
}
