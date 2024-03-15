import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Country } from '../interfaces/country.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1'


  constructor(private httpClient: HttpClient) { }

  searchCapital(capital: string): Observable<Country[]> {

    const url = `${this.apiUrl}/capital/${capital}`;

    return this.httpClient.get<Country[]>(url)
      .pipe(
        catchError(error => of([]))
      );
  }
  searchCountry(country: string): Observable<Country[]> {

    const url = `${this.apiUrl}/name/${country}`;

    return this.httpClient.get<Country[]>(url)
      .pipe(
        catchError(error => of([]))
      );
  }
  searchRegion(region: string): Observable<Country[]> {

    const url = `${this.apiUrl}/region/${region}`;

    return this.httpClient.get<Country[]>(url)
      .pipe(
        catchError(error => of([]))
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
