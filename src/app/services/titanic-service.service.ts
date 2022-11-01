import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from '../interfaces/person';
import { environment } from '../../environments/environment.prod';
import { ApiResponse } from '../interfaces/api-response';

@Injectable({
  providedIn: 'root',
})
export class TitanicService {
  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getAll(
    pageSize: number,
    pageNumber: number,
    name?: string,
    pclass?: string,
    sex?: string
  ): Observable<ApiResponse> {
    let params = new HttpParams()
      .set('pageSize', pageSize)
      .set('pageNumber', pageNumber);
    if (name) params = params.set('name', name);
    if (pclass) params = params.set('pclass', pclass);
    if (sex) params = params.set('sex', sex);
    return this.http.get<ApiResponse>(this.baseUrl + `api/person/getAll`, {
      params,
    });
  }

  uploadFile(formData: FormData): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(
      this.baseUrl + `api/person/import`,
      formData
    );
  }

  addPerson(person: Person): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(
      this.baseUrl + `api/person/addPerson`,
      person
    );
  }

  updatePerson(person: Person): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(
      this.baseUrl + `api/person/updatePerson`,
      person
    );
  }

  deletePerson(person: Person): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(
      this.baseUrl + `api/person/deletePerson`,
      person
    );
  }
}
