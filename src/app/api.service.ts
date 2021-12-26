import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MovieModel } from 'Model/movieModel';
import { MovieResponse } from 'Model/movieResponse';
import { SearchModel } from 'Model/searchModel';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
private typeSubject : BehaviorSubject<string>
public typeObservable : Observable<string>
private searchModelSubject : BehaviorSubject<SearchModel>
public searchModelObservable : Observable<SearchModel>
private watchListSubject : BehaviorSubject<MovieModel[]>
public watchListObservable : Observable<MovieModel[]>





  constructor(private http:HttpClient) {
    this.typeSubject = new BehaviorSubject<string>('SearchResult')
    this.typeObservable = this.typeSubject.asObservable()
    this.searchModelSubject = new BehaviorSubject<SearchModel>(new SearchModel())
    this.searchModelObservable = this.searchModelSubject.asObservable()
    this.watchListSubject = new BehaviorSubject<MovieModel[]>([])
    this.watchListObservable = this.watchListSubject.asObservable()


   
  }

setTypeSubject(type : string) {
this.typeSubject.next(type)
}

// 'https://www.omdbapi.com?apikey=f7df2d80&t='+blood+'&type='+movie+'&y='+2015'

getMovie(search : SearchModel) :Observable<MovieResponse> {

return this.http.get<MovieResponse>('https://www.omdbapi.com?apikey=f7df2d80&s='+search.Title+'&type='+search.Type+'&y='+search.Year)
}

setSearchSubject(search : SearchModel) {
  this.searchModelSubject.next(search)

}

setWatchListSubject(watchList : MovieModel[]) {
  this.watchListSubject.next(watchList)
}
}
