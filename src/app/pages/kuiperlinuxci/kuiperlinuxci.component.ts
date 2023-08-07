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
  boardDetail: string;
  hash: any;
  AllboardDetail: any = [];

  data: any;

  linux_prompt_reached: boolean = true;
  uboot_reached: boolean = true;
  boardstatus: string;
  failreasonstatus: "Failure reason: ";
  nofailurestatus: "No failure encountered."
  onlineBoards: number;
  passingBoards: number;
  pstatus: any;
  bstatus: any;
  bdstatus: any;
  failresult: any;
  picon: any;
  bicon: any;
  bdicon: any;

  dmesg_errors_found: 0;
  dmesg_warnings_found: 0;
  drivers_enumerated: 0;
  drivers_missing: 0;
  last_failing_stage: 0;
  last_failing_stage_failure: any;
  matlab_errors: 0;
  matlab_failures: 0;
  matlab_skipped: 0;
  matlab_tests: 0;
  pytest_errors: 0;
  pytest_failures: 0;
  pytest_skipped: 0;
  pytest_tests: 0;
  currentLatestBuildNumber: number

  dataAggregates: any[];
  filteredDataAggregates: any[];

  imagePath = 'assets/'
  pstatusIcon = ['Online.png', 'Offline.png'];
  pstatusArrayToDisplay: string[] = [];
  // pstatusArrayToDisplay: string[] = ['Online', 'Offline'];
  bstatusIcon = ['Passed.png', 'Failed.png', 'Dmesg.png'];
  bstatusArrayToDisplay: string[] = ['Passed', 'Failed', 'Dmesg'];
  //'Online', 'Offline','Failed', 'Passed', 'Dmesg'

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


  fetchDataAggregates() {
    this.boardsService.getDataAggregates().subscribe((aggregatesTop: any[]) => {
      // Process or store the retrieved data aggregates as per your requirements
      this.dataAggregates = [];
      aggregatesTop.forEach(aggr => {
        var key = Object.keys(aggr)[0];
        this.dataAggregates.push(aggr[key]);

        this.dataAggregates.forEach((element: any) => {
          Boards.jenkins_project_name = (element['jenkins_project_name']);
          Boards.jenkins_build_number = (element['jenkins_build_number']);
          Boards.boot_folder_name = (element['boot_folder_name']);
          Boards.source_adjacency_matrix = (element['source_adjacency_matrix']);
          Boards.hdl_hash = (element['hdl_hash']);
          Boards.linux_hash = (element['linux_hash']);

          Boards.dmesg_errors_found = (element['dmesg_errors_found ']);
          Boards.dmesg_warnings_found = (element['dmesg_warnings_found ']);
          Boards.drivers_enumerated = (element['drivers_enumerated ']);
          Boards.drivers_missing = (element['drivers_missing ']);
          Boards.last_failing_stage = (element['last_failing_stage ']);
          Boards.last_failing_stage_failure = (element['last_failing_stage_failure ']);
          Boards.matlab_errors = (element['matlab_errors ']);
          Boards.matlab_failures = (element['matlab_failures ']);
          Boards.matlab_skipped = (element['matlab_skipped ']);
          Boards.matlab_tests = (element['matlab_tests ']);
          Boards.pytest_errors = (element['pytest_errors ']);
          Boards.pytest_failures = (element['pytest_failures ']);
          Boards.pytest_skipped = (element['pytest_skipped ']);
          Boards.pytest_tests = (element['pytest_tests ']);



          this.jenkins_project_name = Boards.jenkins_project_name;
          this.jenkins_build_number = Boards.jenkins_build_number;
          this.hdl_hash = this.removeNextText(Boards.hdl_hash);
          this.linux_hash = this.removeNextText(Boards.linux_hash);
          this.source_adjacency_matrix = Boards.source_adjacency_matrix;
          this.boot_folder_name = Boards.boot_folder_name;
          this.linux_prompt_reached = Boards.linux_prompt_reached;
          this.uboot_reached = Boards.uboot_reached;

          this.dmesg_errors_found = Boards.dmesg_errors_found;
          this.dmesg_warnings_found = Boards.dmesg_warnings_found;
          this.drivers_enumerated = Boards.drivers_enumerated;
          this.drivers_missing = Boards.drivers_missing;
          this.last_failing_stage = Boards.last_failing_stage;
          this.last_failing_stage_failure = Boards.last_failing_stage_failure;
          this.matlab_errors = Boards.matlab_errors;
          this.matlab_failures = Boards.matlab_failures;
          this.matlab_skipped = Boards.matlab_skipped;
          this.matlab_tests = Boards.matlab_tests;
          this.pytest_errors = Boards.pytest_errors;
          this.pytest_failures = Boards.pytest_failures;
          this.pytest_skipped = Boards.pytest_skipped;
          this.pytest_tests = Boards.pytest_tests;

          this.isBoardOnline();

        })

        this.getLatestBuild();

        // this.getFirstBoardDetail();


        // console.log('u and l' , this.uboot_reached , this.linux_prompt_reached);
        // console.log(onlineCount.length)
        this.isBoardOnline();
      });

      // this.getBoardStatus();
      console.log('boot_folder_name: ' + this.boot_folder_name + '\n Status: ' +  this.bstatus, this.bdstatus + '\n  result: ' +
        this.picon, this.bicon);

      // console.log('Total Online Boards: ', onlineCount); // Log the total count of online boards

    });

  }
  getLatestBuild() {
    const latestBuildNumbersMap = new Map<string, number>();
    const currentLatestBuildNumber = latestBuildNumbersMap.get(this.jenkins_project_name) ?? 0;

    if (this.jenkins_build_number > currentLatestBuildNumber) {
      latestBuildNumbersMap.set(this.jenkins_project_name, this.jenkins_build_number);
    }
    console.log("Latest Jenkins Build Numbers:", latestBuildNumbersMap);
  }
  isBoardOnline() {
    let onlineCount = 0;
    
      if(this.uboot_reached && this.linux_prompt_reached === true) {
        this.pstatusArrayToDisplay = ['Online'];
        this.picon = this.imagePath + this.pstatusIcon[0];
        onlineCount++; // Increment the count when the board is online
      }
      else{
        this.pstatusArrayToDisplay = ['Offline'];
        this.picon = this.imagePath + this.pstatusIcon[1];
      }

      this.onlineBoards = onlineCount;
      console.log('uboot ', this.uboot_reached, 'linux', this.linux_prompt_reached, 'status: ', this.pstatus, 'icon: ', this.picon);
      return this.boot_folder_name, this.picon + this.pstatus;
    
    
  }
  // getBoardStatus() {
  //   let passedCount = 0;
  //   this.dataAggregates.forEach(e =>{
  //     this.boot_folder_name = (e[0].boot_folder_name);
  //   })

  //   if(this.boot_folder_name){
  //     if (this.dmesg_errors_found && this.dmesg_warnings_found  == 0 ) {
  //         this.bstatus = this.bstatusArrayToDisplay[0];
  //         this.bicon = this.imagePath + this.bstatusIcon[0];
  //         passedCount++;  // Increment the count when the board is passed

  //     }
  //     else if (this.drivers_enumerated || this.drivers_missing || this.matlab_errors || this.matlab_failures || this.matlab_skipped
  //       || this.matlab_tests || this.pytest_errors || this.pytest_failures || this.pytest_skipped
  //       || this.pytest_tests != 0) {

  //         if (this.dmesg_errors_found || this.dmesg_warnings_found != 0) {
  //           this.bicon = this.imagePath + this.bstatusIcon[1];
  //           this.bdicon = this.imagePath +  this.bstatusIcon[2];
  //           this.bstatus = this.bstatusArrayToDisplay[1];
  //           this.bdstatus = this.bstatusArrayToDisplay[2];

  //         }
  //         else{
  //           this.bstatus = 'Failed';
  //           this.bicon = this.imagePath + this.bstatusIcon[1];
  //         }
  //         this.bstatus = this.bstatusArrayToDisplay[1];
  //         this.bicon = this.imagePath + this.bstatusIcon[1];
  //     }
  //     this.passingBoards = passedCount;
  //     return this.bstatus, this.bicon, this.bdicon;
  //   }
  //   console.log('uboot ', this.uboot_reached, 'linux', this.linux_prompt_reached, 'status: ', this.bstatus, this.bdstatus, 'icon: ', this.bicon, this.bdicon);



  // }
  // fetchFromHits() {
  //   this.boardsService.getAll("HW_Test/HW_Test_multiconfig").subscribe(data => {
  //     this.AllboardDetail = data;
  //     data['hits'].forEach((element: any) => {

  //       Boards.jenkins_project_name = (element['jenkins_project_name']);
  //       this.jenkins_project_name = Boards.jenkins_project_name;
  //       Boards.boot_folder_name = (element['boot_folder_name']);
  //       this.boot_folder_name.push(Boards.boot_folder_name);
  //       Boards.jenkins_build_number = (element['jenkins_build_number']);
  //       this.jenkins_build_number = (Boards.jenkins_build_number);
  //     });
  //     console.log("Board: " + Boards.jenkins_project_name +
  //       "\n Boot_folder_name: " + this.boot_folder_name
  //       + "\n build no: " + this.jenkins_build_number);
  //   })
  // }
  fetchFromHits() {
    //   this.boardsService.getAll("HW_Test/HW_Test_multiconfig").subscribe(data => {
    //     this.AllboardDetail = data;
    //     data['hits'].forEach((element: any) => {

    //       Boards.jenkins_project_name = (element['jenkins_project_name']);
    //       this.jenkins_project_name = Boards.jenkins_project_name;
    //       Boards.boot_folder_name = (element['boot_folder_name']);
    //       this.boot_folder_name.push(Boards.boot_folder_name);
    //       Boards.jenkins_build_number = (element['jenkins_build_number']);
    //       this.jenkins_build_number = (Boards.jenkins_build_number);
    //     });
    //     console.log("Board: " + Boards.jenkins_project_name +
    //       "\n Boot_folder_name: " + this.boot_folder_name
    //       + "\n build no: " + this.jenkins_build_number);
    //   })
    // }
  }
}
