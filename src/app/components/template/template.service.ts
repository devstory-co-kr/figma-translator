import {
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
}
