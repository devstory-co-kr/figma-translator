import { PlatformLocale } from "../platform/platform.interface";
import {
  Frame,
  Platform,
  Template,
  TemplateRepository,
  TemplateService,
} from "./template.interface";

export class TemplateServiceImpl implements TemplateService {
  constructor(private templateRepository: TemplateRepository) {}

  public getTemplates(platform: Platform): Template[] {
    return this.templateRepository.templates[platform];
  }

  public getFrameName(
    platformLocale: PlatformLocale,
    frame: Frame,
    index: number
  ): string {
    const locale = this.templateRepository.locale;
    const count = this.templateRepository.count;
    return frame.name
      .replace(new RegExp(locale, "g"), platformLocale.locale)
      .replace(new RegExp(count, "g"), `${index}`);
  }
}
