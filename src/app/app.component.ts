import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit, OnDestroy {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home-outline', short: 'H' },
    { title: 'About', url: '/about', icon: 'leaf-outline', short: 'A' },
    { title: 'Problem', url: '/problem', icon: 'alert-circle-outline', short: 'P' },
    { title: 'Solutions', url: '/solutions', icon: 'flask-outline', short: 'S' },
    { title: 'Ecosystem', url: '/ecosystem', icon: 'git-network-outline', short: 'E' },
    { title: 'Impact', url: '/impact', icon: 'trending-up-outline', short: 'I' },
    { title: 'Research', url: '/research', icon: 'library-outline', short: 'R' },
    { title: 'Contact', url: '/contact', icon: 'chatbubble-ellipses-outline', short: 'C' },
  ];
  public heroFilters = ['Food Security', 'Biotechnology', 'Alternative Proteins', 'Climate Resilience'];
  isDark = true;
  showScrollTop = false;
  isTabletNavOpen = false;
  redesignPreview = false;
  private scrollCleanup: (() => void) | null = null;
  private routerSub?: Subscription;
  private readonly router = inject(Router);

  ngOnInit() {
    const saved = localStorage.getItem('bio-theme');
    this.isDark = saved !== 'light';
    this.applyTheme();
    this.syncRedesignModeFromUrlOrStorage();
    this.bindScrollForActivePage();
    this.routerSub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isTabletNavOpen = false;
        this.syncRedesignModeFromUrlOrStorage();
        this.bindScrollForActivePage();
      }
    });
  }

  ngOnDestroy() {
    this.routerSub?.unsubscribe();
    if (this.scrollCleanup) {
      this.scrollCleanup();
      this.scrollCleanup = null;
    }
  }

  toggleTheme() {
    this.isDark = !this.isDark;
    localStorage.setItem('bio-theme', this.isDark ? 'dark' : 'light');
    this.applyTheme();
  }

  toggleTabletNav() {
    this.isTabletNavOpen = !this.isTabletNavOpen;
  }

  closeTabletNav() {
    this.isTabletNavOpen = false;
  }

  private applyTheme() {
    const root = document.documentElement;
    const body = document.body;

    if (this.isDark) {
      root.classList.remove('light-mode');
      root.classList.add('dark-mode');
      body.classList.remove('light-mode');
      body.classList.add('dark-mode');
    } else {
      root.classList.remove('dark-mode');
      root.classList.add('light-mode');
      body.classList.remove('dark-mode');
      body.classList.add('light-mode');
    }
  }

  private syncRedesignModeFromUrlOrStorage() {
    const url = this.router.parseUrl(this.router.url);
    const qp = url.queryParams ?? {};
    const param = qp['v2'];

    if (param === '1') {
      localStorage.setItem('bio-redesign-v2', '1');
    }

    if (param === '0') {
      localStorage.removeItem('bio-redesign-v2');
    }

    const enabled = localStorage.getItem('bio-redesign-v2') === '1';
    this.redesignPreview = enabled;

    const root = document.documentElement;
    const body = document.body;
    root.classList.toggle('redesign-v2', enabled);
    body.classList.toggle('redesign-v2', enabled);
  }

  private bindScrollForActivePage() {
    if (this.scrollCleanup) {
      this.scrollCleanup();
      this.scrollCleanup = null;
    }

    window.setTimeout(() => {
      const contentEl = document.querySelector('ion-router-outlet ion-content') as any;
      if (contentEl) {
        contentEl.scrollEvents = true;
        contentEl.getScrollElement().then((scrollEl: HTMLElement) => {
          const onScroll = () => {
            this.showScrollTop = scrollEl.scrollTop > 300;
          };
          scrollEl.addEventListener('scroll', onScroll, { passive: true });
          onScroll();
          this.scrollCleanup = () => scrollEl.removeEventListener('scroll', onScroll);
        });
      }
    }, 500);
  }

  async scrollToTop() {
    const contentEl: any = document.querySelector('ion-router-outlet ion-content');
    if (contentEl?.scrollToTop) {
      await contentEl.scrollToTop(500);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
