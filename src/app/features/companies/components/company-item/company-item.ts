import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Company } from '../../models/company';

@Component({
  selector: 'app-company-item',
  imports: [RouterLink],
  templateUrl: './company-item.html',
  styleUrl: './company-item.scss',
})
export class CompanyItem {
  company = input.required<Company>();
}
