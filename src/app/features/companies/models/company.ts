export interface Company {
  id: number;
  uid: string;
  business_name: string;
  suffix: string;
  industry: string;
  type: string;
  catch_phrase: string;
  phone_number: string;
  full_address: string;
  latitude: number;
  longitude: number;
  logo: string;
}

export interface CompanyListResponse {
  data: Company[];
  page: number;
  per_page: number;
  total_pages: number;
  offset: number;
  limit: number;
  total: number;
  has_prev: boolean;
  has_next: boolean;
}

export type SortBy = 'name' | 'id' | 'type' | 'industry';
export type SortOrder = 'asc' | 'desc';

export interface CompanyFilters {
  q?: string;
  industry?: string;
  company_type?: string;
  sort_by?: SortBy;
  sort_order?: SortOrder;
}

export interface CompanyQueryParams {
  page?: number;
  perPage?: number;
  filters?: CompanyFilters;
}

export type CompanyType = string;
export type Industry = string;
