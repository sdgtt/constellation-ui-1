import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';


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
  @ViewChild('dropdownList') dropdownList: ElementRef;


  selectedBoard: string;
  selectedField: string = '';
  selectedValue: string = '';


  jenkins_project_name: any = [];
  boot_test_result: any = [];
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
  dmesg_errors_found: string;
  dmesg_warnings_found: string;
  drivers_enumerated: string;
  drivers_missing: string;
  last_failing_stage: any;
  last_failing_stage_failure: any;
  matlab_errors: string;
  matlab_failures: string;
  matlab_skipped: string;
  matlab_tests: string;
  pytest_errors: string;
  pytest_failures: string;
  pytest_skipped: string;
  pytest_tests: string;
  pyadi_tests_url: string;
  trigger_url: string;
  ptestHtml_iframe: any;

  currentLatestBuildNumber: number;

  boardDetails: any = [];
  defaultData: any = [];

  boardModel: Boards;
  boardDetailModel: BoardDetails;
  dataAggregates: any[] = [];
  showMenu: any;

  constructor(
    private boardsService: BoardsService,
    private route: ActivatedRoute) { }

  dtoptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  ngOnInit(): void {
    this.fetchSelectedBoard();
    this.dtoptions = {
      pagingType: 'full_numbers',
      searching: true,
      paging: true,
      pageLength: 10,
      lengthChange: true,
      ordering: true,
      order: [[0, 'desc']],
      columnDefs: [
        { width: '200px', targets: [0] }, // Adjust the width of the first column
        { width: '150px', targets: [1] }, // Adjust the width of the second column


        // Adjust the width of other columns as needed
      ],
      language: {
        searchPlaceholder: 'Search here'
      }

    };
    this.fetchBoardDetails();
  }

  fetchSelectedBoard() {
    this.route.params.subscribe((params) => {
      this.selectedBoard = params['boardName'];
    });
  }

  fetchBoardDetails() {
    this.boardsService.getBoardDetails(this.selectedBoard).subscribe(data => {
      this.boardDetails = data;

      // Now you have the latest job date stored in latestJobDate
      const selectedBoard = this.boardDetails['hits'].map((bselect: { boot_folder_name: string; }) => bselect.boot_folder_name === this.selectedBoard);

      selectedBoard.jenkins_trigger = this.jenkins_trigger;
      selectedBoard.hdl_hash = this.hdl_hash;
      selectedBoard.linux_hash = this.linux_hash;
      selectedBoard.dmesg_errors_found = this.dmesg_errors_found;
      selectedBoard.drivers_missing = this.drivers_missing;
      selectedBoard.jenkins_trigger = this.trigger_url;
      selectedBoard.source_adjacency_matrix = this.source_adjacency_matrix;

      selectedBoard.pyadi_tests_url = this.pyadi_tests_url;


      this.dtTrigger.next(null);

    });
  }



  getDefaultArtifactoryBranch(): string {
    // Set default value for source_adjacency_matrix
    this.source_adjacency_matrix = 'boot_partition_2022_r2';
    // Return the default artifactory branch
    return this.source_adjacency_matrix;
  }

}



