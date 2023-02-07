import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';


import { Projectboards } from 'src/app/models/projectboards.model';
import { Boards } from 'src/app/models/boards.model';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';


@Component({
  selector: 'app-kuiperlinuxci',
  templateUrl: './kuiperlinuxci.component.html',
  styleUrls: ['./kuiperlinuxci.component.scss'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})
export class KuiperlinuxciComponent implements OnInit {
  modalRef: BsModalRef;
  modalTempRef: BsModalRef;

  kuiperlinux ="Kuiper Linux CI is a CI for continuous testing of Kuiper Linux on hardware. It is automatically triggered once a new boot partition is built and uploaded to artifactory. This page shows the latest test results summary of Kuiper Linux test stages.";

  pboards: Projectboards;
  boards: Boards;
  
  Projectboards = [
    { jenkinsprojectname: 'HW_tests/HW_test_multiconfig 1', jenkinsbuildno: 1002, artifactorysourcebranch:'boot_partition_master',hdlcommit:'158c10df3',linuxcommit:'c3774bd67a17', onlineboards: 30},
    { jenkinsprojectname: 'HW_tests/HW_test_multiconfig 2', jenkinsbuildno: 1003, artifactorysourcebranch:'boot_partition_master',hdlcommit:'158df10ds3',linuxcommit:'dfswg342nfj2', onlineboards: 10},
  ];
  
  Boards = [
    {jenkinsjobdate: '2022-08-15 23:45:31', boardname:'zynq-zc706-adv7511-fmcdaq2'},
    {jenkinsjobdate: '2023-08-15 23:45:31', boardname:'zynqmp-zcu102-rev10-adrv9002-rx2tx2-vcmos'},

  ];
  val: string;

  changeFn(val: string) {
      console.log("Dropdown selection:", val);
  }
  selectedCar: number;

  cars = [
      { id: 1, name: 'Volvo' },
      { id: 2, name: 'Saab' },
      { id: 3, name: 'Opel' },
      { id: 4, name: 'Audi' },
  ];
  // jenkinsProjectName = 'HW_tests/HW_test_multiconfig 1';
  board = 'zynq-zc706-adv7511-fmcdaq2';
  constructor(private modalService: BsModalService) { }

  // jenkinsprojectNames: any = ['HW_tests/HW_test_multiconfig', 'Test Harness', 'SQA']

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,{ class: 'gray modal-lg' });
  }
  // openContact(template: TemplateRef<any>) {
  //   this.modalTempRef = this.modalService.show(template, { class: 'gray modal-sm' });
  // }
  
  ngOnInit(): void {

  }


}
