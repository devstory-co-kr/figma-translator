import { TranslatorLanguageEntity } from "./translator_language";
import {
  TextDirection,
  TranslatorLanguage,
  TranslatorLanguageRepository,
} from "./translator_language.interface";

export class TranslatorLanguageRepositoryImpl
  implements TranslatorLanguageRepository
{
  public afrikaans = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "af",
    name: "Afrikaans",
  });
  public albanian = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "sq",
    name: "Albanian",
  });
  public amharic = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "am",
    name: "Amharic",
  });
  public arabic = new TranslatorLanguageEntity({
    textDirection: TextDirection.RTL,
    locale: "ar",
    name: "Arabic",
  });
  public armenian = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "hy",
    name: "Armenian",
  });
  public assamese = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "as",
    name: "Assamese",
  });
  public aymara = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "ay",
    name: "Aymara",
  });
  public azerbaijani = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "az",
    name: "Azerbaijani",
  });
  public bambara = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "bm",
    name: "Bambara",
  });
  public basque = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "eu",
    name: "Basque",
  });
  public belarusian = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "be",
    name: "Belarusian",
  });
  public bengali = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "bn",
    name: "Bengali",
  });
  public bhojpuri = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "bho",
    name: "Bhojpuri",
  });
  public bosnian = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "bs",
    name: "Bosnian",
  });
  public bulgarian = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "bg",
    name: "Bulgarian",
  });
  public catalan = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "ca",
    name: "Catalan",
  });
  public cebuano = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "ceb",
    name: "Cebuano",
  });
  public chineseSimplified = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "zh-CN",
    name: "Chinese Simplified",
  });
  public chineseTraditional = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "zh-TW",
    name: "Chinese Traditional",
  });
  public corsican = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "co",
    name: "Corsican",
  });
  public croatian = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "hr",
    name: "Croatian",
  });
  public czech = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "cs",
    name: "Czech",
  });
  public danish = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "da",
    name: "Danish",
  });
  public dhivehi = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "dv",
    name: "Dhivehi",
  });
  public dogri = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "doi",
    name: "Dogri",
  });
  public dutch = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "nl",
    name: "Dutch",
  });
  public english = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "en",
    name: "English",
  });
  public esperanto = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "eo",
    name: "Esperanto",
  });
  public estonian = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "et",
    name: "Estonian",
  });
  public ewe = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "ee",
    name: "Ewe",
  });
  public filipino = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "fil",
    name: "Filipino",
  });
  public finnish = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "fi",
    name: "Finnish",
  });
  public french = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "fr",
    name: "French",
  });
  public frisian = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "fy",
    name: "Frisian",
  });
  public galician = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "gl",
    name: "Galician",
  });
  public georgian = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "ka",
    name: "Georgian",
  });
  public german = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "de",
    name: "German",
  });
  public greek = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "el",
    name: "Greek",
  });
  public guarani = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "gn",
    name: "Guarani",
  });
  public gujarati = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "gu",
    name: "Gujarati",
  });
  public haitianCreole = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "ht",
    name: "Haitian Creole",
  });
  public hausa = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "ha",
    name: "Hausa",
  });
  public hawaiian = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "haw",
    name: "Hawaiian",
  });
  public hebrew = new TranslatorLanguageEntity({
    textDirection: TextDirection.RTL,
    locale: "iw",
    name: "Hebrew",
  });
  public hindi = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "hi",
    name: "Hindi",
  });
  public hmong = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "hmn",
    name: "Hmong",
  });
  public hungarian = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "hu",
    name: "Hungarian",
  });
  public icelandic = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "is",
    name: "Icelandic",
  });
  public igbo = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "ig",
    name: "Igbo",
  });
  public ilocano = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "ilo",
    name: "Ilocano",
  });
  public indonesian = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "id",
    name: "Indonesian",
  });
  public irish = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "ga",
    name: "Irish",
  });
  public italian = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "it",
    name: "Italian",
  });
  public japanese = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "ja",
    name: "Japanese",
  });
  public javanese = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "jw",
    name: "Javanese",
  });
  public kannada = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "kn",
    name: "Kannada",
  });
  public kazakh = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "kk",
    name: "Kazakh",
  });
  public khmer = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "km",
    name: "Khmer",
  });
  public kinyarwanda = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "rw",
    name: "Kinyarwanda",
  });
  public konkani = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "gom",
    name: "Konkani",
  });
  public korean = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "ko",
    name: "Korean",
  });
  public krio = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "kri",
    name: "Krio",
  });
  public kurdish = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "ku",
    name: "Kurdish",
  });
  public kurdishSorani = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "ckb",
    name: "KurdishSorani",
  });
  public kyrgyz = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "ky",
    name: "Kyrgyz",
  });
  public lao = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "lo",
    name: "Lao",
  });
  public latin = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "la",
    name: "Latin",
  });
  public latvian = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "lv",
    name: "Latvian",
  });
  public lingala = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "ln",
    name: "Lingala",
  });
  public lithuanian = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "lt",
    name: "Lithuanian",
  });
  public luganda = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "lg",
    name: "Luganda",
  });
  public luxembourgish = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "lb",
    name: "Luxembourgish",
  });
  public macedonian = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "mk",
    name: "Macedonian",
  });
  public maithili = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "mai",
    name: "Maithili",
  });
  public malagasy = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "mg",
    name: "Malagasy",
  });
  public malay = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "ms",
    name: "Malay",
  });
  public malayalam = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "ml",
    name: "Malayalam",
  });
  public maltese = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "mt",
    name: "Maltese",
  });
  public maori = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "mi",
    name: "Maori",
  });
  public marathi = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "mr",
    name: "Marathi",
  });
  public meiteilon = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "mni-Mtei",
    name: "Meiteilon",
  });
  public mizo = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "lus",
    name: "Mizo",
  });
  public mongolian = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "mn",
    name: "Mongolian",
  });
  public myanmar = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "my",
    name: "Myanmar",
  });
  public nepali = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "ne",
    name: "Nepali",
  });
  public norwegian = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "no",
    name: "Norwegian",
  });
  public nyanja = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "ny",
    name: "Nyanja",
  });
  public odia = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "or",
    name: "Odia",
  });
  public oromo = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "om",
    name: "Oromo",
  });
  public pashto = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "ps",
    name: "Pashto",
  });
  public persian = new TranslatorLanguageEntity({
    textDirection: TextDirection.RTL,
    locale: "fa",
    name: "Persian",
  });
  public polish = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "pl",
    name: "Polish",
  });
  public portuguese = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "pt",
    name: "Portuguese",
  });
  public punjabi = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "pa",
    name: "Punjabi",
  });
  public quechua = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "qu",
    name: "Quechua",
  });
  public romanian = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "ro",
    name: "Romanian",
  });
  public russian = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "ru",
    name: "Russian",
  });
  public samoan = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "sm",
    name: "Samoan",
  });
  public sanskrit = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "sa",
    name: "Sanskrit",
  });
  public scotsGaelic = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "gd",
    name: "Scots Gaelic",
  });
  public sepedi = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "nso",
    name: "Sepedi",
  });
  public serbian = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "sr",
    name: "Serbian",
  });
  public sesotho = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "st",
    name: "Sesotho",
  });
  public shona = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "sn",
    name: "Shona",
  });
  public sindhi = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "sd",
    name: "Sindhi",
  });
  public sinhala = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "si",
    name: "Sinhala",
  });
  public slovak = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "sk",
    name: "Slovak",
  });
  public slovenian = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "sl",
    name: "Slovenian",
  });
  public somali = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "so",
    name: "Somali",
  });
  public spanish = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "es",
    name: "Spanish",
  });
  public sundanese = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "su",
    name: "Sundanese",
  });
  public swahili = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "sw",
    name: "Swahili",
  });
  public swedish = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "sv",
    name: "Swedish",
  });
  public tagalog = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "tl",
    name: "Tagalog",
  });
  public tajik = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "tg",
    name: "Tajik",
  });
  public tamil = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "ta",
    name: "Tamil",
  });
  public tatar = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "tt",
    name: "Tatar",
  });
  public telugu = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "te",
    name: "Telugu",
  });
  public thai = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "th",
    name: "Thai",
  });
  public tigrinya = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "ti",
    name: "Tigrinya",
  });
  public tsonga = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "ts",
    name: "Tsonga",
  });
  public turkish = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "tr",
    name: "Turkish",
  });
  public turkmen = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "tk",
    name: "Turkmen",
  });
  public twi = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "ak",
    name: "Twi",
  });
  public ukrainian = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "uk",
    name: "Ukrainian",
  });
  public urdu = new TranslatorLanguageEntity({
    textDirection: TextDirection.RTL,
    locale: "ur",
    name: "Urdu",
  });
  public uyghur = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "ug",
    name: "Uyghur",
  });
  public uzbek = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "uz",
    name: "Uzbek",
  });
  public vietnamese = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "vi",
    name: "Vietnamese",
  });
  public welsh = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "cy",
    name: "Welsh",
  });
  public xhosa = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "xh",
    name: "Xhosa",
  });
  public yiddish = new TranslatorLanguageEntity({
    textDirection: TextDirection.RTL,
    locale: "yi",
    name: "Yiddish",
  });
  public yoruba = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
    locale: "yo",
    name: "Yoruba",
  });
  public zulu = new TranslatorLanguageEntity({
    textDirection: TextDirection.LTR,
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
