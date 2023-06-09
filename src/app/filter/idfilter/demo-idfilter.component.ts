import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import {
  ColumnDef,
  ColumnDefIf,
  TableFactory,
  px120,
  px150,
  px250,
  px50,
  TableApi,
  TableModelIf,
  TableOptions,
  TableOptionsIf
} from "@guiexpert/table";
import { SimplePersonIf } from "../../objectarray/simple-person.if";

@Component({
  selector: "demo-idfilter",
  templateUrl: "./demo-idfilter.component.html",
  styleUrls: ["./demo-idfilter.component.css"]
})
export class DemoIdfilterComponent implements OnInit {

  tableModel?: TableModelIf;

  tableOptions: TableOptionsIf = {
    ...new TableOptions(),
    hoverColumnVisible: false,
    defaultRowHeights: {
      header: 50,
      body: 34,
      footer: 0
    },
    externalFilterFunction: this.filterFn.bind(this)
  };

  filterMaxId = 20;

  private tableApi?: TableApi;

  constructor(
    private readonly http: HttpClient
  ) {
  }

  ngOnInit(): void {
    this.http
      .get<SimplePersonIf[]>("/assets/demodata/persons1000.json")
      .subscribe(this.onDataLoaded.bind(this));
  }


  onTableReady($event: TableApi) {
    this.tableApi = $event;
  }

  filterValueChanged(evt: number) {
    if (this.tableApi) {
      this.tableApi.externalFilterChanged();
      this.tableApi.repaint();
    }
  }

  private filterFn(value: SimplePersonIf, _index: number, _array: SimplePersonIf[]) {
    return value.id > this.filterMaxId;
  }

  private onDataLoaded(data: SimplePersonIf[]) {

    const columnDefs: ColumnDefIf[] = [
      new ColumnDef("firstName", "First Name", px120),
      new ColumnDef("lastName", "Last Name"),
      ColumnDef.create({
        property: "email",
        width: px250,
        bodyClasses: ["ge-table-text-align-left"]
      }),
      new ColumnDef("ipAddress", "IP", px150),
      new ColumnDef("id", "ID", px50)
    ];

    this.tableModel = TableFactory.createTableModel({
      rows: data,
      columnDefs,
      tableOptions: this.tableOptions,
      fixedLeftColumnCount: 2
    });
  }
}
