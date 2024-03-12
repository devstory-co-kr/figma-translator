export type ChangeFontsTargets = {
  [fontFamily: string]: {
    [style: string]: {
      nodes: TextNode[];
      isChecked: boolean;
    };
  };
};

export type ChangeFontsInitState = {
  targets: ChangeFontsTargets;
  availableFonts: Font[];
  replaceFontHistory: FontName[];
  replaceFont: FontName;
};

export type ChangeFontsFocusState = {
  targets: ChangeFontsTargets;
};

export type ChangeFontsChangeState = {
  targets: ChangeFontsTargets;
  replaceFont: FontName;
};

export type ChangeFontsDeleteReplaceFontHistoryState = {
  replaceFont: FontName;
};
