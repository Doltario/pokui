import { Injectable } from '@angular/core';
import { Settings } from 'src/app/models/settings.type';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private readonly SETTINGS_KEY = 'settings';
  private defaultSettings: Settings = {
    darkTheme: false,
    pageSize: 20
  }

  constructor() {
    if (!this.getSettings()) this.setSettings(this.defaultSettings);
    this.loadTheme();
  }

  getSettings() {
    const settings = localStorage.getItem(this.SETTINGS_KEY);
    return JSON.parse(settings);
  }

  setSettings(settings: Settings) {
    localStorage.setItem(this.SETTINGS_KEY, JSON.stringify(settings))
  }

  loadTheme() {
    if (this.getSettings().darkTheme) {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
  }
}
