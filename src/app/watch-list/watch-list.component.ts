import { Component, OnInit } from '@angular/core';
import { MovieModel } from 'Model/movieModel';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrls: ['./watch-list.component.css']
})
export class WatchListComponent implements OnInit {
watchList : MovieModel[] = []

  constructor(private apiService : ApiService) { }

  ngOnInit(): void {
    this.apiService.watchListObservable.subscribe(t => {
      this.watchList = t
    })
  }

  delete(imdbID : string) {
    this.watchList = this.watchList.filter(w => w.imdbID != imdbID)
    this.apiService.setWatchListSubject(this.watchList)
  }


}
