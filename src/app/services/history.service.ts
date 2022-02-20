import { Injectable } from '@angular/core';
import { History } from 'src/app/shared/models/history.model';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private successfulHistory : History[] = [];
  private failureHistory : History[] = [];

  constructor() { 
    //Setting data based on cache present.
    let successfulHistory = localStorage.getItem("successHistory");
    if(successfulHistory){
      this.successfulHistory= JSON.parse(successfulHistory);
    }
    let failureHistory = localStorage.getItem("failureHistory");
    if(failureHistory){
      this.failureHistory= JSON.parse(failureHistory);
    }
  }
  
  //Check if searched user already exits in cache. If not present the user is added. Success condition
  setSuccessfulHistory(username:string):void{
    let searchTextPresent = this.searchExists(username,this.successfulHistory);
    if(searchTextPresent){
      this.successfulHistory.push({searchText:username,success:true});
      this.setDataInStorage("successHistory",this.successfulHistory);
    }
  }

  ////Check if searched user already exits in cache. If not present the user is added. Failure condition
  setFailureHistory(username:string):void{
    let searchTextPresent = this.searchExists(username,this.failureHistory);
    if(searchTextPresent){  
      this.failureHistory.push({searchText:username,success:false});
      this.setDataInStorage("failureHistory",this.failureHistory);
    }
  }

  //Used to push data into cache.
  private setDataInStorage(searchType:string,data:History[]){
    localStorage.setItem(searchType,JSON.stringify(data));
  }

  //Delete the search record selected by the user.
  deleteHistory(username:string,success:boolean):void{
    if(success){
      this.successfulHistory = this.successfulHistory.filter(element => element.searchText !== username);

      this.setDataInStorage("successHistory",this.successfulHistory);
    }
    else{
      this.failureHistory = this.failureHistory.filter(element => element.searchText !== username);
      this.setDataInStorage("failureHistory",this.failureHistory);
    }
  }
//Returns the successful and failure results present in cache.
  getSuccessfulSearches():History[]{
    return this.successfulHistory;
  }
  getFailureSearches():History[]{
    return this.failureHistory;
  }

  //Used to check if the searched user already exists in the cache.
  searchExists(searchText:string,searchArray:History[]):boolean{
    let elementPresent =  searchArray.find(element => element.searchText === searchText);
    if(elementPresent){
      return true;
    }
    else{
      return false;
    }
  }
}
