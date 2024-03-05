import { Platform } from "../../params/platform.param";
import {
  PlatformLocale,
  PlatformRepository,
  PlatformService,
} from "./platform.interface";

export class PlatformServiceImpl implements PlatformService {
  constructor(private platformRepository: PlatformRepository) {}

  public getAllLocales(): {
    [platform in Platform]: PlatformLocale[];
  } {
    return this.platformRepository.locales;
  }

  public getLocales(platform: Platform): PlatformLocale[] {
    return this.platformRepository.locales[platform];
  }
}
