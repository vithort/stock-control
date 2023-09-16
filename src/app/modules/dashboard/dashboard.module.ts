import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { MessageService } from 'primeng/api';
import { SidebarModule } from 'primeng/sidebar';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';

import { CookieService } from 'ngx-cookie-service';

import { DashboardHomeComponent } from './page/dashboard-home/dashboard-home.component';
import { DASHBOARD_ROUTES } from './dashboard.routing';

@NgModule({
  declarations: [DashboardHomeComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(DASHBOARD_ROUTES),
    // PrimeNg
    ButtonModule,
    CardModule,
    ChartModule,
    SidebarModule,
    ToastModule,
    ToolbarModule,
  ],
  providers: [MessageService, CookieService],
})
export class DashboardModule {}
