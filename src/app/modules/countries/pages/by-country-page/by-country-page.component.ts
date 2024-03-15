import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styleUrls: ['./by-country-page.component.scss']
})
export class ByCountryPageComponent {

  countries: Country[] = [];

  constructor(private countriesServices: CountriesService){
  }

  searchByCountry(country: string){

    this.countriesServices.searchCountry(country)
    .subscribe(resp => {
      this.countries = resp;
      console.log(this.countries);

    });

  }
}
