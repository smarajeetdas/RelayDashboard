import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { CapabilitiesComponent } from './components/capabilities/capabilities.component';
import { QualityDrivenComponent } from './components/quality-driven/quality-driven.component';
import { AiFeaturesComponent } from './components/ai-features/ai-features.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { CtaComponent } from './components/cta/cta.component';
import { FeatureCardComponent } from './shared/feature-card/feature-card.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeroComponent,
    CapabilitiesComponent,
    QualityDrivenComponent,
    AiFeaturesComponent,
    TestimonialsComponent,
    CtaComponent,
    FeatureCardComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
