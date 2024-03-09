import { Notification } from "../../util/notification";
import { TranslatorCacheService } from "../components/translator/cache/translator_cache.interface";
import { Cmd } from "./cmd";

export class DeleteTranslationCacheCmd implements Cmd {
  constructor(private translatorCacheService: TranslatorCacheService) {}

  public async onRun(args: any): Promise<void> {
    const nDeleted = await this.translatorCacheService.clear();
    Notification.i(`${nDeleted} translation cache deleted.`);
  }

  public async onMessage(
    message: any,
    props: OnMessageProperties
  ): Promise<void> {}
}
