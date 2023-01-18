import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';


@Component({
  selector: 'app-hwpipeline',
  templateUrl: './hwpipeline.component.html',
  styleUrls: ['./hwpipeline.component.scss']
})
export class KuiperLinucCIComponent implements OnInit {
  modalRef?: BsModalRef;
  kuiperlinux ="Kuiper Linux CI is a CI for continuous testing of Kuiper Linux on hardware. It is automatically triggered once a new boot partition is built and uploaded to artifactory. This page shows the latest test results summary of Kuiper Linux test stages.";
  selectedCity = null;

  defaultBindingsList = [
    { value: 1, label: 'HW_tests/HW_test_multiconfig 1'},
    { value: 2, label: 'HW_tests/HW_test_multiconfig 2' },
    { value: 3, label: 'HW_tests/HW_test_multiconfig 3' }
  ];

  board = 'zynq-zc706-adv7511-fmcdaq2';
  constructor(private modalService: BsModalService) { }

  websiteList: any = ['HW_tests/HW_test_multiconfig', 'Test Harness', 'SQA']

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  
  form = new FormGroup({
    website: new FormControl('', Validators.required)
  });
  
  get f(){
    return this.form.controls;
  }
  
  submit(){
    console.log(this.form.value);
  }
 
  
  ngOnInit(): void {

  }

}
