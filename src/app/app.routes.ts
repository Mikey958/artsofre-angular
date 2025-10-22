import { Routes } from '@angular/router';
import { CompanyDetail } from './features/companies/pages/company-detail/company-detail';
import { CompanyListPage } from './features/companies/pages/company-list-page/company-list-page';
import { CompanyYandexMap } from './features/companies/pages/company-yandex-map/company-yandex-map';
import { Layout } from './layouts/layout/layout';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        component: CompanyListPage,
      },
      {
        path: 'detail/:id',
        component: CompanyDetail,
      },
      {
        path: 'map',
        component: CompanyYandexMap,
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'list',
  },
];
