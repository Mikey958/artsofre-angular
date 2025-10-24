import { Component, inject, OnInit, signal } from '@angular/core';
import { Company, CompanyFilters, SortChange } from '../../models/company';
import { CompanyFilter } from '../company-filter/company-filter';
import { CompanyItem } from '../company-item/company-item';
import { CompanySort } from '../company-sort/company-sort';
import { CompanyService } from './../../../../core/services/company.service';

@Component({
  selector: 'app-company-list',
  imports: [CompanyItem, CompanySort, CompanyFilter],
  templateUrl: './company-list.html',
  styleUrl: './company-list.scss',
})
export class CompanyList implements OnInit {
  private companyService = inject(CompanyService);

  companies = signal<Company[]>([]);
  isLoading = signal(true);
  private filters = signal<CompanyFilters>({
    sort_by: 'id',
    sort_order: 'asc',
  });

  ngOnInit() {
    this.loadCompanies();
  }

  loadCompanies() {
    this.isLoading.set(true);

    this.companyService.getCompanies(1, 100, this.filters()).subscribe({
      next: (response) => {
        this.companies.set(response.data);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error fetching companies:', error);
        this.isLoading.set(false);
      },
    });
  }

  onSortChange(sortChange: SortChange) {
    this.filters.update((current) => ({
      ...current,
      sort_by: sortChange.sortBy,
      sort_order: sortChange.sortOrder,
    }));
    this.loadCompanies();
  }

  onFilterChange(filterValues: CompanyFilters) {
    this.filters.set({
      sort_by: this.filters().sort_by,
      sort_order: this.filters().sort_order,
      ...filterValues,
    });
    this.loadCompanies();
  }
}
