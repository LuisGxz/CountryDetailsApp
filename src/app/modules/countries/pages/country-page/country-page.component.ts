import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Clp, Country, Currencies, Languages } from '../../interfaces/country.interface';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styleUrls: ['./country-page.component.scss']
})
export class CountryPageComponent implements OnInit{

  public country?: Country;

  constructor(
    private activateRoute: ActivatedRoute, 
    private countriesService: CountriesService,
    private router: Router ){}



  ngOnInit(): void {

    this.activateRoute.params
      .pipe(
        switchMap(({id}) => this.countriesService.searchByCode(id))
      )
      .subscribe( country => {

        if(!country){
          return this.router.navigateByUrl('home');
        }
        console.log(country);
        return this.country = country;
        
      })
  }

  getCurrencies(currencies: Currencies): Clp[] {
    // Convertir el objeto de monedas en un array de objetos de monedas
    return Object.values(currencies);
  }

  getLanguages(languages: Languages): string[] {
    // Convertir el objeto de monedas en un array de objetos de monedas
    return Object.values(languages);
  }
  



}
