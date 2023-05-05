import {NgModule} from '@angular/core';

import {TableComponent} from "@guiexpert/angular-table";
import {DemoMultisizeComponent} from "./demo-multisize.component";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [DemoMultisizeComponent],
  imports: [
    TableComponent,
    RouterModule.forChild([
      {
        path: "multisize",
        component: DemoMultisizeComponent
      }
    ]),
  ],
  providers: [],
  bootstrap: [DemoMultisizeComponent],
})
export class DemoMultisizeModule {
}
