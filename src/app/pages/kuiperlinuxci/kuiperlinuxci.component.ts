import { Component, OnInit, } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { Router } from '@angular/router';

//models
import { Boards } from 'src/app/models/boards.model';

//services
import { BoardsService } from 'src/app/services/boards.service';


@Component({
  selector: 'app-kuiperlinuxci',
  templateUrl: './kuiperlinuxci.component.html',
  styleUrls: ['./kuiperlinuxci.component.scss'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})

export class KuiperlinuxciComponent implements OnInit {

  modalRef: BsModalRef;
  modalTempRef: BsModalRef;

  kuiperlinuxci = "Kuiper Linux CI is a CI for continuous testing of Kuiper Linux on hardware. It is automatically triggered once a new boot partition is built and uploaded to artifactory. This page shows the latest test results summary of Kuiper Linux test stages.";

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
  pstatusIcon: string[] = ['assets/Online.png', 'assets/Offline.png'];
  bstatusIcon: string[] = ['assets/Passed.png', 'assets/nebula.svg', 'assets/linux.svg', 'assets/python.svg'];
  latestBootFolders: string[] = [];
  sortOrder: 'asc' | 'desc' = 'desc'; // Initialize the sorting order

  latestBoards: any[] = [];

  passingBoardsCount: number = 0;
  onlineBoardsCount: number = 0;
  linuxBoardsCount: number = 0;
  pytestBoardsCount: number = 0;

  statusMessages: string[] = [];
  status: string[] = [];
  icon: string[] = [];

  latestBoardData: any;
  constructor(
    private boardsService: BoardsService,
    private router: Router,
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
      this.linuxBoardsCount = this.countLinuxErrors(this.dataAggregates);
      this.pytestBoardsCount = this.countPytestErrors(this.dataAggregates);
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
        status: `Online`,
        icon: this.pstatusIcon[0]
      };
    }
    else {
      return {
        status: `Offline`,
        icon: this.pstatusIcon[1]
      };
    }

  }

  isBoardPassed(bd: any): string[] {

    const statusMessages: string[] = [];
    const status: string[] = [];
    const icon: string[] = [];

    if (bd.drivers_enumerated != 0 &&
      bd.dmesg_errors_found == 0 &&
      bd.drivers_missing == 0 &&
      bd.pytest_errors == 0 &&
      bd.pytest_failures == 0) {
      statusMessages.push(`No errors encountered`);
      status.push(`pass`);
      icon.push(this.bstatusIcon[0]); // Push icon to the array
    }

    if (bd.drivers_enumerated == 0) {
      statusMessages.push(`Drivers enumerated: ${bd.drivers_enumerated}`);
      status.push(`linux`);
      icon.push(this.bstatusIcon[2]);
    }

    if (bd.drivers_missing != 0) {
      statusMessages.push(`Drivers missing: ${bd.drivers_missing}`);
      status.push(`linux`);
      icon.push(this.bstatusIcon[2]);
    }
    if (bd.dmesg_errors_found != 0) {
      statusMessages.push(`Linux dmesg error/s: ${bd.dmesg_errors_found}`);
      status.push(`linux`);
      icon.push(this.bstatusIcon[2]);
    }
    if (bd.pytest_errors != 0) {
      statusMessages.push(`Pytest error/s: ${bd.pytest_errors}`);
      status.push(`pytest`);
      icon.push(this.bstatusIcon[3]);
    }
    if (bd.pytest_failures != 0) {
      statusMessages.push(`Pytest failure/s: ${bd.pytest_failures}`);
      status.push(`pytest`);
      icon.push(this.bstatusIcon[3]);
    }
    if (bd.last_failing_stage_failure != "NA") {
      statusMessages.push(`Failing stage: ${bd.last_failing_stage_failure}`);
      status.push(`nebula`);
      icon.push(this.bstatusIcon[1]);
    }

    if (!bd.linux_prompt_reached) {
      statusMessages.push(`Linux prompt not reached`);
      status.push(`nebula`);
      //this.icon = this.imagePath + this.bstatusIcon[1];
    }

    if (!bd.uboot_reached) {
      statusMessages.push(`U-boot prompt not reached`);
      status.push(`nebula`);
      //this.icon = this.imagePath + this.bstatusIcon[1];
    }

    if (statusMessages.length == 1 || status.length == 1 || icon.length == 1) {
      this.statusMessages = statusMessages;
      this.status = status;
      this.icon = icon;
    }

    else if (statusMessages.length > 1) {
      this.statusMessages = ['\u2022 ' + statusMessages.join('<br>\u2022 ')];
      this.icon = icon; // Join icons with a comma if there are two or more
      this.status = [status.join(', ')]; // Join icons with a comma if there are two or more
    }

    bd.status = this.status;
    bd.statusMessages = this.statusMessages;
    bd.icon = this.icon;
    // console.log(bd.boot_folder_name, bd.statusMessages);

    return bd.icon;

  }
  
  countPassingBoards(dataAggregates: any[]): number {
    let passingBoards = 0;

    for (const bd of dataAggregates) {
      this.isBoardPassed(bd); // Call isBoardPassed to calculate the board's status

      // Check if the status array contains 'pass'
      if (bd.status && bd.status.includes(`pass`)) {
        passingBoards++;
        // console.log( "Pass " + passingBoards +" - " + bd.boot_folder_name);

      }
    }

    return passingBoards;
  }

  countLinuxErrors(dataAggregates: any[]): number {
    let linuxBoards = 0;
    let boardL = '';

    for (const bd of dataAggregates) {
      this.isBoardPassed(bd); // Call isBoardPassed to calculate the board's status

      // Check if the status array contains 'pass'
      if (bd.drivers_missing != 0 || bd.dmesg_errors_found != 0 || bd.drivers_enumerated == 0) {
        linuxBoards++;
        boardL = bd.boot_folder_name;
        // console.log("Linux " + linuxBoards +" - " + boardL);

      }
    }

    return linuxBoards;
  }

  countPytestErrors(dataAggregates: any[]): number {
    let pytestBoards = 0;

    for (const bd of dataAggregates) {
      this.isBoardPassed(bd); // Call isBoardPassed to calculate the board's status

      // Check if the status array contains 'pass'
      if (bd.pytest_errors != 0 || bd.pytest_failures != 0) {
        pytestBoards++;
        // console.log("Pytest " + pytestBoards +" - " +bd.boot_folder_name);

      }

    }

    return pytestBoards;
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

  navigateToBoardPage(boardName: string) {
    // Assuming that 'boardId' is a unique identifier for each board.
    // Use the Angular Router to navigate to the board page with the selected board ID.
    this.router.navigate(['kuiperlinuxci', boardName]);
  }

}
