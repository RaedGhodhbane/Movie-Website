import { Component, OnInit } from '@angular/core';
import { MovieModel } from 'Model/movieModel';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
type = ''
movies : MovieModel[] = []
watchList : MovieModel[] = []
  constructor(private apiService : ApiService) { }

  ngOnInit(): void {
    this.apiService.typeObservable.subscribe(t => {
      this.type = t
      
    })
    this.apiService.searchModelObservable.subscribe(s => {
      console.log(s)
      this.apiService.getMovie(s).subscribe(res => {
        this.movies = res.Search
        console.log(this.movies)
      })
    })

    this.apiService.watchListObservable.subscribe(t => {
      this.watchList = t
    })
  }

  AddToWatchList(imdbID : string) {
    var movieSelected = this.movies.filter(m => m.imdbID == imdbID)
    this.watchList.unshift(movieSelected[0])
    console.log(this.watchList)
  }

  Add(film : MovieModel) {
    this.watchList.unshift(film)
    console.log(this.watchList)
    this.apiService.setWatchListSubject(this.watchList)

  }

  checkExistInWatchList(imdbID : string) : boolean {
   return this.watchList.filter(w => w.imdbID == imdbID).length == 0
  }



}
