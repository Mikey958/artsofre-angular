import { Component } from '@angular/core';
import { CompanyList } from '../../components/company-list/company-list';

@Component({
  selector: 'app-company-list-page',
  imports: [CompanyList],
  templateUrl: './company-list-page.html',
  styleUrl: './company-list-page.scss',
})
export class CompanyListPage {}
