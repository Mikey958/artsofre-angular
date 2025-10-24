import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SortBy, SortChange, SortOrder } from '../../models/company';

@Component({
  selector: 'app-company-sort',
  imports: [FormsModule],
  templateUrl: './company-sort.html',
  styleUrl: './company-sort.scss',
})
export class CompanySort {
  sortChange = output<SortChange>();

  currentSortBy: SortBy = 'name';
  currentSortOrder: SortOrder = 'asc';

  sortByOptions: { value: SortBy; label: string }[] = [
    { value: 'name', label: 'Названию' },
    { value: 'type', label: 'Типу' },
    { value: 'industry', label: 'Виду деятельности' },
  ];

  sortOrderOptions: { value: SortOrder; label: string }[] = [
    { value: 'asc', label: 'По возрастанию' },
    { value: 'desc', label: 'По убыванию' },
  ];

  onSortByChange() {
    this.emitSortChange();
  }

  onSortOrderChange() {
    this.emitSortChange();
  }

  private emitSortChange() {
    this.sortChange.emit({
      sortBy: this.currentSortBy,
      sortOrder: this.currentSortOrder,
    });
  }
}
