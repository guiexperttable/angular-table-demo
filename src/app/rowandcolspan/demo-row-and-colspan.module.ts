import {NgModule} from '@angular/core';

import {TableComponent} from "@guiexpert/angular-table";
import {DemoRowAndColspanComponent} from "./demo-row-and-colspan.component";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [DemoRowAndColspanComponent],
  imports: [
    TableComponent,
    RouterModule.forChild([
      {
        path: "rowandcolspan",
        component: DemoRowAndColspanComponent
      }
    ]),
  ],
  providers: [],
  bootstrap: [DemoRowAndColspanComponent],
})
export class DemoRowAndColspanModule {
}
