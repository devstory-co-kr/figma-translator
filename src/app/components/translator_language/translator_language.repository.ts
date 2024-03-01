import { TranslatorLanguageEntity } from "./translator_language";
import {
  TranslatorLanguage,
  TranslatorLanguageRepository,
} from "./translator_language.interface";

export class TranslatorLanguageRepositoryImpl
  implements TranslatorLanguageRepository
{
  public afrikaans = new TranslatorLanguageEntity({
    locale: "af",
    name: "Afrikaans",
  });
  public albanian = new TranslatorLanguageEntity({
    locale: "sq",
    name: "Albanian",
  });
  public amharic = new TranslatorLanguageEntity({
    locale: "am",
    name: "Amharic",
  });
  public arabic = new TranslatorLanguageEntity({
    locale: "ar",
    name: "Arabic",
  });
  public armenian = new TranslatorLanguageEntity({
    locale: "hy",
    name: "Armenian",
  });
  public assamese = new TranslatorLanguageEntity({
    locale: "as",
    name: "Assamese",
  });
  public aymara = new TranslatorLanguageEntity({
    locale: "ay",
    name: "Aymara",
  });
  public azerbaijani = new TranslatorLanguageEntity({
    locale: "az",
    name: "Azerbaijani",
  });
  public bambara = new TranslatorLanguageEntity({
    locale: "bm",
    name: "Bambara",
  });
  public basque = new TranslatorLanguageEntity({
    locale: "eu",
    name: "Basque",
  });
  public belarusian = new TranslatorLanguageEntity({
    locale: "be",
    name: "Belarusian",
  });
  public bengali = new TranslatorLanguageEntity({
    locale: "bn",
    name: "Bengali",
  });
  public bhojpuri = new TranslatorLanguageEntity({
    locale: "bho",
    name: "Bhojpuri",
  });
  public bosnian = new TranslatorLanguageEntity({
    locale: "bs",
    name: "Bosnian",
  });
  public bulgarian = new TranslatorLanguageEntity({
    locale: "bg",
    name: "Bulgarian",
  });
  public catalan = new TranslatorLanguageEntity({
    locale: "ca",
    name: "Catalan",
  });
  public cebuano = new TranslatorLanguageEntity({
    locale: "ceb",
    name: "Cebuano",
  });
  public chineseSimplified = new TranslatorLanguageEntity({
    locale: "zh-CN",
    name: "Chinese Simplified",
  });
  public chineseTraditional = new TranslatorLanguageEntity({
    locale: "zh-TW",
    name: "Chinese Traditional",
  });
  public corsican = new TranslatorLanguageEntity({
    locale: "co",
    name: "Corsican",
  });
  public croatian = new TranslatorLanguageEntity({
    locale: "hr",
    name: "Croatian",
  });
  public czech = new TranslatorLanguageEntity({
    locale: "cs",
    name: "Czech",
  });
  public danish = new TranslatorLanguageEntity({
    locale: "da",
    name: "Danish",
  });
  public dhivehi = new TranslatorLanguageEntity({
    locale: "dv",
    name: "Dhivehi",
  });
  public dogri = new TranslatorLanguageEntity({
    locale: "doi",
    name: "Dogri",
  });
  public dutch = new TranslatorLanguageEntity({
    locale: "nl",
    name: "Dutch",
  });
  public english = new TranslatorLanguageEntity({
    locale: "en",
    name: "English",
  });
  public esperanto = new TranslatorLanguageEntity({
    locale: "eo",
    name: "Esperanto",
  });
  public estonian = new TranslatorLanguageEntity({
    locale: "et",
    name: "Estonian",
  });
  public ewe = new TranslatorLanguageEntity({
    locale: "ee",
    name: "Ewe",
  });
  public filipino = new TranslatorLanguageEntity({
    locale: "fil",
    name: "Filipino",
  });
  public finnish = new TranslatorLanguageEntity({
    locale: "fi",
    name: "Finnish",
  });
  public french = new TranslatorLanguageEntity({
    locale: "fr",
    name: "French",
  });
  public frisian = new TranslatorLanguageEntity({
    locale: "fy",
    name: "Frisian",
  });
  public galician = new TranslatorLanguageEntity({
    locale: "gl",
    name: "Galician",
  });
  public georgian = new TranslatorLanguageEntity({
    locale: "ka",
    name: "Georgian",
  });
  public german = new TranslatorLanguageEntity({
    locale: "de",
    name: "German",
  });
  public greek = new TranslatorLanguageEntity({
    locale: "el",
    name: "Greek",
  });
  public guarani = new TranslatorLanguageEntity({
    locale: "gn",
    name: "Guarani",
  });
  public gujarati = new TranslatorLanguageEntity({
    locale: "gu",
    name: "Gujarati",
  });
  public haitianCreole = new TranslatorLanguageEntity({
    locale: "ht",
    name: "Haitian Creole",
  });
  public hausa = new TranslatorLanguageEntity({
    locale: "ha",
    name: "Hausa",
  });
  public hawaiian = new TranslatorLanguageEntity({
    locale: "haw",
    name: "Hawaiian",
  });
  public hebrew = new TranslatorLanguageEntity({
    locale: "iw",
    name: "Hebrew",
  });
  public hindi = new TranslatorLanguageEntity({
    locale: "hi",
    name: "Hindi",
  });
  public hmong = new TranslatorLanguageEntity({
    locale: "hmn",
    name: "Hmong",
  });
  public hungarian = new TranslatorLanguageEntity({
    locale: "hu",
    name: "Hungarian",
  });
  public icelandic = new TranslatorLanguageEntity({
    locale: "is",
    name: "Icelandic",
  });
  public igbo = new TranslatorLanguageEntity({
    locale: "ig",
    name: "Igbo",
  });
  public ilocano = new TranslatorLanguageEntity({
    locale: "ilo",
    name: "Ilocano",
  });
  public indonesian = new TranslatorLanguageEntity({
    locale: "id",
    name: "Indonesian",
  });
  public irish = new TranslatorLanguageEntity({
    locale: "ga",
    name: "Irish",
  });
  public italian = new TranslatorLanguageEntity({
    locale: "it",
    name: "Italian",
  });
  public japanese = new TranslatorLanguageEntity({
    locale: "ja",
    name: "Japanese",
  });
  public javanese = new TranslatorLanguageEntity({
    locale: "jw",
    name: "Javanese",
  });
  public kannada = new TranslatorLanguageEntity({
    locale: "kn",
    name: "Kannada",
  });
  public kazakh = new TranslatorLanguageEntity({
    locale: "kk",
    name: "Kazakh",
  });
  public khmer = new TranslatorLanguageEntity({
    locale: "km",
    name: "Khmer",
  });
  public kinyarwanda = new TranslatorLanguageEntity({
    locale: "rw",
    name: "Kinyarwanda",
  });
  public konkani = new TranslatorLanguageEntity({
    locale: "gom",
    name: "Konkani",
  });
  public korean = new TranslatorLanguageEntity({
    locale: "ko",
    name: "Korean",
  });
  public krio = new TranslatorLanguageEntity({
    locale: "kri",
    name: "Krio",
  });
  public kurdish = new TranslatorLanguageEntity({
    locale: "ku",
    name: "Kurdish",
  });
  public kurdishSorani = new TranslatorLanguageEntity({
    locale: "ckb",
    name: "KurdishSorani",
  });
  public kyrgyz = new TranslatorLanguageEntity({
    locale: "ky",
    name: "Kyrgyz",
  });
  public lao = new TranslatorLanguageEntity({
    locale: "lo",
    name: "Lao",
  });
  public latin = new TranslatorLanguageEntity({
    locale: "la",
    name: "Latin",
  });
  public latvian = new TranslatorLanguageEntity({
    locale: "lv",
    name: "Latvian",
  });
  public lingala = new TranslatorLanguageEntity({
    locale: "ln",
    name: "Lingala",
  });
  public lithuanian = new TranslatorLanguageEntity({
    locale: "lt",
    name: "Lithuanian",
  });
  public luganda = new TranslatorLanguageEntity({
    locale: "lg",
    name: "Luganda",
  });
  public luxembourgish = new TranslatorLanguageEntity({
    locale: "lb",
    name: "Luxembourgish",
  });
  public macedonian = new TranslatorLanguageEntity({
    locale: "mk",
    name: "Macedonian",
  });
  public maithili = new TranslatorLanguageEntity({
    locale: "mai",
    name: "Maithili",
  });
  public malagasy = new TranslatorLanguageEntity({
    locale: "mg",
    name: "Malagasy",
  });
  public malay = new TranslatorLanguageEntity({
    locale: "ms",
    name: "Malay",
  });
  public malayalam = new TranslatorLanguageEntity({
    locale: "ml",
    name: "Malayalam",
  });
  public maltese = new TranslatorLanguageEntity({
    locale: "mt",
    name: "Maltese",
  });
  public maori = new TranslatorLanguageEntity({
    locale: "mi",
    name: "Maori",
  });
  public marathi = new TranslatorLanguageEntity({
    locale: "mr",
    name: "Marathi",
  });
  public meiteilon = new TranslatorLanguageEntity({
    locale: "mni-Mtei",
    name: "Meiteilon",
  });
  public mizo = new TranslatorLanguageEntity({
    locale: "lus",
    name: "Mizo",
  });
  public mongolian = new TranslatorLanguageEntity({
    locale: "mn",
    name: "Mongolian",
  });
  public myanmar = new TranslatorLanguageEntity({
    locale: "my",
    name: "Myanmar",
  });
  public nepali = new TranslatorLanguageEntity({
    locale: "ne",
    name: "Nepali",
  });
  public norwegian = new TranslatorLanguageEntity({
    locale: "no",
    name: "Norwegian",
  });
  public nyanja = new TranslatorLanguageEntity({
    locale: "ny",
    name: "Nyanja",
  });
  public odia = new TranslatorLanguageEntity({
    locale: "or",
    name: "Odia",
  });
  public oromo = new TranslatorLanguageEntity({
    locale: "om",
    name: "Oromo",
  });
  public pashto = new TranslatorLanguageEntity({
    locale: "ps",
    name: "Pashto",
  });
  public persian = new TranslatorLanguageEntity({
    locale: "fa",
    name: "Persian",
  });
  public polish = new TranslatorLanguageEntity({
    locale: "pl",
    name: "Polish",
  });
  public portuguese = new TranslatorLanguageEntity({
    locale: "pt",
    name: "Portuguese",
  });
  public punjabi = new TranslatorLanguageEntity({
    locale: "pa",
    name: "Punjabi",
  });
  public quechua = new TranslatorLanguageEntity({
    locale: "qu",
    name: "Quechua",
  });
  public romanian = new TranslatorLanguageEntity({
    locale: "ro",
    name: "Romanian",
  });
  public russian = new TranslatorLanguageEntity({
    locale: "ru",
    name: "Russian",
  });
  public samoan = new TranslatorLanguageEntity({
    locale: "sm",
    name: "Samoan",
  });
  public sanskrit = new TranslatorLanguageEntity({
    locale: "sa",
    name: "Sanskrit",
  });
  public scotsGaelic = new TranslatorLanguageEntity({
    locale: "gd",
    name: "Scots Gaelic",
  });
  public sepedi = new TranslatorLanguageEntity({
    locale: "nso",
    name: "Sepedi",
  });
  public serbian = new TranslatorLanguageEntity({
    locale: "sr",
    name: "Serbian",
  });
  public sesotho = new TranslatorLanguageEntity({
    locale: "st",
    name: "Sesotho",
  });
  public shona = new TranslatorLanguageEntity({
    locale: "sn",
    name: "Shona",
  });
  public sindhi = new TranslatorLanguageEntity({
    locale: "sd",
    name: "Sindhi",
  });
  public sinhala = new TranslatorLanguageEntity({
    locale: "si",
    name: "Sinhala",
  });
  public slovak = new TranslatorLanguageEntity({
    locale: "sk",
    name: "Slovak",
  });
  public slovenian = new TranslatorLanguageEntity({
    locale: "sl",
    name: "Slovenian",
  });
  public somali = new TranslatorLanguageEntity({
    locale: "so",
    name: "Somali",
  });
  public spanish = new TranslatorLanguageEntity({
    locale: "es",
    name: "Spanish",
  });
  public sundanese = new TranslatorLanguageEntity({
    locale: "su",
    name: "Sundanese",
  });
  public swahili = new TranslatorLanguageEntity({
    locale: "sw",
    name: "Swahili",
  });
  public swedish = new TranslatorLanguageEntity({
    locale: "sv",
    name: "Swedish",
  });
  public tagalog = new TranslatorLanguageEntity({
    locale: "tl",
    name: "Tagalog",
  });
  public tajik = new TranslatorLanguageEntity({
    locale: "tg",
    name: "Tajik",
  });
  public tamil = new TranslatorLanguageEntity({
    locale: "ta",
    name: "Tamil",
  });
  public tatar = new TranslatorLanguageEntity({
    locale: "tt",
    name: "Tatar",
  });
  public telugu = new TranslatorLanguageEntity({
    locale: "te",
    name: "Telugu",
  });
  public thai = new TranslatorLanguageEntity({
    locale: "th",
    name: "Thai",
  });
  public tigrinya = new TranslatorLanguageEntity({
    locale: "ti",
    name: "Tigrinya",
  });
  public tsonga = new TranslatorLanguageEntity({
    locale: "ts",
    name: "Tsonga",
  });
  public turkish = new TranslatorLanguageEntity({
    locale: "tr",
    name: "Turkish",
  });
  public turkmen = new TranslatorLanguageEntity({
    locale: "tk",
    name: "Turkmen",
  });
  public twi = new TranslatorLanguageEntity({
    locale: "ak",
    name: "Twi",
  });
  public ukrainian = new TranslatorLanguageEntity({
    locale: "uk",
    name: "Ukrainian",
  });
  public urdu = new TranslatorLanguageEntity({
    locale: "ur",
    name: "Urdu",
  });
  public uyghur = new TranslatorLanguageEntity({
    locale: "ug",
    name: "Uyghur",
  });
  public uzbek = new TranslatorLanguageEntity({
    locale: "uz",
    name: "Uzbek",
  });
  public vietnamese = new TranslatorLanguageEntity({
    locale: "vi",
    name: "Vietnamese",
  });
  public welsh = new TranslatorLanguageEntity({
    locale: "cy",
    name: "Welsh",
  });
  public xhosa = new TranslatorLanguageEntity({
    locale: "xh",
    name: "Xhosa",
  });
  public yiddish = new TranslatorLanguageEntity({
    locale: "yi",
    name: "Yiddish",
  });
  public yoruba = new TranslatorLanguageEntity({
    locale: "yo",
    name: "Yoruba",
  });
  public zulu = new TranslatorLanguageEntity({
    locale: "zu",
    name: "Zulu",
  });

  public supportLanguages: TranslatorLanguage[] = [
    this.afrikaans,
    this.albanian,
    this.amharic,
    this.arabic,
    this.armenian,
    this.assamese,
    this.aymara,
    this.azerbaijani,
    this.bambara,
    this.basque,
    this.belarusian,
    this.bengali,
    this.bhojpuri,
    this.bosnian,
    this.bulgarian,
    this.catalan,
    this.cebuano,
    this.chineseSimplified,
    this.chineseTraditional,
    this.corsican,
    this.croatian,
    this.czech,
    this.danish,
    this.dhivehi,
    this.dogri,
    this.dutch,
    this.english,
    this.esperanto,
    this.estonian,
    this.ewe,
    this.filipino,
    this.finnish,
    this.french,
    this.frisian,
    this.galician,
    this.georgian,
    this.german,
    this.greek,
    this.guarani,
    this.gujarati,
    this.haitianCreole,
    this.hausa,
    this.hawaiian,
    this.hebrew,
    this.hindi,
    this.hmong,
    this.hungarian,
    this.icelandic,
    this.igbo,
    this.ilocano,
    this.indonesian,
    this.irish,
    this.italian,
    this.japanese,
    this.javanese,
    this.kannada,
    this.kazakh,
    this.khmer,
    this.kinyarwanda,
    this.konkani,
    this.korean,
    this.krio,
    this.kurdish,
    this.kurdishSorani,
    this.kyrgyz,
    this.lao,
    this.latin,
    this.latvian,
    this.lingala,
    this.lithuanian,
    this.luganda,
    this.luxembourgish,
    this.macedonian,
    this.maithili,
    this.malagasy,
    this.malay,
    this.malayalam,
    this.maltese,
    this.maori,
    this.marathi,
    this.meiteilon,
    this.mizo,
    this.mongolian,
    this.myanmar,
    this.nepali,
    this.norwegian,
    this.nyanja,
    this.odia,
    this.oromo,
    this.pashto,
    this.persian,
    this.polish,
    this.portuguese,
    this.punjabi,
    this.quechua,
    this.romanian,
    this.russian,
    this.samoan,
    this.sanskrit,
    this.scotsGaelic,
    this.sepedi,
    this.serbian,
    this.sesotho,
    this.shona,
    this.sindhi,
    this.sinhala,
    this.slovak,
    this.slovenian,
    this.somali,
    this.spanish,
    this.sundanese,
    this.swahili,
    this.swedish,
    this.tagalog,
    this.tajik,
    this.tamil,
    this.tatar,
    this.telugu,
    this.thai,
    this.tigrinya,
    this.tsonga,
    this.turkish,
    this.turkmen,
    this.twi,
    this.ukrainian,
    this.urdu,
    this.uyghur,
    this.uzbek,
    this.vietnamese,
    this.welsh,
    this.xhosa,
    this.yiddish,
    this.yoruba,
    this.zulu,
  ];
}
