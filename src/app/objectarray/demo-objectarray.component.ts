import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SimplePersonIf} from "./simple-person.if";
import {ColumnDef, px200, TableModelFactory, TableModelIf, TableOptions, TableOptionsIf} from "@guiexpert/table";

@Component({
  selector: 'demo-objectarray',
  templateUrl: './demo-objectarray.component.html',
  styleUrls: ['./demo-objectarray.component.css'],
})
export class DemoObjectarrayComponent implements OnInit {

  tableModel?: TableModelIf;
  tableOptions: TableOptionsIf = {
    ...new TableOptions(),
    hoverColumnVisible: false,
    defaultRowHeights: {
      header: 50,
      body: 34,
      footer: 0
    }
  };

  private properties = [
    'id', 'firstName', 'lastName', 'email', 'gender', 'ipAddress'
  ];

  constructor(
    private readonly http: HttpClient
  ) {
  }

  ngOnInit(): void {
    this.http
      .get<SimplePersonIf[]>('/assets/demodata/persons1000.json')
      .subscribe(this.onDataLoaded.bind(this));
  }

  private onDataLoaded(data: SimplePersonIf[]) {
    const columnDefs = this.properties.map(p => new ColumnDef(p, p.toUpperCase(), px200));

    this.tableModel = TableModelFactory.createByObjectArrayParam<SimplePersonIf>({
      columnDefs: columnDefs,
      rows: data,
      defaultRowHeights: this.tableOptions.defaultRowHeights,
    });
  }

}
