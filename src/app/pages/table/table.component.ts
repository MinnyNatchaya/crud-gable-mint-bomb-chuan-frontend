import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Data } from 'src/app/models/data.model';

const ELE_DATA: Data[] = [
  {
    rowId: '1',
    parRowId: '2',
    lovType: '1',
    lovName: 'LOV1',
    displayVal: 'displayVal1',
    lovVal1: '100.00',
    lovVal2: '300.00',
    lovVal3: '400.00',
    lovVal4: '200.00',
    lovVal5: '200.00',
    lovVal6: '200.00',
    lovVal7: '200.00',
    lovVal8: '200.00',
    lovVal9: '200.00',
    lovVal10: '200.00',
    activeFlg: '200.00',
    textDesc: 'Desc1',
    orderBy: BigInt(100000),
    modificationNum: BigInt(100000),
    created: new Date(Date.now() - 24 * 60 * 60 * 5000),
    createdBy: 'Bomb',
    lastUpd: new Date(Date.now() - 24 * 60 * 60 * 1000),
    lastUpdBy: 'mint',
    groupType: 'Group1',
  },
  {
    rowId: '2',
    parRowId: '2',
    lovType: '2',
    lovName: 'LOV2',
    displayVal: 'displayVal2',
    lovVal1: '100.00',
    lovVal2: '300.00',
    lovVal3: '400.00',
    lovVal4: '200.00',
    lovVal5: '200.00',
    lovVal6: '200.00',
    lovVal7: '200.00',
    lovVal8: '200.00',
    lovVal9: '200.00',
    lovVal10: '200.00',
    activeFlg: '200.00',
    textDesc: 'Desc2',
    orderBy: BigInt(200000),
    modificationNum: BigInt(200000),
    created: new Date(Date.now() - 24 * 60 * 60 * 5000),
    createdBy: 'Bomb',
    lastUpd: new Date(Date.now() - 24 * 60 * 60 * 2000),
    lastUpdBy: 'mint',
    groupType: 'Group2',
  },
  {
    rowId: '3',
    parRowId: '2',
    lovType: '3',
    lovName: 'LOV3',
    displayVal: 'displayVal3',
    lovVal1: '100.00',
    lovVal2: '300.00',
    lovVal3: '400.00',
    lovVal4: '200.00',
    lovVal5: '200.00',
    lovVal6: '200.00',
    lovVal7: '200.00',
    lovVal8: '200.00',
    lovVal9: '200.00',
    lovVal10: '200.00',
    activeFlg: '200.00',
    textDesc: 'Desc3',
    orderBy: BigInt(30000000),
    modificationNum: BigInt(30000000),
    created: new Date(Date.now() - 24 * 60 * 60 * 5000),
    createdBy: 'Bomb',
    lastUpd: new Date(Date.now() - 24 * 60 * 60 * 3000),
    lastUpdBy: 'mint',
    groupType: 'Group3',
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
export class TableComponent implements AfterViewInit {
  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  // dataSource = new MatTableDataSource(ELEMENT_DATA);
  displayedColumns: string[] = [
    'rowId',
    'parRowId',
    'lovType',
    'lovName',
    'displayVal',
    'activeFlg',
    'textDesc',
    'orderBy',
    'modificationNum',
    'created',
    'createdBy',
    'lastUpd',
    'lastUpdBy',
    'groupType',
  ];
  dataSource = new MatTableDataSource(ELE_DATA);

  constructor(private _liveAnnouncer: LiveAnnouncer) {}

  @ViewChild(MatSort) sort: MatSort = new MatSort();

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
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
