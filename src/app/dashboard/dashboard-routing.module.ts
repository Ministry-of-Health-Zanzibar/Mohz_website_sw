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
        path: 'team-list',
        title: '',
        loadComponent: () =>
          import('./components/teams/team-list/team-list.component').then(
            (c) => c.TeamListComponent
          ),
      },
      {
        path: 'team-form',
        title: '',
        loadComponent: () =>
          import('./components/teams/team-form/team-form.component').then(
            (c) => c.TeamFormComponent
          ),
      },
      {
        path: 'user-list',
        title: '',
        loadComponent: () =>
          import('./components/users/user-list/user-list.component').then(
            (c) => c.UserListComponent
          ),
      },
      {
        path: 'user-form',
        title: '',
        loadComponent: () =>
          import('./components/users/user-form/user-form.component').then(
            (c) => c.UserFormComponent
          ),
      },
      {
        path: 'announcement-list',
        title: '',
        loadComponent: () =>
          import(
            './components/announcements/announcement-list/announcement-list.component'
          ).then((c) => c.AnnouncementListComponent),
      },
      {
        path: 'announcement-details/:id',
        title: '',
        loadComponent: () =>
          import(
            './components/announcements/view-announcement-details/view-announcement-details.component'
          ).then((c) => c.ViewAnnouncementDetailsComponent),
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
        path: 'news-details/:id',
        title: '',
        loadComponent: () =>
          import(
            './components/news/view-news-details/view-news-details.component'
          ).then((c) => c.ViewNewsDetailsComponent),
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
          import(
            './components/comments/coment-list/coment-list.component'
          ).then((c) => c.ComentListComponent),
      },
      {
        path: 'comment-form',
        title: '',
        loadComponent: () =>
          import(
            './components/comments/coment-form/coment-form.component'
          ).then((c) => c.ComentFormComponent),
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
        path: 'banner-details/:id',
        title: '',
        loadComponent: () =>
          import(
            './components/banners/view-banner-details/view-banner-details.component'
          ).then((c) => c.ViewBannerDetailsComponent),
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
          import(
            './components/site-links/site-link-list/site-link-list.component'
          ).then((c) => c.SiteLinkListComponent),
      },
      {
        path: 'site-link-form',
        title: '',
        loadComponent: () =>
          import(
            './components/site-links/site-link-form/site-link-form.component'
          ).then((c) => c.SiteLinkFormComponent),
      },
      {
        path: 'site-link-details/:id',
        title: '',
        loadComponent: () =>
          import(
            './components/site-links/view-site-link-details/view-site-link-details.component'
          ).then((c) => c.ViewSiteLinkDetailsComponent),
      },
      {
        path: 'type-list',
        title: '',
        loadComponent: () =>
          import('./components/types/type-list/type-list.component').then(
            (c) => c.TypeListComponent
          ),
      },
      {
        path: 'type-form',
        title: '',
        loadComponent: () =>
          import('./components/types/type-form/type-form.component').then(
            (c) => c.TypeFormComponent
          ),
      },
      {
        path: 'post-list',
        title: '',
        loadComponent: () =>
          import('./components/posts/post-list/post-list.component').then(
            (c) => c.PostListComponent
          ),
      },
      {
        path: 'post-form',
        title: '',
        loadComponent: () =>
          import('./components/posts/post-form/post-form.component').then(
            (c) => c.PostFormComponent
          ),
      },
      {
        path: 'post-details/:id',
        title: '',
        loadComponent: () =>
          import(
            './components/posts/view-post-details/view-post-details.component'
          ).then((c) => c.ViewPostDetailsComponent),
      },
      {
        path: 'project-list',
        title: '',
        loadComponent: () =>
          import(
            './components/projects/project-list/project-list.component'
          ).then((c) => c.ProjectListComponent),
      },
      {
        path: 'project-form',
        title: '',
        loadComponent: () =>
          import(
            './components/projects/project-form/project-form.component'
          ).then((c) => c.ProjectFormComponent),
      },
      {
        path: 'event-list',
        title: '',
        loadComponent: () =>
          import('./components/events/event-list/event-list.component').then(
            (c) => c.EventListComponent
          ),
      },
      {
        path: 'event-form',
        title: '',
        loadComponent: () =>
          import('./components/events/event-form/event-form.component').then(
            (c) => c.EventFormComponent
          ),
      },
      {
        path: 'tender-list',
        title: '',
        loadComponent: () =>
          import('./components/tenders/tender-list/tender-list.component').then(
            (c) => c.TenderListComponent
          ),
      },
      {
        path: 'tender-form',
        title: '',
        loadComponent: () =>
          import('./components/tenders/tender-form/tender-form.component').then(
            (c) => c.TenderFormComponent
          ),
      },
      {
        path: 'publication-list',
        title: '',
        loadComponent: () =>
          import(
            './components/publications/publication-list/publication-list.component'
          ).then((c) => c.PublicationListComponent),
      },
      {
        path: 'about-us-list',
        title: '',
        loadComponent: () =>
          import(
            './components/about-us/about-us-list/about-us-list.component'
          ).then((c) => c.AboutUsListComponent),
      },
      {
        path: 'about-us-form',
        title: '',
        loadComponent: () =>
          import(
            './components/about-us/about-us-form/about-us-form.component'
          ).then((c) => c.AboutUsFormComponent),
      },
      {
        path: 'about-us-details/:id',
        title: '',
        loadComponent: () =>
          import(
            './components/about-us/view-about-us-details/view-about-us-details.component'
          ).then((c) => c.ViewAboutUsDetailsComponent),
      },
      {
        path: 'our-service-list',
        title: '',
        loadComponent: () =>
          import(
            './components/our-services/our-service-list/our-service-list.component'
          ).then((c) => c.OurServiceListComponent),
      },
      {
        path: 'our-service-form',
        title: '',
        loadComponent: () =>
          import(
            './components/our-services/our-service-form/our-service-form.component'
          ).then((c) => c.OurServiceFormComponent),
      },
      {
        path: 'service-details/:id',
        title: '',
        loadComponent: () =>
          import(
            './components/our-services/view-service-details/view-service-details.component'
          ).then((c) => c.ViewServiceDetailsComponent),
      },
      {
        path: 'partner-list',
        title: '',
        loadComponent: () =>
          import(
            './components/partners/partner-list/partner-list.component'
          ).then((c) => c.PartnerListComponent),
      },
      {
        path: 'partner-form',
        title: '',
        loadComponent: () =>
          import(
            './components/partners/partner-form/partner-form.component'
          ).then((c) => c.PartnerFormComponent),
      },
      {
        path: 'partner-details/:id',
        title: '',
        loadComponent: () =>
          import(
            './components/partners/view-partner-datails/view-partner-datails.component'
          ).then((c) => c.ViewPartnerDatailsComponent),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
