import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  addForm: FormGroup;
  id: String = 'add';
  sub: Subscription | undefined;
  isEdit: boolean = false;

  constructor(
    private builder: FormBuilder,
    private router: Router,
    private dataService: DataService,
    private activatedRoute: ActivatedRoute
  ) {
    this.addForm = this.builder.group({
      rowId: [''],
      parRowId: [''],
      lovType: [''],
      lovName: [''],
      displayVal: [''],
      lovVal1: [''],
      lovVal2: [''],
      lovVal3: [''],
      lovVal4: [''],
      lovVal5: [''],
      lovVal6: [''],
      lovVal7: [''],
      lovVal8: [''],
      lovVal9: [''],
      lovVal10: [''],
      activeFlg: [''],
      textDesc: [''],
      orderBy: [''],
      modificationNum: [''],
      create: [''],
      createBy: [''],
      lastUpd: [''],
      lastUpdBy: [''],
      groupType: [''],
    });
  }

  ngOnInit(): void {
    this.sub = this.activatedRoute.paramMap.subscribe((params) => {
      this.id = params.get('id') || '';
      if (this.id !== 'add') {
        this.isEdit = true;
        this.dataService.getOne(this.id).subscribe((data) => {
          this.addForm.setValue({
            ...data,
            last_UPD: data.last_UPD.split('T')[0],
            created: data.created.split('T')[0],
          });
        });
      } else {
        this.isEdit = false;
        this.addForm.reset;
      }
    });
  }

  onSubmit(): void {
    console.log('submit');
    console.log(this.addForm.value);
    if (!this.isEdit) {
      this.dataService.create(this.addForm.value).subscribe((data) => {
        console.log('success', data);
        this.router.navigate(['/data']);
      });
    } else {
      this.dataService.update(this.id, this.addForm.value).subscribe((data) => {
        this.router.navigate(['/data']);
      });
    }
  }
}
