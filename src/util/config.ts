import { TranslateLanguageServiceImpl } from "../components/translator_language/translate_language.service";

interface ConfigData {
  googleAPIKey: string;
  fromLang: Record<string, string>;
}

export class Config {
  private _initData: ConfigData = {
    googleAPIKey: "",
    fromLang: TranslateLanguageServiceImpl.defaultSelectedLanguage,
  };

  private _data: ConfigData;

  get data(): ConfigData {
    return this._data;
  }

  private _key: string;

  constructor(name: string, figma: PluginAPI) {
    this._key = `${name}.config`;
    this._data = this._initData;
    figma.clientStorage.getAsync(this._key).then((value) => {
      this._data = value ?? this._initData;
    });
  }

  async update(figma: PluginAPI, data: ConfigData) {
    await figma.clientStorage.setAsync(this._key, data);
    this._data = {
      ...data,
    };
  }

  async reset(figma: PluginAPI) {
    this.update(figma, this._initData);
  }
}
