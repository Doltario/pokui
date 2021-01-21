import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings/settings.service'

@Component({
  selector: 'pokui-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  settings = this.settingsService.getSettings();

  constructor(private settingsService: SettingsService) { }

  ngOnInit(): void {
  }

  save() {
    this.settingsService.setSettings(this.settings);
  }
}
