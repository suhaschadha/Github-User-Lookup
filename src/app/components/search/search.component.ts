import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { debounceTime, distinctUntilChanged, take } from 'rxjs';
import { HistoryService } from '../../services/history.service';
import { UserService } from '../../services/user.service';
import { UserResults } from '../../shared/models/user-results.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchForm = new FormGroup({
    searchText: new FormControl()
  })

  userSearchResults: UserResults | undefined;

  constructor(private readonly userService:UserService,private snackBar: MatSnackBar,private historyService : HistoryService) { }

  ngOnInit(): void {
    //Delay introduced to make sure the user has stopped typing and would like to search for the entered text.
    this.searchForm.controls['searchText'].valueChanges
    .pipe(
        debounceTime(2000),
        distinctUntilChanged()
    )
    .subscribe(res => {
      if(res){
        this.getUsers(res);
      }
    });
  }

//Passes the search text to the service. Subsequently the search text is cached using a service.
  getUsers(searchText:string){
    //Getting the results based on the name provided
    this.userService.getUsers(searchText).pipe(take(1)).subscribe( response => {
      this.userSearchResults = response;
      //Count returned by API determins if results were found or not.
      if(this.userSearchResults.total_count){
        this.historyService.setSuccessfulHistory(searchText);
      }
      else{
        this.historyService.setFailureHistory(searchText);
      }
    }, error => {
      const message = "Oops!! Something went wrong. Please try again."
      this.snackBar.open(message, "Ok", {
        duration: 3000,
     });
    })
  }

}
