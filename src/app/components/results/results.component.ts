import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { UserResults } from 'src/app/shared/models/user-results.model';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  searchText :string|null="";
  userSearchResults: UserResults | undefined;

  constructor(private activatedroute:ActivatedRoute,private readonly userService:UserService,private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    //Get the username from the route parameter in the url
    this.activatedroute.paramMap.subscribe(params => { 
      this.searchText = params.get('username');
      if(this.searchText){
        this.getUserResults(this.searchText);
      }       
    });
  }

  //Search for the username that was specified in the url and set the data based on that.
  getUserResults(searchString:string):void{
    this.userService.getUsers(searchString).pipe(take(1)).subscribe( response => {
      this.userSearchResults = response;
    }, error => {
      //Error notification
      const message = "Oops!! Something went wrong. Please try again."
      this.snackBar.open(message, "Ok", {
        duration: 3000,
     });
    })
  }

}
