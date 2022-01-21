import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Data } from 'src/app/models/data.model';
import { DataService } from 'src/app/services/data.service';

const ELE_DATA: Data[] = [
  {
    rowId: '1',
    parRowId: '2',
    lovType: '1',
    lovName: 'LOV1',
    displayVal: 'display_VAL1',
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
    create: new Date(Date.now() - 24 * 60 * 60 * 5000),
    createBy: 'Bomb',
    lastUpd: new Date(Date.now() - 24 * 60 * 60 * 1000),
    lastUpdBy: 'mint',
    groupType: 'Group1',
  },
  {
    rowId: '2',
    parRowId: '2',
    lovType: '2',
    lovName: 'LOV2',
    displayVal: 'display_VAL2',
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
    orderBy: BigInt(100000),
    modificationNum: BigInt(100000),
    create: new Date(Date.now() - 24 * 60 * 60 * 5000),
    createBy: 'Bomb',
    lastUpd: new Date(Date.now() - 24 * 60 * 60 * 2000),
    lastUpdBy: 'mint',
    groupType: 'Group2',
  },
  {
    rowId: '3',
    parRowId: '3',
    lovType: '3',
    lovName: 'LOV3',
    displayVal: 'display_VAL3',
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
    orderBy: BigInt(100000),
    modificationNum: BigInt(100000),
    create: new Date(Date.now() - 24 * 60 * 60 * 5000),
    createBy: 'Bomb',
    lastUpd: new Date(Date.now() - 24 * 60 * 60 * 3000),
    lastUpdBy: 'mint',
    groupType: 'Group3',
  },
];

/**
 * @title Table with sorting
 */

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
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
    'create',
    'createBy',
    'lastUpd',
    'lastUpdBy',
    'groupType',
    'actions',
  ];
  data: Data[] = [];
  dataSource = new MatTableDataSource(this.data);

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private dataService: DataService,
    private router: Router
  ) {}

  @ViewChild(MatSort) sort: MatSort = new MatSort();

  getData() {
    this.dataService.getAll().subscribe(
      (res: any) => {
        this.data = res;
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.sort = this.sort;
      },
      (err: any) => {
        console.dir(err);
      }
    );
  }

  ngOnInit(): void {
    this.getData();
  }

  ngAfterViewInit(): void {
    console.log(this.data);
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

  handleClickEdit(id: String) {
    this.router.navigate(['/form', id]);
  }

  handleClickDelete(id: String) {
    if (window.confirm('Do you want to go ahead?')) {
      this.dataService.delete(id).subscribe(
        (res) => {
          alert('Detete Success');
          this.getData();
        },
        (err: any) => {
          console.dir(err);
        }
      );
    }
  }
}
