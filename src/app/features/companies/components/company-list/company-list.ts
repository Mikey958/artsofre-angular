import { Component, inject, OnInit, signal } from '@angular/core';
import { Company } from '../../models/company';
import { CompanyItem } from '../company-item/company-item';
import { CompanyService } from './../../../../core/services/company.service';

@Component({
  selector: 'app-company-list',
  imports: [CompanyItem],
  templateUrl: './company-list.html',
  styleUrl: './company-list.scss',
})
export class CompanyList implements OnInit {
  private companyService = inject(CompanyService);

  companies = signal<Company[]>([]);
  isLoading = signal(true);

  ngOnInit() {
    this.loadCompanies();
  }

  loadCompanies() {
    this.isLoading.set(true);

    this.companyService.getCompanies(1, 20).subscribe({
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
}
