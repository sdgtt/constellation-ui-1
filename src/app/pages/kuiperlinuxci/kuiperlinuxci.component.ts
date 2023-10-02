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

  dmesg_errors_found: number;
  dmesg_warnings_found: number;
  drivers_enumerated: number;
  drivers_missing: number;
  last_failing_stage: any;
  last_failing_stage_failure: any;
  matlab_errors: number;
  matlab_failures: number;
  matlab_skipped: number;
  matlab_tests: number;
  pytest_errors: number;
  pytest_failures: number;
  pytest_skipped: number;
  pytest_tests: number;
  currentLatestBuildNumber: number;

  dataAggregates: any[] = [];
  latestData: any = {};
  boardDetail: any[];

  imagePath = 'assets/'
  pstatusIcon = ['Online.png', 'Offline.png'];
  bstatusIcon = ['Passed.png', 'nebula.svg', 'linux.svg', 'python.svg'];
  latestBootFolders: string[] = [];
  sortOrder: 'asc' | 'desc' = 'desc'; // Initialize the sorting order

  latestBoards: any[] = [];

  passingBoardsCount: number = 0;
  onlineBoardsCount: number = 0;

  statusMessages: string[] = [];
  status: string[] = [];  
  icon: string[] = []; 

  latestBoardData: any;
  constructor(
    private modalService: BsModalService,
    private boardsService: BoardsService,
    private datePipe: DatePipe,
  ) { }

  ngOnInit(): void {
    this.fetchDataAggregates();
  }
  fetchDataAggregates() {
    this.boardsService.getDataAggregates().subscribe((aggregatesTop: any[]) => {
      this.dataAggregates = aggregatesTop.map(aggr => aggr[Object.keys(aggr)[0]]);
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
      this.onlineBoardsCount = this.countOnlineBoards(this.dataAggregates);
      this.passingBoardsCount = this.countPassingBoards(this.dataAggregates);

      console.log(this.passingBoardsCount);

    });

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
      return {
        status: 'Online',
        icon: this.imagePath + this.pstatusIcon[0]
      };
    }
    else {
      return {
        status: 'Offline',
        icon: this.imagePath + this.pstatusIcon[1]
      };
    }

  }
  isBoardPassed(bd: any): void {
    const statusMessages: string[] = [];
    const status: string[] = [];
    const icon: string[] = [];
  
    // if (boardOnline.status == 'Online') {
      if (bd.drivers_enumerated != 0 &&
        bd.dmesg_errors_found == 0 &&
        bd.drivers_missing == 0 &&
        bd.pytest_errors == 0 &&
        bd.pytest_failures == 0) {
        statusMessages.push(`No errors encountered`);
        status.push(`pass`);
        icon.push(this.imagePath + this.bstatusIcon[0]); // Push icon to the array
      }
      else if (bd.drivers_enumerated == 0) {
        statusMessages.push(`Linux dmesg error(drivers enumerated): ${bd.drivers_enumerated}`);
        status.push(`linux`);
        icon.push(this.imagePath + this.bstatusIcon[2]);
      } else if (bd.drivers_missing != 0) {
        statusMessages.push(`Linux dmesg errors(drivers missing): ${bd.drivers_missing}`);
        status.push(`linux`);
        icon.push(this.imagePath + this.bstatusIcon[2]);
      } else if (bd.dmesg_errors_found != 0) {
        statusMessages.push(`Linux dmesg errors: ${bd.dmesg_errors_found}`);
        status.push(`linux`);
        icon.push(this.imagePath + this.bstatusIcon[2]);
      } if (bd.pytest_errors != 0) {
        statusMessages.push(`Pytest errors: ${bd.pytest_errors}`);
        status.push(`pytest`);
        icon.push(this.imagePath + this.bstatusIcon[3]);
      } else if (bd.pytest_failures != 0) {
        statusMessages.push(`Pytest failures: ${bd.pytest_failures}`);
        status.push(`pytest`);
        icon.push(this.imagePath + this.bstatusIcon[3]);
      }
      else if (bd.last_failing_stage_failure != "NA") {
        statusMessages.push(`Failing stage: ${bd.last_failing_stage_failure}`);
        status.push(`nebula`);
        icon.push(this.imagePath + this.bstatusIcon[1]);
      }
      // }
  // if (boardOnline.status == 'Offline') {
    if (!bd.linux_prompt_reached) {
      statusMessages.push(`Linux prompt not reached`);
      status.push(`nebula`);
      //this.icon = this.imagePath + this.bstatusIcon[1];
    }
    else if (!bd.uboot_reached) {
      statusMessages.push(`U-boot prompt not reached`);
      status.push(`nebula`);
      //this.icon = this.imagePath + this.bstatusIcon[1];
    }    
    if (status.length == 1 && icon.length == 1 && statusMessages.length == 1) {
      this.statusMessages = statusMessages;
      this.status = status;
      this.icon = icon;
      console.log(1,bd.boot_folder_name, this.statusMessages, this.icon, this.status);
    }
    else if (status.length >= 2 && icon.length >= 2 && this.statusMessages.length >= 2) {
      this.statusMessages = [statusMessages.join('\n ')];
      this.icon = [this.icon.join(', ')]; // Join icons with a comma if there are two or more
      this.status = [this.status.join(', ')]; // Join icons with a comma if there are two or more
      console.log(2, bd.boot_folder_name, this.statusMessages, this.icon, this.status);
  }
  bd.status = status;
  
  }
  countPassingBoards(dataAggregates: any[]): number {
    let passingBoards = 0;
  
    for (const bd of dataAggregates) {
      this.isBoardPassed(bd); // Call isBoardPassed to calculate the board's status
  
      // Check if the status array contains 'pass'
      if (bd.status && bd.status.includes('pass')) {
        passingBoards++;
      }
    }
  
    return passingBoards;
  }
  countOnlineBoards(dataAggregates: any[]): number {

    for (const bd of dataAggregates) {
      const boardOnline = this.isBoardOnline(bd);

      if (boardOnline.status == 'Online') {
        this.onlineBoardsCount++;
      }
    }
    return this.onlineBoardsCount++;
  }
}
