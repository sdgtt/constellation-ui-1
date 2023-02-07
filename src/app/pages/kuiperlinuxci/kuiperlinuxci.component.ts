import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';

import { Projectboards } from 'src/app/models/projectboards.model';
import { Boards } from 'src/app/models/boards.model';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { BoardsService } from 'src/app/services/boards.service';


@Component({
  selector: 'app-kuiperlinuxci',
  templateUrl: './kuiperlinuxci.component.html',
  styleUrls: ['./kuiperlinuxci.component.scss'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})
export class KuiperlinuxciComponent implements OnInit {
  @Input() name: string;

  modalRef: BsModalRef;
  modalTempRef: BsModalRef;

  kuiperlinux ="Kuiper Linux CI is a CI for continuous testing of Kuiper Linux on hardware. It is automatically triggered once a new boot partition is built and uploaded to artifactory. This page shows the latest test results summary of Kuiper Linux test stages.";

  pboards: Projectboards;
  boards: Boards;
  board = 'zynq-zc706-adv7511-fmcdaq2';

  // Projectboards = [
  //   { jenkinsprojectname: 'HW_tests/HW_test_multiconfig 1', jenkinsbuildno: 1002, artifactorysourcebranch:'boot_partition_master',hdlcommit:'158c10df3',linuxcommit:'c3774bd67a17', onlineboards: 30},
  //   { jenkinsprojectname: 'HW_tests/HW_test_multiconfig 2', jenkinsbuildno: 1003, artifactorysourcebranch:'boot_partition_master',hdlcommit:'158df10ds3',linuxcommit:'dfswg342nfj2', onlineboards: 10},
  // ];
  
  Boards = [
    {jenkinsjobdate: '2022-08-15 23:45:31', boardname:'zynq-zc706-adv7511-fmcdaq2'},
    {jenkinsjobdate: '2023-08-15 23:45:31', boardname:'zynqmp-zcu102-rev10-adrv9002-rx2tx2-vcmos'},

  ];
  selectedLevel: any;
  data:Array<Object> = [
      {id: 0, name: "name1"},
      {id: 1, name: "name2"}
  ];

  selected(){
    alert(this.selectedLevel.name)
  }


  constructor(
    private modalService: BsModalService,
    private boardsService: BoardsService
  ) { }


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,{ class: 'gray modal-lg' });
  }

  
  ngOnInit(): void {
    this.boardsService.getBoards("zynqmp-zcu102-rev10-adrv9002-rx2tx2-vcmos").subscribe(data => {
      console.log(data);
      data['hits'].forEach((element: any) => {
        console.log(element['jenkins_project_name']);
      });
    });
  }


}
