import { Component, Input, OnInit, TemplateRef, Pipe, PipeTransform } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';


//models
import { Boards } from 'src/app/models/boards.model';

//services
import { BoardsService } from 'src/app/services/boards.service';
import { elementAt } from 'rxjs';
import { on } from 'events';

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
  [x: string]: any;
  modalRef: BsModalRef;
  modalTempRef: BsModalRef;

  kuiperlinux = "Kuiper Linux CI is a CI for continuous testing of Kuiper Linux on hardware. It is automatically triggered once a new boot partition is built and uploaded to artifactory. This page shows the latest test results summary of Kuiper Linux test stages.";
  sampleboard = 'sample';

  boards: Boards;
  jenkins_project_name: any;
  source_adjacency_matrix: any;
  hdl_hash: any;
  linux_hash: any;
  jenkins_build_number: number;
  boot_folder_name: any = [];
  jenkins_job_date: Date;
  hash: any;

  linux_prompt_reached: boolean = true;
  uboot_reached: boolean = true;

  dmesg_errors_found: any;
  dmesg_warnings_found: any;
  drivers_enumerated: any;
  drivers_missing: any;
  last_failing_stage: any;
  last_failing_stage_failure: any;
  matlab_errors: any;
  matlab_failures: any;
  matlab_skipped: any;
  matlab_tests: any;
  pytest_errors: any;
  pytest_failures: any;
  pytest_skipped: any;
  pytest_tests: any;
  currentLatestBuildNumber: number;

  dataAggregates: any[] = [];
  latestData: any = {};

  imagePath = 'assets/'
  pstatusIcon = ['Online.png', 'Offline.png'];
  bstatusIcon = ['Passed.png', 'nebula_error.png', 'linux_dmesg_errors.png', 'pytest_failure.png'];
  latestBootFolders: string[] = [];
  sortOrder: 'asc' | 'desc' = 'desc'; // Initialize the sorting order

  latestBoards: any[] = [];
  onlineStat: any;
  passStat: any;
  boardstatus: string;
  onlineBoards: number = 0;
  passingBoards: number;
  result: any;
  failreasonstatus: any;



  constructor(
    private modalService: BsModalService,
    private boardsService: BoardsService,
    private datePipe: DatePipe,
  ) { }



  ngOnInit(): void {
    // this.fetchFromHits();
    //this.fetchBoardDetails();
    this.fetchDataAggregates();

  }
  removeNextText(h: string): string {
    this.hash = h.split(' ');
    if (this.hash.length > 0) {
      var firstText = this.hash[0];
      return firstText;
    }
    else {
      return '';
    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'gray modal-lg' });
  }


  // fetchDataAggregates() {
  //   this.boardsService.getDataAggregates().subscribe((aggregatesTop: any[]) => {
  //     // Process or store the retrieved data aggregates as per your requirements
  //     this.dataAggregates = [];
  //     aggregatesTop.forEach(aggr => {
  //       var key = Object.keys(aggr)[0];
  //       this.dataAggregates.push(aggr[key]);


  //       this.dataAggregates.forEach((element: any) => {
  //         Boards.jenkins_project_name = (element['jenkins_project_name']);
  //         Boards.jenkins_build_number = (element['jenkins_build_number']);
  //         Boards.boot_folder_name = (element['boot_folder_name']);
  //         Boards.source_adjacency_matrix = (element['source_adjacency_matrix']);
  //         Boards.hdl_hash = (element['hdl_hash']);
  //         Boards.linux_hash = (element['linux_hash']);

  //         Boards.dmesg_errors_found = (element['dmesg_errors_found']);
  //         Boards.dmesg_warnings_found = (element['dmesg_warnings_found']);
  //         Boards.drivers_enumerated = (element['drivers_enumerated']);
  //         Boards.drivers_missing = (element['drivers_missing']);
  //         Boards.last_failing_stage = (element['last_failing_stage']);
  //         Boards.last_failing_stage_failure = (element['last_failing_stage_failure']);
  //         Boards.matlab_errors = (element['matlab_errors']);
  //         Boards.matlab_failures = (element['matlab_failures']);
  //         Boards.matlab_skipped = (element['matlab_skipped']);
  //         Boards.matlab_tests = (element['matlab_tests']);
  //         Boards.pytest_errors = (element['pytest_errors ']);
  //         Boards.pytest_failures = (element['pytest_failures ']);
  //         Boards.pytest_skipped = (element['pytest_skipped']);
  //         Boards.pytest_tests = (element['pytest_tests']);

  //         this.jenkins_project_name = Boards.jenkins_project_name;
  //         this.jenkins_build_number = Boards.jenkins_build_number;
  //         this.hdl_hash = this.removeNextText(Boards.hdl_hash);
  //         this.linux_hash = this.removeNextText(Boards.linux_hash);
  //         this.source_adjacency_matrix = Boards.source_adjacency_matrix;
  //         this.boot_folder_name = Boards.boot_folder_name;
  //         this.linux_prompt_reached = Boards.linux_prompt_reached;
  //         this.uboot_reached = Boards.uboot_reached;

  //         this.dmesg_errors_found = Boards.dmesg_errors_found;
  //         this.dmesg_warnings_found = Boards.dmesg_warnings_found;
  //         this.drivers_enumerated = Boards.drivers_enumerated;
  //         this.drivers_missing = Boards.drivers_missing;
  //         this.last_failing_stage = Boards.last_failing_stage;
  //         this.last_failing_stage_failure = Boards.last_failing_stage_failure;
  //         this.matlab_errors = Boards.matlab_errors;
  //         this.matlab_failures = Boards.matlab_failures;
  //         this.matlab_skipped = Boards.matlab_skipped;
  //         this.matlab_tests = Boards.matlab_tests;
  //         this.pytest_errors = Boards.pytest_errors;
  //         this.pytest_failures = Boards.pytest_failures;
  //         this.pytest_skipped = Boards.pytest_skipped;
  //         this.pytest_tests = Boards.pytest_tests;

  //       })

  //     });

  //     // console.log('boot_folder_name: ' + this.boot_folder_name + '\n Status: ' +  this.bstatus, this.bdstatus + '\n  result: ' +
  //     //   this.picon, this.bicon);

  //     // console.log('Total Online Boards: ', onlineCount); // Log the total count of online boards

  //   });

  // }
  sortDataAggregates() {
    this.dataAggregates.sort((a, b) => {
      const dateA = new Date(a.jenkins_job_date).getTime();
      const dateB = new Date(b.jenkins_job_date).getTime();
      const sortOrderMultiplier = this.sortOrder === 'asc' ? 1 : -1;
      return sortOrderMultiplier * (dateB - dateA);
    });
  }
  toggleSortOrder() {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.sortDataAggregates();
  }
  isBoardOnline(bd: any): { status: string, icon: string } {

    if (bd.uboot_reached && bd.linux_prompt_reached) {
      // this.onlineBoards++;
      this.onlineStat = "Online"
      console.log('icon', this.imagePath + this.pstatusIcon[0], this.onlineBoards);
      return { status: 'Online', icon: this.imagePath + this.pstatusIcon[0] };
    }
    if (!bd.uboot_reached && bd.linux_prompt_reached) {
      this.onlineStat = "Offline - uboot not reached";
      console.log('icon', this.imagePath + this.pstatusIcon[1]);
      return { status: 'Offline', icon: this.imagePath + this.pstatusIcon[1] };
    }
    if (bd.uboot_reached && !bd.linux_prompt_reached) {
      this.onlineStat = "Offline - linux prompt not reached";
      console.log('icon', this.imagePath + this.pstatusIcon[1]);
      return { status: 'Offline', icon: this.imagePath + this.pstatusIcon[1] };
    }
    else{
      return { status: 'Offline', icon: this.imagePath + this.pstatusIcon[1] };
    }
  }

  isBoardPassed(bd: any): { status: string, icon: string } {
    // bstatusIcon = ['Passed.png', 'nebula_error.png', 'linux_dmesg_errors.png', 'pytest_failure.png'];

    // if (this.isBoardOnline(bd).status == 'Online') {
      // if(bd.boot_folder_name == 'Pluto'){
      //   if (
      //     bd.drivers_enumerated == 0 &&
      //     bd.drivers_missing == 0 &&
      //     bd.matlab_errors == 0 &&
      //     bd.matlab_failures == 0 &&
      //     bd.matlab_skipped == 0 &&
      //     bd.matlab_tests == 0 &&
      //     bd.pytest_errors == 0 &&
      //     bd.pytest_failures == 0 &&
      //     bd.pytest_skipped == 0 &&
      //     bd.pytest_tests == 0 &&
      //     bd.dmesg_errors_found == 0 &&
      //     bd.dmesg_warnings_found == 0
      //   ) {
      //     console.log('board ', bd.boot_folder_name, 'icon', this.imagePath + this.bstatusIcon[0]);
      //     this.result = "Pass";
      //     this.failreasonstatus = "No errors encountered";
      //     return { status:  this.failreasonstatus, icon: this.imagePath + this.bstatusIcon[0] };
      //   }
      //   if (bd.dmesg_errors_found != "0") {
      //     console.log('icon', this.imagePath + this.bstatusIcon[2]);
      //     this.result = "Fail";
      //     this.failreasonstatus = "linux dmesg errors " + bd.dmesg_errors_found;
      //     return { status:  this.failreasonstatus, icon: this.imagePath + this.bstatusIcon[2] };
      //   }
      //   if (bd.drivers_missing != "0") {
      //     this.result = "Fail";
      //     this.failreasonstatus = "linux drivers missing " + bd.drivers_missing;
      //     console.log('icon', this.imagePath + this.bstatusIcon[2]);
      //     return { status:  this.failreasonstatus, icon: this.imagePath + this.bstatusIcon[2] };
      //   }
      //   if (!bd.linux_prompt_reached) {
      //     this.result = "Fail";
      //     this.failreasonstatus = [];
      //     this.failreasonstatus = "Linux prompt not reached";
      //     console.log('icon', this.imagePath + this.bstatusIcon[2]);
      //     return { status: this.failreasonstatus, icon: this.imagePath + this.bstatusIcon[2] };
      //   }
      //   if (!bd.uboot_reached) {
      //     this.result = "Fail";
      //     this.failreasonstatus = "u-boot not reached";
      //     console.log('icon', this.imagePath + this.bstatusIcon[1]);
      //     return { status:  this.failreasonstatus, icon: this.imagePath + this.bstatusIcon[1] };
      //   }
      //   if (bd.last_failing_stage_failure != "NA") {
      //     this.result = "Fail";
      //     this.failreasonstatus = [];
      //     this.failreasonstatus = 'Stage Failure: '+ bd.last_failing_stage_failure;
      //     console.log('icon', this.imagePath + this.bstatusIcon[1]);
      //     return { status:  this.failreasonstatus, icon: this.imagePath + this.bstatusIcon[1] };
      //   }
      // }
      if (bd.linux_prompt_reached == true &&
        bd.uboot_reached == true &&
        bd.drivers_enumerated == 0 &&
        bd.drivers_missing == 0 &&
        bd.matlab_errors == 0 &&
        bd.matlab_failures == 0 &&
        bd.matlab_skipped == 0 &&
        bd.matlab_tests == 0 &&
        bd.pytest_errors == 0 &&
        bd.pytest_failures == 0 &&
        bd.pytest_skipped == 0 &&
        bd.pytest_tests == 0 &&
        bd.dmesg_errors_found == 0 &&
        bd.dmesg_warnings_found == 0
      ) {
        console.log('board ', bd.boot_folder_name, 'icon', this.imagePath + this.bstatusIcon[0]);
        this.result = "Pass";
        this.failreasonstatus = "No errors encountered";
        return { status:  this.failreasonstatus, icon: this.imagePath + this.bstatusIcon[0] };
      }
      if (bd.pytest_failures != "0") {
        console.log('icon', this.imagePath + this.bstatusIcon[3]);
        this.result = "Fail";
        this.failreasonstatus = "pytest failure " + bd.pytest_failures;
        return { status:  this.failreasonstatus, icon: this.imagePath + this.bstatusIcon[3] };
      }
      if (bd.pytest_tests != "0") {
        console.log('icon', this.imagePath + this.bstatusIcon[3]);
        this.result = "Fail";
        this.failreasonstatus = "pytest errors " + (bd.pytest_tests);
        return { status:  this.failreasonstatus, icon: this.imagePath + this.bstatusIcon[3] };
      }
      if (bd.dmesg_errors_found != "0") {
        console.log('icon', this.imagePath + this.bstatusIcon[2]);
        this.result = "Fail";
        this.failreasonstatus = "linux dmesg errors " + bd.dmesg_errors_found;
        return { status:  this.failreasonstatus, icon: this.imagePath + this.bstatusIcon[2] };
      }
      if (bd.drivers_missing != "0") {
        this.result = "Fail";
        this.failreasonstatus = "linux drivers missing " + bd.drivers_missing;
        console.log('icon', this.imagePath + this.bstatusIcon[2]);
        return { status:  this.failreasonstatus, icon: this.imagePath + this.bstatusIcon[2] };
      }
      if (!bd.linux_prompt_reached) {
        this.result = "Fail";
        this.failreasonstatus = [];
        this.failreasonstatus = "Linux prompt not reached";
        console.log('icon', this.imagePath + this.bstatusIcon[2]);
        return { status: this.failreasonstatus, icon: " " };
      }
      if (!bd.uboot_reached) {
        this.result = "Fail";
        this.failreasonstatus = "u-boot not reached";
        console.log('icon', this.imagePath + this.bstatusIcon[1]);
        return { status:  this.failreasonstatus, icon: " " };
      }
      if (bd.last_failing_stage_failure != "NA") {
        this.result = "Fail";
        this.failreasonstatus = [];
        this.failreasonstatus = bd.last_failing_stage_failure;
        console.log('icon', this.imagePath + this.bstatusIcon[1]);
        return { status:  this.failreasonstatus, icon: this.imagePath + this.bstatusIcon[1] };
      }

    // }



    console.log('board ', bd.boot_folder_name, 'icon', this.imagePath + this.bstatusIcon[1]);
    return { status: '', icon: this.imagePath + this.bstatusIcon };

  }
  fetchDataAggregates() {
    this.boardsService.getDataAggregates().subscribe((aggregatesTop: any[]) => {
      this.dataAggregates = aggregatesTop.map(aggr => aggr[Object.keys(aggr)[0]]);


      // Group data by boot_folder_name and find the latest jenkins_build_number for each group
      //  const boardGroups: { [bootFolderName: string]: any } = {}; // Replace `any` with the appropriate type
      //  this.dataAggregates.forEach(bd => {
      //    if (!boardGroups[bd.boot_folder_name] || bd.jenkins_build_number > boardGroups[bd.boot_folder_name].jenkins_build_number) {
      //      boardGroups[bd.boot_folder_name] = bd;
      //    }
      //   });
      //   this.latestBoards = Object.values(boardGroups);

      const latest = this.dataAggregates.reduce((latestData, bd) => {
        if (!latestData.jenkins_job_date || bd.jenkins_job_date > latestData.jenkins_job_date) {
          latestData.jenkins_job_date = bd.jenkins_job_date;
          latestData.jenkins_project_name = bd.jenkins_project_name;
          latestData.boot_folder_name = bd.boot_folder_name;
          latestData.jenkins_build_number = bd.jenkins_build_number;
          latestData.source_adjacency_matrix = bd.source_adjacency_matrix;
          latestData.hdl_hash = this.removeNextText(bd.hdl_hash);
          latestData.linux_hash = this.removeNextText(bd.linux_hash);
        }
        return latestData;
      }, {} as any);

      this.latestData = latest;
    });

  }



}
