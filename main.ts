
//% weight=100 color=#0fbc11 icon="microphone"
namespace voice {

    //% block="say text %text with tuning %tuning pitch offset %offset speed %speed preset %preset language %lang"
    export function say(text: string, tuning: number, offset: number, speed: number, preset: number, lang: string): void {
        let syllables = text.split(" ");
        for (let i = 0; i < syllables.length; i++) {
            let pitch = tuning + offset * i;
            configureVoice(speed, pitch, preset);
            let phoneme = lang == "SK" ? toSlovakPhoneme(syllables[i]) : syllables[i];
            billy.say(phoneme);
        }
    }

    //% block="syllable say text %text with pitch array %pitchArray tuning %tuning speed %speed preset %preset language %lang"
    export function saySyllables(text: string, pitchArray: number[], tuning: number, speed: number, preset: number, lang: string): void {
        let syllables = text.split(" ");
        for (let i = 0; i < syllables.length; i++) {
            let offset = pitchArray[i % pitchArray.length];
            let pitch = tuning + offset;
            configureVoice(speed, pitch, preset);
            let phoneme = lang == "SK" ? toSlovakPhoneme(syllables[i]) : syllables[i];
            billy.say(phoneme);
        }
    }

    function configureVoice(speed: number, pitch: number, preset: number): void {
        let throat = 190;
        let mouth = 190;
        if (preset == 1) { throat = 150; mouth = 200; }
        else if (preset == 2) { throat = 100; mouth = 100; }
        else if (preset == 3) { throat = 220; mouth = 180; }
        billy.configureVoice(speed, pitch, throat, mouth);
    }

    function toSlovakPhoneme(word: string): string {
        let map: {[key: string]: string} = {
            "á": "A'", "ä": "A'", "č": "C'", "ď": "D'", "é": "E'", "í": "I'",
            "ĺ": "L'", "ľ": "L'", "ň": "N'", "ó": "O'", "ô": "O'", "ŕ": "R'",
            "š": "S'", "ť": "T'", "ú": "U'", "ý": "Y'", "ž": "Z'",
            "ch": "H", "dz": "Z", "dž": "Z'", "DZ": "Z'", "dz'": "Z'"
        };
        let result = "";
        let i = 0;
        while (i < word.length) {
            let c = word.charAt(i);
            let next = word.charAt(i+1) || "";
            let pair = c + next;
            if (map[pair]) {
                result += map[pair];
                i += 2;
            } else {
                result += map[c] || c;
                i++;
            }
        }
        return result;
    }
}
