import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-plugandtest',
  templateUrl: './plugandtest.component.html',
  styleUrls: ['./plugandtest.component.scss']
})
export class PlugandtestComponent implements OnInit {
  websiteList: any = ['HW_tests/HW_test_multiconfig', 'Test Harness', 'SQA']
  
  form = new FormGroup({
    website: new FormControl('', Validators.required)
  });
  
  get f(){
    return this.form.controls;
  }
  
  submit(){
    console.log(this.form.value);
  }
  constructor() { }

  ngOnInit(): void {
  }

}
