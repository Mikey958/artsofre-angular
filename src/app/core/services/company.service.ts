import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Company,
  CompanyFilters,
  CompanyListResponse,
} from '../../features/companies/models/company';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private http = inject(HttpClient);
  private endpoint = 'https://faker-api.milki.space';

  getCompanies(
    page: number = 1,
    perPage: number = 20,
    filters?: CompanyFilters
  ): Observable<CompanyListResponse> {
    let params = new HttpParams().set('page', page.toString()).set('per_page', perPage.toString());

    if (filters) {
      if (filters.q) params = params.set('q', filters.q);
      if (filters.industry) params = params.set('industry', filters.industry);
      if (filters.company_type) params = params.set('company_type', filters.company_type);
      if (filters.sort_by) params = params.set('sort_by', filters.sort_by);
      if (filters.sort_order) params = params.set('sort_order', filters.sort_order);
    }

    return this.http.get<CompanyListResponse>(`${this.endpoint}/companies`, { params });
  }

  getCompanyById(id: number): Observable<Company> {
    return this.http.get<Company>(`${this.endpoint}/companies/${id}`);
  }

  getCompanyTypes(): Observable<string[]> {
    return this.http.get<string[]>(`${this.endpoint}/types`);
  }

  getIndustries(): Observable<string[]> {
    return this.http.get<string[]>(`${this.endpoint}/industries`);
  }
}
