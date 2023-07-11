import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SidebarComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { appReducer } from '../../../IM-FE-libs/store/states/app.states';

@NgModule({
  declarations: [
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([]),
    HttpClientModule,
    // StoreModule.forRoot(appReducer),
    StoreModule.forFeature('sidebar', appReducer),
  ],
  providers: [],
  bootstrap: [SidebarComponent]
})
export class AppModule { }
