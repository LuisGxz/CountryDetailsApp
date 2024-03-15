import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styleUrls: ['./by-country-page.component.scss']
})
export class ByCountryPageComponent implements OnInit{

  countries: Country[] = [];
  public isloading: boolean = false;
  public initialValue: string = '';
  constructor(private countriesServices: CountriesService){
  }

  ngOnInit(): void {
    this.initialValue = this.countriesServices.cacheStore.byCountry.term;
    this.countries = this.countriesServices.cacheStore.byCountry.countries;
  }

  searchByCountry(country: string){
    this.isloading = true;

    this.countriesServices.searchCountry(country)
    .subscribe(resp => {
      setTimeout(() => {
        this.countries = resp;
        this.isloading = false;
      }, 500);

    });
  }
}
