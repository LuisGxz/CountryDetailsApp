import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';
import { Region } from '../../interfaces/region.type';


@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styleUrls: ['./by-region-page.component.scss']
})
export class ByRegionPageComponent  implements OnInit{

  countries: Country[] = [];

  regions: Region[] = ['Americas', 'Africa', 'Asia', 'Europe', 'Oceania'];

  public selectecRegion?: Region;

  public isloading: boolean = false;

  public initialValue: string = '';

  constructor(private countriesServices: CountriesService) {

  }

  ngOnInit(): void {
    this.selectecRegion = this.countriesServices.cacheStore.byRegion.region;
    this.countries = this.countriesServices.cacheStore.byRegion.countries;
  }

  searchByRegion(region: Region) {

    this.selectecRegion = region;
    this.isloading = true;

    this.countriesServices.searchRegion(region)
      .subscribe(resp => {
        setTimeout(() => {
          this.countries = resp;
          this.isloading = false;
        }, 500);

      });

  }

}
