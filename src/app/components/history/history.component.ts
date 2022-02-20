import { Component, OnInit } from '@angular/core';
import { HistoryService } from 'src/app/services/history.service';
import { History } from 'src/app/shared/models/history.model';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

   successfulSearch : History[]=[];
   failureSearch : History[]=[];

  constructor(private readonly historyService :HistoryService) { }

  ngOnInit(): void {
    this.setHistoryData();
  }
  //Retrieve the successful and failure search results from cache.
  setHistoryData(){
    this.successfulSearch=this.historyService.getSuccessfulSearches();
    this.failureSearch = this.historyService.getFailureSearches();
  }

  //Used to delete a particular entry chosen by the user.
  deleteHistoryItem(searchText:string,success:boolean){
    this.historyService.deleteHistory(searchText,success);
    this.setHistoryData();
  }

}
