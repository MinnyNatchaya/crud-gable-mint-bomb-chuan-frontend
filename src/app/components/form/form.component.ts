import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  addForm!: FormGroup;
  id: number = 0;
  sub: Subscription | undefined;

  constructor(
    private builder: FormBuilder,
    private router: Router,
    private dataService: DataService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.sub = this.activatedRoute.paramMap.subscribe((params) => {
      this.id = <number>(<unknown>params.get('id'));
      if (this.id > 0) { 
        this.dataService
          .getOne(this.id).subscribe((data) => {
            this.addForm.setValue(data);
          });
      }
    });

    this.addForm = this.builder.group({
      row_ID: [''],
      par_ROW_ID: [''],
      lov_TYPE: [''],
      lov_NAME: [''],
      display_VAL: [''],
      lov_VAL1: [''],
      lov_VAL2: [''],
      lov_VAL3: [''],
      lov_VAL4: [''],
      lov_VAL5: [''],
      lov_VAL6: [''],
      lov_VAL7: [''],
      lov_VAL8: [''],
      lov_VAL9: [''],
      lov_VAL10: [''],
      active_FLG: [''],
      text_DESC: [''],
      order_BY: [''],
      modification_NUM: [''],
      created: [''],
      created_BY: [''],
      last_UPD: [''],
      last_UPD_BY: [''],
      group_TYPE: [''],
    });
  }

  onSubmit(): void {
    console.log('submit');
    console.log(this.addForm.value);
    // if (this.id == 0) {
    //   this.dataService
    //     .create(this.addForm.value)
    //     .subscribe((data) => {
    //       console.log('success', data);
    //       this.router.navigate(['/data']);
    //     });
    // } else {
    //   this.dataService
    //     .update(this.id, this.addForm.value).subscribe((data) => {
    //       this.router.navigate(['/data']);
    //     });
    // }
  }

}
