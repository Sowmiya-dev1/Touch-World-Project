import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { ApiIntegrationComponent } from '../pages/api-integration/api-integration.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatTableModule, // Import the material table module
    HttpClientModule, // Import HttpClientModule to make HTTP requests
    ApiIntegrationComponent
  ],
})
export class FeatureModule {}
