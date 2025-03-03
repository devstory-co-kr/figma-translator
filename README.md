# Figma Translator
[![Figma](https://img.shields.io/badge/Figma-Plugin-F24E1E?logo=figma&logoColor=fff&style=flat&labelColor=F24E1E)](https://www.figma.com/community/plugin/1318492589926015701)
<br>
This is a plugin that creates translation and store templates.

## Features
- `Translate` : Translates all strings in the selected frame using Google Translator.
- `Create Templates` : Create android and ios store templates.
- `Change Fonts` : You can change the font of a specific object.

## Commands
### Translate
https://github.com/devstory-co-kr/figma-translator/assets/26322627/a18f7465-4296-463a-a7be-f25249b7498e
- To be translated, the frame name must contain a [language code](https://gist.github.com/nero-angela/89d61a06e3089076f2e85b189dfe393a).
- `Cache` : Reduce repeat requests by caching translation history.
- `Auto Size` : the font size is automatically reduced even if the characters become longer after translation, so you can keep the number of lines constant. (For the auto size function to work, the height of the text must not be fixed.)
- `Exclusion Keywords` : Exclude specific words from translation.
- `Font Replacement` : Changes the font for a specific language when translating.

### Create Templates
https://github.com/devstory-co-kr/figma-translator/assets/26322627/f50a4a93-c07f-4d4b-9ce8-f6d85d1eae87
- The frame name is created according to the folder structure supported by fastlane.
- After exporting the template, you can easily place it in the fastlane folder using the [`rsync`](https://www.geeksforgeeks.org/rsync-command-in-linux-with-examples/) command.
- Support Templates
  - iOS
    - iPhone 5.5 : `1242 x 2208`
    - iPhone 6.5 : `1284 x 2778`
    - iPad 12.9 2nd generation : `2048 x 2732`
    - iPad 12.9 3nd generation : `2048 x 2732`
  - Android
    - Grapic Image : `1024 x 500`
    - Phone : `1242 x 2208`
    - Tablet 7inch : `2048 x 2732`
    - Tablet 10inch : `2048 x 2732`

### Change Fonts
- Even if a different font is used within one text node, you can only change the font you want.
