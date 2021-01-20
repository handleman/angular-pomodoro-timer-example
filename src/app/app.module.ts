import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './pages/index/index.component';
import { ConfigComponent } from './pages/config/config.component';
import { ButtonComponent } from './components/button/button.component';
import { NavComponent } from './components/nav/nav.component';
import { PomodoroComponent } from './components/pomodoro/pomodoro.component';
import { TimerControlsPanelComponent } from './components/timer-controls-panel/timer-controls-panel.component';

import { StoreModule } from '@ngrx/store';
import { reducer as timerReducer } from './store/timer.reducer';
import { reducer as countDownReducer } from './store/countDown.reducer';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    ConfigComponent,
    ButtonComponent,
    NavComponent,
    PomodoroComponent,
    TimerControlsPanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ timer: timerReducer, countDown: countDownReducer })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
