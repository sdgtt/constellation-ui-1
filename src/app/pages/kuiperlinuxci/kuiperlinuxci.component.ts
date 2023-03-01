import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';

//models
import { Boards } from 'src/app/models/boards.model';

//services
import { BoardsService } from 'src/app/services/boards.service';
import { toArray } from 'rxjs';


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

  boards: Boards;
  jenkins_project_name: any;
  boot_folder_name: any = [];
  sampleboard = 'sample';

  constructor(
    private modalService: BsModalService,
    private boardsService: BoardsService
  ) { }


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,{ class: 'gray modal-lg' });
  }

  JenkinProjectDetails() {
    this.boardsService.getBootFolder("HW_tests/HW_test_multiconfig").subscribe(data => {
      console.log(data);
      data['hits'].forEach((element: any) => {
        console.log(element['jenkins_project_name']);
        Boards.jenkins_project_name = (element['jenkins_project_name']);

      });
    });
  }

  ngOnInit(): void {
    //add loading
    this.boardsService.getAll("HW_tests/HW_test_multiconfig").subscribe(data => {
      data['hits'].forEach((element: any) => {
        Boards.jenkins_project_name = (element['jenkins_project_name']);
      this.jenkins_project_name = Boards.jenkins_project_name;  
        Boards.boot_folder_name = (element['boot_folder_name']);
        this.boot_folder_name.push(Boards.boot_folder_name);
      });
            // add loading = false end
    });
  }


}
