import { Platform } from "../template/template.interface";
import {
  PlatformLocale,
  PlatformRepository,
  PlatformService,
} from "./platform.interface";

export class PlatformServiceImpl implements PlatformService {
  constructor(private platformRepository: PlatformRepository) {}

  public getLocale(platform: Platform): PlatformLocale[] {
    return this.platformRepository.locales[platform];
  }
}
