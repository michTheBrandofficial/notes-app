import { UserSettings } from "@/database/settings";
import { Component } from "nixix/dom";

export default class SettingsLayer extends Component {
  settings = new UserSettings()._settings;
}
