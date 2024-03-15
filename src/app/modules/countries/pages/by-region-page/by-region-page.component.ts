import { Component } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styleUrls: ['./by-region-page.component.scss']
})
export class ByRegionPageComponent {


  countries: Country[] = [];

  constructor(private countriesServices: CountriesService) {

  }

  searchByRegion(country: string) {

    this.countriesServices.searchRegion(country)
      .subscribe(resp => {
        this.countries = resp;
        console.log(this.countries);

      });

  }
  
}
