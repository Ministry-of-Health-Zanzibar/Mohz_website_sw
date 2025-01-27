import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    title: 'Dashboard',
    loadComponent: () =>
      import('./dashboard.component').then((c) => c.DashboardComponent),
    children: [
      {
        path: 'home',
        title: 'Home',
        loadComponent: () =>
          import('./components/home/home.component').then(
            (c) => c.HomeComponent
          ),
      },
      {
        path: 'announcement-list',
        title: '',
        loadComponent: () =>
          import('./components/announcements/announcement-list/announcement-list.component').then(
            (c) => c.AnnouncementListComponent
          ),
      },
      {
        path: 'news-list',
        title: '',
        loadComponent: () =>
          import('./components/news/news-list/news-list.component').then(
            (c) => c.NewsListComponent
          ),
      },
      {
        path: 'news-form',
        title: '',
        loadComponent: () =>
          import('./components/news/news-form/news-form.component').then(
            (c) => c.NewsFormComponent
          ),
      },
      {
        path: 'comment-list',
        title: '',
        loadComponent: () =>
          import('./components/comments/coment-list/coment-list.component').then(
            (c) => c.ComentListComponent
          ),
      },
      {
        path: 'comment-form',
        title: '',
        loadComponent: () =>
          import('./components/comments/coment-form/coment-form.component').then(
            (c) => c.ComentFormComponent
          ),
      },
      {
        path: 'banner-list',
        title: '',
        loadComponent: () =>
          import('./components/banners/banner-list/banner-list.component').then(
            (c) => c.BannerListComponent
          ),
      },
      {
        path: 'banner-form',
        title: '',
        loadComponent: () =>
          import('./components/banners/banner-form/banner-form.component').then(
            (c) => c.BannerFormComponent
          ),
      },
      {
        path: 'site-link-list',
        title: '',
        loadComponent: () =>
          import('./components/site-links/site-link-list/site-link-list.component').then(
            (c) => c.SiteLinkListComponent
          ),
      },
      {
        path: 'site-link-form',
        title: '',
        loadComponent: () =>
          import('./components/site-links/site-link-form/site-link-form.component').then(
            (c) => c.SiteLinkFormComponent
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
