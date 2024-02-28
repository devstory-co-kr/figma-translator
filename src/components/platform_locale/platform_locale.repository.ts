import { Platform } from "../template/template.interface";
import { TranslatorLanguageRepository } from "../translator_language/translator_language.interface";
import {
  PlatformLocale,
  PlatformLocaleRepository,
} from "./platform_locale.interface";

export class PlatformLocaleRepositoryImpl implements PlatformLocaleRepository {
  constructor(
    private translatorLanguageRepository: TranslatorLanguageRepository
  ) {}
  public locales: {
    [platform in Platform]: PlatformLocale[];
  } = {
    [Platform.ios]: [
      {
        name: "Arabic",
        locale: "ar-SA",
        translatorLanguage: this.translatorLanguageRepository.arabic,
      },
      {
        name: "Catalan",
        locale: "ca",
        translatorLanguage: this.translatorLanguageRepository.catalan,
      },
      {
        name: "Chinese Simplified",
        locale: "zh-Hans",
        translatorLanguage: this.translatorLanguageRepository.chineseSimplified,
      },
      {
        name: "Chinese Traditional",
        locale: "zh-Hant",
        translatorLanguage:
          this.translatorLanguageRepository.chineseTraditional,
      },
      {
        name: "Croatian",
        locale: "hr",
        translatorLanguage: this.translatorLanguageRepository.croatian,
      },
      {
        name: "Czech",
        locale: "cs",
        translatorLanguage: this.translatorLanguageRepository.czech,
      },
      {
        name: "Danish",
        locale: "da",
        translatorLanguage: this.translatorLanguageRepository.danish,
      },
      {
        name: "Dutch",
        locale: "nl-NL",
        translatorLanguage: this.translatorLanguageRepository.dutch,
      },
      {
        name: "English Australia",
        locale: "en-AU",
        translatorLanguage: this.translatorLanguageRepository.english,
      },
      {
        name: "English Canada",
        locale: "en-CA",
        translatorLanguage: this.translatorLanguageRepository.english,
      },
      {
        name: "English U.K.",
        locale: "en-GB",
        translatorLanguage: this.translatorLanguageRepository.english,
      },
      {
        name: "English U.S.",
        locale: "en-US",
        translatorLanguage: this.translatorLanguageRepository.english,
      },
      {
        name: "Finnish",
        locale: "fi",
        translatorLanguage: this.translatorLanguageRepository.finnish,
      },
      {
        name: "French",
        locale: "fr-FR",
        translatorLanguage: this.translatorLanguageRepository.french,
      },
      {
        name: "French Canada",
        locale: "fr-CA",
        translatorLanguage: this.translatorLanguageRepository.french,
      },
      {
        name: "German",
        locale: "de-DE",
        translatorLanguage: this.translatorLanguageRepository.german,
      },
      {
        name: "Greek",
        locale: "el",
        translatorLanguage: this.translatorLanguageRepository.greek,
      },
      {
        name: "Hebrew",
        locale: "he",
        translatorLanguage: this.translatorLanguageRepository.hebrew,
      },
      {
        name: "Hindi",
        locale: "hi",
        translatorLanguage: this.translatorLanguageRepository.hindi,
      },
      {
        name: "Hungarian",
        locale: "hu",
        translatorLanguage: this.translatorLanguageRepository.hungarian,
      },
      {
        name: "Indonesian",
        locale: "id",
        translatorLanguage: this.translatorLanguageRepository.indonesian,
      },
      {
        name: "Italian",
        locale: "it",
        translatorLanguage: this.translatorLanguageRepository.italian,
      },
      {
        name: "Japanese",
        locale: "ja",
        translatorLanguage: this.translatorLanguageRepository.japanese,
      },
      {
        name: "Korean",
        locale: "ko",
        translatorLanguage: this.translatorLanguageRepository.korean,
      },
      {
        name: "Malay",
        locale: "ms",
        translatorLanguage: this.translatorLanguageRepository.malay,
      },
      {
        name: "Norwegian",
        locale: "no",
        translatorLanguage: this.translatorLanguageRepository.norwegian,
      },
      {
        name: "Polish",
        locale: "pl",
        translatorLanguage: this.translatorLanguageRepository.polish,
      },
      {
        name: "Portuguese Brazil",
        locale: "pt-BR",
        translatorLanguage: this.translatorLanguageRepository.portuguese,
      },
      {
        name: "Portuguese Portugal",
        locale: "pt-PT",
        translatorLanguage: this.translatorLanguageRepository.portuguese,
      },
      {
        name: "Romanian",
        locale: "ro",
        translatorLanguage: this.translatorLanguageRepository.romanian,
      },
      {
        name: "Russian",
        locale: "ru",
        translatorLanguage: this.translatorLanguageRepository.russian,
      },
      {
        name: "Slovak",
        locale: "sk",
        translatorLanguage: this.translatorLanguageRepository.slovak,
      },
      {
        name: "Spanish Mexico",
        locale: "es-MX",
        translatorLanguage: this.translatorLanguageRepository.spanish,
      },
      {
        name: "Spanish Spain",
        locale: "es-ES",
        translatorLanguage: this.translatorLanguageRepository.spanish,
      },
      {
        name: "Swedish",
        locale: "sv",
        translatorLanguage: this.translatorLanguageRepository.swedish,
      },
      {
        name: "Thai",
        locale: "th",
        translatorLanguage: this.translatorLanguageRepository.thai,
      },
      {
        name: "Turkish",
        locale: "tr",
        translatorLanguage: this.translatorLanguageRepository.turkish,
      },
      {
        name: "Ukrainian",
        locale: "uk",
        translatorLanguage: this.translatorLanguageRepository.ukrainian,
      },
      {
        name: "Vietnamese",
        locale: "vi",
        translatorLanguage: this.translatorLanguageRepository.vietnamese,
      },
    ],
    [Platform.android]: [
      {
        name: "Afrikaans",
        locale: "af",
        translatorLanguage: this.translatorLanguageRepository.afrikaans,
      },
      {
        name: "Albanian",
        locale: "sq",
        translatorLanguage: this.translatorLanguageRepository.albanian,
      },
      {
        name: "Amharic",
        locale: "am",
        translatorLanguage: this.translatorLanguageRepository.amharic,
      },
      {
        name: "Arabic",
        locale: "ar",
        translatorLanguage: this.translatorLanguageRepository.arabic,
      },
      {
        name: "Armenian",
        locale: "hy-AM",
        translatorLanguage: this.translatorLanguageRepository.armenian,
      },
      {
        name: "Azerbaijani",
        locale: "az-AZ",
        translatorLanguage: this.translatorLanguageRepository.azerbaijani,
      },
      {
        name: "Bangla",
        locale: "bn-BD",
        translatorLanguage: this.translatorLanguageRepository.bengali,
      },
      {
        name: "Basque",
        locale: "eu-ES",
        translatorLanguage: this.translatorLanguageRepository.basque,
      },
      {
        name: "Belarusian",
        locale: "be",
        translatorLanguage: this.translatorLanguageRepository.belarusian,
      },
      {
        name: "Bulgarian",
        locale: "bg",
        translatorLanguage: this.translatorLanguageRepository.bulgarian,
      },
      {
        name: "Burmese",
        locale: "my-MM",
        translatorLanguage: this.translatorLanguageRepository.myanmar,
      },
      {
        name: "Catalan",
        locale: "ca",
        translatorLanguage: this.translatorLanguageRepository.catalan,
      },
      {
        name: "Chinese Hong Kong",
        locale: "zh-HK",
        translatorLanguage:
          this.translatorLanguageRepository.chineseTraditional,
      },
      {
        name: "Chinese Simplified",
        locale: "zh-CN",
        translatorLanguage: this.translatorLanguageRepository.chineseSimplified,
      },
      {
        name: "Chinese Traditional",
        locale: "zh-TW",
        translatorLanguage:
          this.translatorLanguageRepository.chineseTraditional,
      },
      {
        name: "Croatian",
        locale: "hr",
        translatorLanguage: this.translatorLanguageRepository.croatian,
      },
      {
        name: "Czech",
        locale: "cs-CZ",
        translatorLanguage: this.translatorLanguageRepository.czech,
      },
      {
        name: "Danish",
        locale: "da-DK",
        translatorLanguage: this.translatorLanguageRepository.danish,
      },
      {
        name: "Dutch",
        locale: "nl-NL",
        translatorLanguage: this.translatorLanguageRepository.dutch,
      },
      {
        name: "English India",
        locale: "en-IN",
        translatorLanguage: this.translatorLanguageRepository.english,
      },
      {
        name: "English Singapore",
        locale: "en-SG",
        translatorLanguage: this.translatorLanguageRepository.english,
      },
      {
        name: "English South Africa",
        locale: "en-ZA",
        translatorLanguage: this.translatorLanguageRepository.english,
      },
      {
        name: "English Australia",
        locale: "en-AU",
        translatorLanguage: this.translatorLanguageRepository.english,
      },
      {
        name: "English Canada",
        locale: "en-CA",
        translatorLanguage: this.translatorLanguageRepository.english,
      },
      {
        name: "English United Kingdom",
        locale: "en-GB",
        translatorLanguage: this.translatorLanguageRepository.english,
      },
      {
        name: "English United States",
        locale: "en-US",
        translatorLanguage: this.translatorLanguageRepository.english,
      },
      {
        name: "Estonian",
        locale: "et",
        translatorLanguage: this.translatorLanguageRepository.estonian,
      },
      {
        name: "Filipino",
        locale: "fil",
        translatorLanguage: this.translatorLanguageRepository.tagalog,
      },
      {
        name: "Finnish",
        locale: "fi-FI",
        translatorLanguage: this.translatorLanguageRepository.finnish,
      },
      {
        name: "French Canada",
        locale: "fr-CA",
        translatorLanguage: this.translatorLanguageRepository.french,
      },
      {
        name: "French France",
        locale: "fr-FR",
        translatorLanguage: this.translatorLanguageRepository.french,
      },
      {
        name: "Galician",
        locale: "gl-ES",
        translatorLanguage: this.translatorLanguageRepository.galician,
      },
      {
        name: "Georgian",
        locale: "ka-GE",
        translatorLanguage: this.translatorLanguageRepository.georgian,
      },
      {
        name: "German",
        locale: "de-DE",
        translatorLanguage: this.translatorLanguageRepository.german,
      },
      {
        name: "Greek",
        locale: "el-GR",
        translatorLanguage: this.translatorLanguageRepository.greek,
      },
      {
        name: "Gujarati",
        locale: "gu",
        translatorLanguage: this.translatorLanguageRepository.gujarati,
      },
      {
        name: "Hebrew",
        locale: "iw-IL",
        translatorLanguage: this.translatorLanguageRepository.hebrew,
      },
      {
        name: "Hindi",
        locale: "hi-IN",
        translatorLanguage: this.translatorLanguageRepository.hindi,
      },
      {
        name: "Hungarian",
        locale: "hu-HU",
        translatorLanguage: this.translatorLanguageRepository.hungarian,
      },
      {
        name: "Icelandic",
        locale: "is-IS",
        translatorLanguage: this.translatorLanguageRepository.icelandic,
      },
      {
        name: "Indonesian",
        locale: "id",
        translatorLanguage: this.translatorLanguageRepository.indonesian,
      },
      {
        name: "Italian",
        locale: "it-IT",
        translatorLanguage: this.translatorLanguageRepository.italian,
      },
      {
        name: "Japanese",
        locale: "ja-JP",
        translatorLanguage: this.translatorLanguageRepository.japanese,
      },
      {
        name: "Kannada",
        locale: "kn-IN",
        translatorLanguage: this.translatorLanguageRepository.kannada,
      },
      {
        name: "Kazakh",
        locale: "kk",
        translatorLanguage: this.translatorLanguageRepository.kazakh,
      },
      {
        name: "Khmer",
        locale: "km-KH",
        translatorLanguage: this.translatorLanguageRepository.khmer,
      },
      {
        name: "Korean",
        locale: "ko-KR",
        translatorLanguage: this.translatorLanguageRepository.korean,
      },
      {
        name: "Kyrgyz",
        locale: "ky-KG",
        translatorLanguage: this.translatorLanguageRepository.kyrgyz,
      },
      {
        name: "Lao",
        locale: "lo-LA",
        translatorLanguage: this.translatorLanguageRepository.lao,
      },
      {
        name: "Latvian",
        locale: "lv",
        translatorLanguage: this.translatorLanguageRepository.latvian,
      },
      {
        name: "Lithuanian",
        locale: "lt",
        translatorLanguage: this.translatorLanguageRepository.lithuanian,
      },
      {
        name: "Macedonian",
        locale: "mk-MK",
        translatorLanguage: this.translatorLanguageRepository.macedonian,
      },
      {
        name: "Malay",
        locale: "ms",
        translatorLanguage: this.translatorLanguageRepository.malay,
      },
      {
        name: "Malay Malaysia",
        locale: "ms-MY",
        translatorLanguage: this.translatorLanguageRepository.malay,
      },
      {
        name: "Malayalam",
        locale: "ml-IN",
        translatorLanguage: this.translatorLanguageRepository.malayalam,
      },
      {
        name: "Marathi",
        locale: "mr-IN",
        translatorLanguage: this.translatorLanguageRepository.marathi,
      },
      {
        name: "Mongolian",
        locale: "mn-MN",
        translatorLanguage: this.translatorLanguageRepository.mongolian,
      },
      {
        name: "Nepali",
        locale: "ne-NP",
        translatorLanguage: this.translatorLanguageRepository.nepali,
      },
      {
        name: "Norwegian",
        locale: "no-NO",
        translatorLanguage: this.translatorLanguageRepository.norwegian,
      },
      {
        name: "Persian",
        locale: "fa",
        translatorLanguage: this.translatorLanguageRepository.persian,
      },
      {
        name: "Persian Arab Emirates",
        locale: "fa-AE",
        translatorLanguage: this.translatorLanguageRepository.persian,
      },
      {
        name: "Persian Afghanistan",
        locale: "fa-AF",
        translatorLanguage: this.translatorLanguageRepository.persian,
      },
      {
        name: "Persian Iran",
        locale: "fa-IR",
        translatorLanguage: this.translatorLanguageRepository.persian,
      },
      {
        name: "Polish",
        locale: "pl-PL",
        translatorLanguage: this.translatorLanguageRepository.polish,
      },
      {
        name: "Portuguese Brazil",
        locale: "pt-BR",
        translatorLanguage: this.translatorLanguageRepository.portuguese,
      },
      {
        name: "Portuguese Portugal",
        locale: "pt-PT",
        translatorLanguage: this.translatorLanguageRepository.portuguese,
      },
      {
        name: "Punjabi",
        locale: "pa",
        translatorLanguage: this.translatorLanguageRepository.punjabi,
      },
      {
        name: "Romanian",
        locale: "ro",
        translatorLanguage: this.translatorLanguageRepository.romanian,
      },
      {
        name: "Russian",
        locale: "ru-RU",
        translatorLanguage: this.translatorLanguageRepository.russian,
      },
      {
        name: "Serbian",
        locale: "sr",
        translatorLanguage: this.translatorLanguageRepository.serbian,
      },
      {
        name: "Sinhala",
        locale: "si-LK",
        translatorLanguage: this.translatorLanguageRepository.sinhala,
      },
      {
        name: "Slovak",
        locale: "sk",
        translatorLanguage: this.translatorLanguageRepository.slovak,
      },
      {
        name: "Slovenian",
        locale: "sl",
        translatorLanguage: this.translatorLanguageRepository.slovenian,
      },
      {
        name: "Spanish Latin America",
        locale: "es-419",
        translatorLanguage: this.translatorLanguageRepository.spanish,
      },
      {
        name: "Spanish Spain",
        locale: "es-ES",
        translatorLanguage: this.translatorLanguageRepository.spanish,
      },
      {
        name: "Spanish United States",
        locale: "es-US",
        translatorLanguage: this.translatorLanguageRepository.spanish,
      },
      {
        name: "Swahili",
        locale: "sw",
        translatorLanguage: this.translatorLanguageRepository.swahili,
      },
      {
        name: "Swedish",
        locale: "sv-SE",
        translatorLanguage: this.translatorLanguageRepository.swedish,
      },
      {
        name: "Tamil",
        locale: "ta-IN",
        translatorLanguage: this.translatorLanguageRepository.tamil,
      },
      {
        name: "Telugu",
        locale: "te-IN",
        translatorLanguage: this.translatorLanguageRepository.telugu,
      },
      {
        name: "Thai",
        locale: "th",
        translatorLanguage: this.translatorLanguageRepository.thai,
      },
      {
        name: "Turkish",
        locale: "tr-TR",
        translatorLanguage: this.translatorLanguageRepository.turkish,
      },
      {
        name: "Ukrainian",
        locale: "uk",
        translatorLanguage: this.translatorLanguageRepository.ukrainian,
      },
      {
        name: "Urdu",
        locale: "ur",
        translatorLanguage: this.translatorLanguageRepository.urdu,
      },
      {
        name: "Vietnamese",
        locale: "vi",
        translatorLanguage: this.translatorLanguageRepository.vietnamese,
      },
      {
        name: "Zulu",
        locale: "zu",
        translatorLanguage: this.translatorLanguageRepository.zulu,
      },
    ],
  };
}
