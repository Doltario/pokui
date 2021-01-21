import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings/settings.service';
import { Settings } from 'src/app/models/settings.type';

@Component({
  selector: 'pokui-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  settings: Settings = this.settingsService.getSettings();
  unsaved: boolean = false;

  constructor(private settingsService: SettingsService) { }

  ngOnInit(): void {
  }

  settingsChanged() {
    if (!this.unsaved) this.unsaved = true;
  }

  save() {
    this.settingsService.setSettings(this.settings);
    this.unsaved = false;
  }

  canDeactivate() {
    if (!this.unsaved) return true;
    return confirm('Do you want to leave without saving ?');
  }
}
