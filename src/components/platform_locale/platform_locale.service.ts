import { Platform } from "../template/template.interface";
import {
  PlatformLocale,
  PlatformLocaleRepository,
  PlatformLocaleService,
} from "./platform_locale.interface";

export class PlatformLocaleServiceImpl implements PlatformLocaleService {
  constructor(private platformLocaleRepository: PlatformLocaleRepository) {}

  public getLocale(platform: Platform): PlatformLocale[] {
    return this.platformLocaleRepository.locales[platform];
  }
}
