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
  replaceFont: {
    family: string;
    style: string;
  };
};

export type ChangeFontsFocusState = {
  targets: ChangeFontsTargets;
};
