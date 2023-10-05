import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

//models
import { Boards } from 'src/app/models/boards.model';
import { BoardDetails } from 'src/app/models/boarddetails.model';

//services
import { BoardsService } from 'src/app/services/boards.service';


@Component({
  selector: 'app-selectedboard',
  templateUrl: './selectedboard.component.html',
  styleUrls: ['./selectedboard.component.scss']
})

export class SelectedboardComponent implements OnInit {

  selectedBoard: string;
  selectedMenuItem: string = ''; 

  jenkins_project_name: any = [];
  boot_test_result : any = [];  
  source_adjacency_matrix: any = [];
  hdl_hash: any = [];
  linux_hash: any = [];
  jenkins_build_number: number;
  boot_folder_name: any = [];
  jenkins_job_date: Date;
  jenkins_trigger: string;

  hash: any;
  trigger = '';
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

  boardDetails: any = [];
  boardModel: Boards;
  boardDetailModel: BoardDetails;
  
  constructor(
    private boardsService: BoardsService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.fetchSelectedBoard();
    this.fetchBoardDetails();
  }
  fetchSelectedBoard() {
    this.route.params.subscribe((params) => {
      this.selectedBoard = params['boardName'];
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

  // extractNumber(trigger: string): string {
  //   if (!trigger) {
  //     return ''; // Handle the case where trigger is undefined or null
  //   } else if (trigger === 'manual') {
  //     return trigger;
  //   } else if (trigger.length >= 4) {
  //     return trigger.slice(-4);
  //   } else {
  //     return trigger;
  //   }
  // }
  
  fetchBoardDetails() {
    this.boardsService.getBoardDetails(this.selectedBoard).subscribe(data => {
      this.boardDetails = data;
      
      const selectedBoard = this.boardDetails['hits'].map((bselect: { boot_folder_name: string; }) => bselect.boot_folder_name === this.selectedBoard);
      
      selectedBoard.jenkins_trigger = this.extractNumber(this.jenkins_trigger);
      selectedBoard.hdl_hash = this.removeNextText(this.hdl_hash);
      selectedBoard.linux_hash = this.removeNextText(this.linux_hash);

      selectedBoard.dmesg_errors_found = this.dmesg_errors_found;
      selectedBoard.drivers_missing = this.drivers_missing;

      const sums = this.calculateSums();
      console.log('Sums:', sums);
    }, error => {
      console.error('Error fetching board details:', error);
    });
  }

  calculateSums() {
    const sums: { [jenkinsBuildNumber: string]: { pytest_errors: number, pytest_skipped: number, pytest_failures: number } } = {};

    if (this.boardDetails && this.boardDetails.hits) {
      for (const board of this.boardDetails.hits) {
        const jenkinsBuildNumber = board.jenkins_build_number;

        if (!sums[jenkinsBuildNumber]) {
          sums[jenkinsBuildNumber] = {
            pytest_errors: 0,
            pytest_failures: 0,
            pytest_skipped: 0,
          };
        }

      
        sums[jenkinsBuildNumber].pytest_errors += parseInt(board.pytest_errors, 10) || 0;
        sums[jenkinsBuildNumber].pytest_failures += parseInt(board.pytest_failures, 10) || 0;
        sums[jenkinsBuildNumber].pytest_failures += parseInt(board.pytest_failures, 10) || 0;
      }
    }
    console.log(sums);
    return sums;
  }

  

  selectMenuItem(item: string): void {
    this.selectedMenuItem = item;
  }
  extractNumber(trigger: string): string {
    // this.trigger = trigger.split(':');
    if (trigger === undefined) {
      throw new Error('Input is undefined');
    }
  
    if (trigger === "manual") {
      return trigger;
    } else if (typeof trigger === 'string' && trigger.length >= 4) {
      return trigger.slice(-4);
    } else {
      return trigger;
    }
}
}



