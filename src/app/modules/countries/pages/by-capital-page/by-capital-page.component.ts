import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styleUrls: ['./by-capital-page.component.scss']
})
export class ByCapitalPageComponent implements OnInit{

  countries: Country[] = [];
  public isloading: boolean = false;

  public initialValue: string = '';
  constructor(private countriesServices: CountriesService) {
  }

  ngOnInit(): void {
    this.initialValue = this.countriesServices.cacheStore.byCapital.term;
    this.countries = this.countriesServices.cacheStore.byCapital.countries;
  }

  searchByCapital(country: string) {
    this.isloading = true;

    this.countriesServices.searchCapital(country)
      .subscribe(resp => {
        setTimeout(() => {
          this.countries = resp;
          this.isloading = false;
        }, 500);

      });

  }

}
