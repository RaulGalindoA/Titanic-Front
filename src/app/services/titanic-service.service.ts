import { HttpClient } from '@angular/common/http';
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

  getAll(): Observable<Person[]> {
    return this.http.get<Person[]>(this.baseUrl + `api/person/getAll`);
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
