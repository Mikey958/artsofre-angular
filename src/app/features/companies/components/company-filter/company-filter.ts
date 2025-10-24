import { Component, DestroyRef, inject, OnInit, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { CompanyFilters, CompanyType, Industry } from '../../models/company';
import { CompanyService } from './../../../../core/services/company.service';

@Component({
  selector: 'app-company-filter',
  imports: [ReactiveFormsModule],
  templateUrl: './company-filter.html',
  styleUrl: './company-filter.scss',
})
export class CompanyFilter implements OnInit {
  private fb = inject(FormBuilder);
  private companyService = inject(CompanyService);
  private destroyRef = inject(DestroyRef);

  filterChange = output<CompanyFilters>();

  filterForm!: FormGroup;
  industries: Industry[] = [];
  companyTypes: CompanyType[] = [];

  ngOnInit() {
    this.initForm();
    this.loadFilterOptions();
    this.setupFormSubscription();
  }

  private initForm() {
    this.filterForm = this.fb.group({
      q: [''],
      industry: [''],
      company_type: [''],
    });
  }

  private loadFilterOptions() {
    this.companyService.getIndustries().subscribe({
      next: (industries) => {
        this.industries = industries;
      },
      error: (err) => {
        console.error('Error loading industries', err);
      },
    });

    this.companyService.getCompanyTypes().subscribe({
      next: (types) => {
        this.companyTypes = types;
      },
      error: (err) => {
        console.error('Error loading company types', err);
      },
    });
  }

  private setupFormSubscription() {
    this.filterForm.valueChanges
      .pipe(debounceTime(300), takeUntilDestroyed(this.destroyRef))
      .subscribe((values) => {
        const filters: CompanyFilters = {};

        if (values.q) filters.q = values.q;
        if (values.industry) filters.industry = values.industry;
        if (values.company_type) filters.company_type = values.company_type;

        this.filterChange.emit(filters);
      });
  }

  resetFilters() {
    this.filterForm.reset({
      q: '',
      industry: '',
      company_type: '',
    });
  }
}
