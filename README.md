# Figma Translator
This is a plugin that creates translation and store templates.

## Features
- `Translate` : Translates all strings in the selected frame using Google Translator.
- `Create Templates` : Create android and ios store templates.

## Commands
### Translate
https://github.com/devstory-co-kr/figma-translator/assets/26322627/2121299b-6e3d-4dc1-822f-4df025559b34
- To be translated, the frame name must contain a [language code](https://gist.github.com/nero-angela/89d61a06e3089076f2e85b189dfe393a).
- It uses Google Translator and has an internal caching function implemented.
- Free translators have hourly limitations.
- Figma plugin provides up to 1MB of storage space, so if the cache is full, empty the cache using the `Delete Translate Cache` command.
- Some languages have a feature that changes the font when translating.
- If you use the `Auto Size` function, the font size is automatically reduced even if the characters become longer after translation, so you can keep the number of lines constant.

### Create templates
https://github.com/devstory-co-kr/figma-translator/assets/26322627/124b5082-1a28-44ac-845c-dad4286b5a56
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
