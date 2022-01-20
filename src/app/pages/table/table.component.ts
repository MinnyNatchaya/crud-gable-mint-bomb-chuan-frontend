import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Data } from 'src/app/models/data.model';
import { DataService } from 'src/app/services/data.service';

const ELE_DATA: Data[] = [
  {
    row_ID: '1',
    par_ROW_ID: '2',
    lov_TYPE: '1',
    lov_NAME: 'LOV1',
    display_VAL: 'display_VAL1',
    lov_VAL1: '100.00',
    lov_VAL2: '300.00',
    lov_VAL3: '400.00',
    lov_VAL4: '200.00',
    lov_VAL5: '200.00',
    lov_VAL6: '200.00',
    lov_VAL7: '200.00',
    lov_VAL8: '200.00',
    lov_VAL9: '200.00',
    lov_VAL10: '200.00',
    active_FLG: '200.00',
    text_DESC: 'Desc1',
    order_BY: BigInt(100000),
    modification_NUM: BigInt(100000),
    created: new Date(Date.now() - 24 * 60 * 60 * 5000),
    created_BY: 'Bomb',
    last_UPD: new Date(Date.now() - 24 * 60 * 60 * 1000),
    last_UPD_BY: 'mint',
    group_TYPE: 'Group1',
  },
  {
    row_ID: '2',
    par_ROW_ID: '2',
    lov_TYPE: '2',
    lov_NAME: 'LOV2',
    display_VAL: 'display_VAL2',
    lov_VAL1: '100.00',
    lov_VAL2: '300.00',
    lov_VAL3: '400.00',
    lov_VAL4: '200.00',
    lov_VAL5: '200.00',
    lov_VAL6: '200.00',
    lov_VAL7: '200.00',
    lov_VAL8: '200.00',
    lov_VAL9: '200.00',
    lov_VAL10: '200.00',
    active_FLG: '200.00',
    text_DESC: 'Desc2',
    order_BY: BigInt(200000),
    modification_NUM: BigInt(200000),
    created: new Date(Date.now() - 24 * 60 * 60 * 5000),
    created_BY: 'Bomb',
    last_UPD: new Date(Date.now() - 24 * 60 * 60 * 2000),
    last_UPD_BY: 'mint',
    group_TYPE: 'Group2',
  },
  {
    row_ID: '3',
    par_ROW_ID: '2',
    lov_TYPE: '3',
    lov_NAME: 'LOV3',
    display_VAL: 'display_VAL3',
    lov_VAL1: '100.00',
    lov_VAL2: '300.00',
    lov_VAL3: '400.00',
    lov_VAL4: '200.00',
    lov_VAL5: '200.00',
    lov_VAL6: '200.00',
    lov_VAL7: '200.00',
    lov_VAL8: '200.00',
    lov_VAL9: '200.00',
    lov_VAL10: '200.00',
    active_FLG: '200.00',
    text_DESC: 'Desc3',
    order_BY: BigInt(30000000),
    modification_NUM: BigInt(30000000),
    created: new Date(Date.now() - 24 * 60 * 60 * 5000),
    created_BY: 'Bomb',
    last_UPD: new Date(Date.now() - 24 * 60 * 60 * 3000),
    last_UPD_BY: 'mint',
    group_TYPE: 'Group3',
  },
];

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

/**
 * @title Table with sorting
 */

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements AfterViewInit, OnInit {
  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  // dataSource = new MatTableDataSource(ELEMENT_DATA);
  displayedColumns: string[] = [
    'row_ID',
    'par_ROW_ID',
    'lov_TYPE',
    'lov_NAME',
    'display_VAL',
    'active_FLG',
    'text_DESC',
    'order_BY',
    'modification_NUM',
    'created',
    'created_BY',
    'last_UPD',
    'last_UPD_BY',
    'group_TYPE',
    'actions',
  ];
  dataSource = new MatTableDataSource(ELE_DATA);
  data: Data[] = [];

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private dataService: DataService
  ) {}

  @ViewChild(MatSort) sort: MatSort = new MatSort();

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.dataService.getAll().subscribe(
      (res: any) => {
        this.data = res;
      },
      (err: any) => {
        console.dir(err);
      }
    );
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
