import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings/settings.service';
import { Settings } from 'src/app/models/settings.type';

@Component({
  selector: 'pokui-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  settings: Settings;
  unsaved: boolean = false;

  constructor(private settingsService: SettingsService) { }

  ngOnInit(): void {
    this.initSettings();
  }

  private initSettings(): void {
    this.settings = this.settingsService.getSettings();
  }

  settingsChanged(): void {
    if (!this.unsaved) this.unsaved = true;
  }

  save(): void {
    this.settingsService.setSettings(this.settings);
    this.unsaved = false;
    this.settingsService.loadTheme();
  }

  discard(): void {
    this.initSettings();
    this.unsaved = false;
  }

  canDeactivate(): boolean {
    if (!this.unsaved) return true;
    return confirm('Do you want to leave without saving ?');
  }
}
