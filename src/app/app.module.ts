import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SidebarComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { appReducer } from '../../../libs/store/states/app.states';

@NgModule({
  declarations: [
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([]),
    // StoreModule.forRoot(appReducer),
    StoreModule.forFeature('sidebar', appReducer),
  ],
  providers: [],
  bootstrap: [SidebarComponent]
})
export class AppModule { }
