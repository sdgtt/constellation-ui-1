import { Component, Input, OnInit, TemplateRef, Pipe, PipeTransform } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { DatePipe } from '@angular/common';


//models
import { Boards } from 'src/app/models/boards.model';

//services
import { BoardsService } from 'src/app/services/boards.service';
import { elementAt } from 'rxjs';


@Component({
  selector: 'app-kuiperlinuxci',
  templateUrl: './kuiperlinuxci.component.html',
  styleUrls: ['./kuiperlinuxci.component.scss'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})
// @Pipe({
//   name: 'trim'
// })
export class KuiperlinuxciComponent implements OnInit {
  modalRef: BsModalRef;
  modalTempRef: BsModalRef;

  kuiperlinux = "Kuiper Linux CI is a CI for continuous testing of Kuiper Linux on hardware. It is automatically triggered once a new boot partition is built and uploaded to artifactory. This page shows the latest test results summary of Kuiper Linux test stages.";

  boards: Boards;
  jenkins_project_name: any;
  source_adjacency_matrix: any;
  hdl_hash: any;
  linux_hash: any;
  jenkins_build_number: any;
  boot_folder_name: any = [];
  jenkins_job_date: any = [];
  sampleboard = 'sample';
  boardDetail: any = [];

  status: any;

particlesJS: any;

  constructor(
    private modalService: BsModalService,
    private boardsService: BoardsService,
    private datePipe: DatePipe
  ) { }


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'gray modal-lg' });
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
      this.boardDetail = data;
      data['hits'].forEach((element: any) => {
        Boards.jenkins_project_name = (element['jenkins_project_name']);
        this.jenkins_project_name = Boards.jenkins_project_name;
        Boards.source_adjacency_matrix = (element['source_adjacency_matrix']);
        this.source_adjacency_matrix = Boards.source_adjacency_matrix;
        Boards.hdl_hash = (element['hdl_hash']);
        this.hdl_hash = Boards.hdl_hash;
        Boards.jenkins_build_number = (element['jenkins_build_number']);
        this.jenkins_build_number = Boards.jenkins_build_number;
      }
      )

    });


    // this.boardsService.getAll("HW_tests/HW_test_multiconfig").subscribe(data => {
    //   data['hits'].forEach((element: any) => {
    //     Boards.jenkins_project_name = (element['jenkins_project_name']);
    //     this.jenkins_project_name = Boards.jenkins_project_name;
    //     Boards.source_adjacency_matrix = (element['source_adjacency_matrix']);
    //     this.source_adjacency_matrix = Boards.source_adjacency_matrix;
    //     Boards.boot_folder_name = (element['boot_folder_name']);
    //     this.boot_folder_name.push(Boards.boot_folder_name);
    //     Boards.jenkins_job_date = (element['jenkins_job_date']);
    //     this.jenkins_job_date.push(Boards.jenkins_job_date);
    //     // this.jenkins_job_date = this.datePipe.transform(this.jenkins_job_date, 'y - MM - d h:mm:ss a' )

    //   });
    //   // add loading = false end
    // });
   

  }
}
