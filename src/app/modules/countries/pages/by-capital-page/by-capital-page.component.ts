import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styleUrls: ['./by-capital-page.component.scss']
})
export class ByCapitalPageComponent {

  countries: Country[] = [];

  constructor(private countriesServices: CountriesService){

  }
  
  searchByCapital(country: string){

    this.countriesServices.searchCapital(country)
    .subscribe(resp => {
      this.countries = resp;
      console.log(this.countries);

    });

  }

}
