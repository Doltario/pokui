import { Injectable } from '@angular/core';
import { Settings } from 'src/app/models/settings.type';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private defaultSettings: Settings = {
    darkTheme: false,
    pageSize: 20
  }

  constructor() {
    if (!this.getSettings()) {
      this.setSettings(this.defaultSettings);
    }
  }

  getSettings() {
    const settings = localStorage.getItem('settings');
    return JSON.parse(settings);
  }

  setSettings(settings: Settings) {
    localStorage.setItem('settings', JSON.stringify(settings))
  }
}
