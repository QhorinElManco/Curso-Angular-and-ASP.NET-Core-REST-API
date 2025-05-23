import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '@features/auth/services/auth.service';
import {User} from '@features/auth/models/user.model';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  user?: User = undefined;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.authService.user().subscribe(user => this.user = user);

    this.user = this.authService.getUser();
  }

  onLogout(): void {
    this.authService.logout()
    this.router.navigateByUrl('/').then((r) => r)
  }

  isShowAdminPanel = (): boolean => this.user !== undefined && this.user.roles.includes("Writer");
}
