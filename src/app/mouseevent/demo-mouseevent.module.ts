import {NgModule} from '@angular/core';

import {TableComponent} from "@guiexpert/angular-table";
import {DemoMouseeventComponent} from "./demo-mouseevent.component";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [DemoMouseeventComponent],
  imports: [
    TableComponent,
    RouterModule.forChild([
      {
        path: "mouseevent",
        component: DemoMouseeventComponent
      }
    ]),
  ],
  providers: [],
  bootstrap: [DemoMouseeventComponent],
})
export class DemoMouseeventModule {
}
