import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SearchModel } from 'Model/searchModel';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  types = [

    { value: "movie", text: "Movie" },

    { value: "series", text: "Serie" }

  ]
  years = [

    { value: "2018"},

    { value: "2017"},

    { value: "2016"},

    { value: "2015"}

  ]

  txtType = 'Type'
  txtYear = 'Année'

  form : FormGroup;

  typeSelected = ''
  constructor(private apiService : ApiService , private fb : FormBuilder) {
  this.form = fb.group({
    title : ['', Validators.required]
  })
}
  ngOnInit(): void {
    this.form.controls['title'].valueChanges.subscribe(t => {
      var search = new SearchModel()
      search.Title = t
      search.Type = this.typeSelected
      search.Year = this.txtYear
      this.apiService.setSearchSubject(search)
    
    })
  }


setType(type : string, value : string) {
this.txtType = type
this.typeSelected = value
this.apiService.setTypeSubject(type)
}

setYear(annee : string) {
this.txtYear = annee
}
}
