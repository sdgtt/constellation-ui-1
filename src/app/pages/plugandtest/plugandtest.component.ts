import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-plugandtest',
  templateUrl: './plugandtest.component.html',
  styleUrls: ['./plugandtest.component.scss']
})
export class PlugandtestComponent implements OnInit {
  plugandtest="In order to maximize test harness capabilities, Plug-and-Test pipeline was created to help Kuiper Linux Release Candidate testing. This page displays the test result summary of every release candidate test.";
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
