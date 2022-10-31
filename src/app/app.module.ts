import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddPersonDialogComponent } from './singleton/add-person-dialog/add-person-dialog.component';
import { ChooseFileDialogComponent } from './singleton/choose-file-dialog/choose-file-dialog.component';
import { ResponseDialogComponent } from './singleton/response-dialog/response-dialog.component';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { ConfirmDialogComponent } from './singleton/confirm-dialog/confirm-dialog.component';

export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    AppComponent,
    AddPersonDialogComponent,
    ChooseFileDialogComponent,
    ResponseDialogComponent,
    ConfirmDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    LottieModule.forRoot({ player: playerFactory }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
