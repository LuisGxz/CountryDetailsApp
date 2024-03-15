import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Country } from '../interfaces/country.interface';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1'

  public cacheStore: CacheStore = {
    byCapital: {term: '', countries: []},
    byCountry: {term: '', countries: []},
    byRegion: {region: '', countries: []},
  }

  constructor(private httpClient: HttpClient) {
    this.loadToLocalStorage();
   }

  private saveToLocalStorage(){
    localStorage.setItem('cacheStorage', JSON.stringify(this.cacheStore));
  }

  private loadToLocalStorage(){
    if(!localStorage.getItem('cacheStorage'))return;
    
    this.cacheStore = JSON.parse(localStorage.getItem('cacheStorage')!);
    
  }



  private getCountriesRequest(url: string): Observable<Country[]>{
    return this.httpClient.get<Country[]>(url)
      .pipe(
        catchError( () => of([]))
      );
  }

  searchCapital(capital: string): Observable<Country[]> {

    const url = `${this.apiUrl}/capital/${capital}`;

    return this.getCountriesRequest(url)
      .pipe(
        tap( countries => this.cacheStore.byCapital = {term: capital, countries}),
        tap(() => this.saveToLocalStorage()), 
      );
  }
  searchCountry(country: string): Observable<Country[]> {

    const url = `${this.apiUrl}/name/${country}`;
    return this.getCountriesRequest(url)
    .pipe(
      tap( countries => this.cacheStore.byCountry = {term: country, countries}),
      tap(() => this.saveToLocalStorage()), 
    );

  }
  searchRegion(region: Region): Observable<Country[]> {

    const url = `${this.apiUrl}/region/${region}`;
    return this.getCountriesRequest(url)
    .pipe(
      tap( countries => this.cacheStore.byRegion = {region: region, countries}),
      tap(() => this.saveToLocalStorage()), 
    );

  }

  searchByCode(code: string): Observable<Country | null> {

    const url = `${this.apiUrl}/alpha/${code}`;
    return this.httpClient.get<Country[]>(url)
      .pipe(
        map(countries => countries.length >0 ? countries[0] : null),
        catchError(error => of(null))
      );
  }
}
