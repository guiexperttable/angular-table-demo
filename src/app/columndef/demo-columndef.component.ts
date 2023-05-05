import { Component, EventEmitter, OnDestroy, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  AutoRestoreOptions,
  CellRange,
  ColumnDef,
  ColumnDefIf,
  DateToIntlDDMMYYYYCellRenderer,
  FalseFn,
  GeModelChangeEvent,
  MaleFemaleToIconCellRenderer,
  NumberCellRenderer,
  px100,
  px120,
  px150,
  px200,
  px50,
  px60,
  px70,
  px80,
  Renderer,
  SelectCellRenderer,
  SelectionModel,
  TableApi,
  TableModelFactory,
  TableModelIf,
  TableOptions,
  TableOptionsIf,
  TreeRow,
  TrueFn,
  ValueLabel
} from "@guiexpert/table";
import { PersonIf } from "./data/person.if";
import { debounceTime, takeWhile } from "rxjs";


@Component({
  selector: 'demo-columndef',
  templateUrl: './demo-columndef.component.html',
  styleUrls: ['./demo-columndef.component.css'],
})
export class DemoColumndefComponent implements OnInit, OnDestroy {


  selectionModel = new SelectionModel('range', 'multi');

  // Table options:
  tableOptions: TableOptionsIf = {
    ...new TableOptions(),
    hoverColumnVisible: false,
    defaultRowHeights: {
      header: 50,
      body: 34,
      footer: 0
    },
    autoRestoreOptions: {
      ...new AutoRestoreOptions<PersonIf>(),
      getStorageKeyFn: () => 'demoColumndefComponent',
      autoRestoreCollapsedExpandedState: true,
      autoRestoreScrollPosition: true,
      autoRestoreSortingState: true
    },
    externalFilterFunction: this.filterFn.bind(this),
    getSelectionModel: () => this.selectionModel
  };
  // Table model:
  tableModel?: TableModelIf;

  // Column model:
  private columnDefs: ColumnDefIf[] = [
    new ColumnDef('lastName', 'Last Name', px200),
    new ColumnDef('preName', 'Pre Name', px120),
    new ColumnDef('age', 'Age', px80, undefined, ColumnDef.bodyRenderer(new NumberCellRenderer())),
    new ColumnDef('birth', 'Birthday', px100,
      undefined,
      Renderer.bodyRenderer(new DateToIntlDDMMYYYYCellRenderer())),

    ColumnDef.create({
      property: 'gender',
      headerLabel: ' ',
      width: px50,
      bodyRenderer: new MaleFemaleToIconCellRenderer(),
      editable: TrueFn,
      getEditRenderer: () => new SelectCellRenderer([
        new ValueLabel('female', '♀'),
        new ValueLabel('male', '♂'),
      ])
    }),

    new ColumnDef('address.street', 'Strasse', px150),
    new ColumnDef('address.number', 'Nr', px70),
    new ColumnDef('address.zip', 'Zip', px60),
    new ColumnDef('address.city', 'City', px120),
    new ColumnDef('address.country', 'Country', px120),
    new ColumnDef('id', 'ID', px60),
  ];
  filterText = '';

  private tableApi?: TableApi;
  private filter$ = new EventEmitter<number>();
  private alive = true;

  constructor(
    private readonly http: HttpClient
  ) {
    for (const columnDef of this.columnDefs) {
      columnDef.sortable = TrueFn;
      columnDef.editable = TrueFn;
    }
    this.columnDefs[0].editable = FalseFn;
    this.selectionModel.addSelection(new CellRange(0, 0, 0, 2)); // TODO
    this.selectionModel.addSelection(new CellRange(2, 1, 2, 2)); // TODO
    this.selectionModel.addSelection(new CellRange(1, 5, 6, 7)); // TODO
    this.selectionModel.addSelection(new CellRange(0, 8, 0, 8)); // TODO
    this.selectionModel.addSelection(new CellRange(5, 6, 10, 10)); // TODO
  }

  ngOnInit(): void {
    this.http
      .get<PersonIf[]>('/assets/demodata/tree-persons.json')
      .subscribe(this.onDataLoaded.bind(this));

    this.filter$
      .pipe(
        takeWhile(() => this.alive),
        debounceTime(200)
      )
      .subscribe(() => {
        this.tableApi?.externalFilterChanged();
      });
  }


  ngOnDestroy(): void {
    this.alive = false;
  }

  onKeyup() {
    this.filter$.next(Date.now());
  }


  onTableReady($event: TableApi) {
    this.tableApi = $event;
  }


  onModelChanged(evt: GeModelChangeEvent) {
    console.info(evt);
  }


  private filterFn(value: TreeRow<PersonIf>, _index: number, _array: PersonIf[]) {
    return !this.filterText || value.data.address.city.includes(this.filterText);
  }

  private onDataLoaded(data: PersonIf[]) {
    const tree = TableModelFactory.buildTreeRows<PersonIf>(data, 'friends');
    this.tableModel = TableModelFactory.buildByTypedRows<TreeRow<PersonIf>>(
      tree,
      this.columnDefs,
      this.tableOptions,
      1,
      1
    );
    if (this.tableModel) {
      this.tableModel.getBodyModel().setValue = this.setValue.bind(this);
    }
  }


  private setValue(rowIndex: number, columnIndex: number, value: string, tableModel: TableModelIf): boolean {
    const row: TreeRow<PersonIf> = tableModel.getBodyRowByIndex(rowIndex);
    const property = tableModel.getColumnProperty(columnIndex);
    let v: any = value;

    if (property === 'age') {
      v = Number(value);
      if (isNaN(v)) {
        v = value;
      }
    }
    // @ts-ignore
    row.data[property] = v;
    return true;
  }
}

