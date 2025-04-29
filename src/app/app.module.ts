import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeroComponent } from './components/hero/hero.component';
import { CapabilitiesComponent } from './components/capabilities/capabilities.component';
import { QualityDrivenComponent } from './components/quality-driven/quality-driven.component';
import { AiFeaturesComponent } from './components/ai-features/ai-features.component';
import { IntelligentSummaryModalComponent } from './components/ai-features/intelligent-summary-modal/intelligent-summary-modal.component';
import { TestCaseValidationModalComponent } from './components/ai-features/test-case-validation-modal/test-case-validation-modal.component';
import { AdobeServicesComponent } from './components/adobe-services/adobe-services.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { CtaComponent } from './components/cta/cta.component';
import { FeatureCardComponent } from './shared/feature-card/feature-card.component';
import { HomeComponent } from './components/home/home.component';

// Feature modules
import { PerformanceLabModule } from './features/performance-lab/performance-lab.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HeroComponent,
    CapabilitiesComponent,
    QualityDrivenComponent,
    AiFeaturesComponent,
    IntelligentSummaryModalComponent,
    TestCaseValidationModalComponent,
    AdobeServicesComponent,
    TestimonialsComponent,
    CtaComponent,
    FeatureCardComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    PerformanceLabModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
