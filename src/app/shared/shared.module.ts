import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogService } from 'primeng/dynamicdialog';
import { ToolbarModule } from 'primeng/toolbar';

import { ToolbarNavigationComponent } from './components/toolbar-navigation/toolbar-navigation.component';
import { ShortenPipe } from './pipes/shorten/shorten.pipe';

@NgModule({
  declarations: [ShortenPipe, ToolbarNavigationComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    // PrimeNg
    ButtonModule,
    CardModule,
    ToolbarModule,
  ],
  exports: [ShortenPipe, ToolbarNavigationComponent],
  providers: [DialogService, CurrencyPipe],
})
export class SharedModule {}
