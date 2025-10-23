import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from '../../models/company';
import { CompanyService } from './../../../../core/services/company.service';

@Component({
  selector: 'app-company-detail',
  imports: [],
  templateUrl: './company-detail.html',
  styleUrl: './company-detail.scss',
})
export class CompanyDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private companyService = inject(CompanyService);

  company = signal<Company | null>(null);
  isLoading = signal(true);
  hasError = signal(false);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.loadCompany(+id);
    } else {
      this.goBack();
    }
  }

  loadCompany(id: number) {
    this.isLoading.set(true);
    this.hasError.set(false);

    this.companyService.getCompanyById(id).subscribe({
      next: (data) => {
        this.company.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error loading company', err);
        this.isLoading.set(false);
        this.hasError.set(true);
      },
    });
  }

  goBack() {
    this.router.navigate(['/list']);
  }
}
