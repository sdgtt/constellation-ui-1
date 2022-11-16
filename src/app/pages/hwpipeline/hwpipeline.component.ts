import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';


@Component({
  selector: 'app-hwpipeline',
  templateUrl: './hwpipeline.component.html',
  styleUrls: ['./hwpipeline.component.scss']
})
export class HwpipelineComponent implements OnInit {
  modalRef?: BsModalRef;
  hwpipeline ="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex eacommodo consequat.";
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
