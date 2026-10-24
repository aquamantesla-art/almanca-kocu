import type { RawTopic } from './raw'

export const A2B: RawTopic[] = [
  {
    id: 'kasus',
    title: 'Akkusativ & Dativ',
    titleTr: 'Belirtme ve yönelme hali',
    level: 'A2',
    summary: 'Akkusativ: sadece der → den. Dativ: dem/der/dem/den + çoğulda -n.',
    lesson: `
Almancada isim, cümledeki görevine göre artikelini değiştirir.

| | {m:maskulin} | {f:feminin} | {n:neutral} | {p:çoğul} |
|---|---|---|---|---|
| Nominativ (kim/ne?) | {m:der / ein} | {f:die / eine} | {n:das / ein} | {p:die / –} |
| Akkusativ (kimi/neyi?) | {m:den / einen} | {f:die / eine} | {n:das / ein} | {p:die / –} |
| Dativ (kime/kimde?) | {m:dem / einem} | {f:der / einer} | {n:dem / einem} | {p:den / – (+n)} |

> Akkusativ'de sadece **maskulin** değişir: der → den. Dativ'de hepsi değişir ve çoğulda isme **-n** eklenir: die Kinder → den Kinder==n==.

### Ne zaman hangisi?
- **Akkusativ**: fiilin doğrudan nesnesi: Ich sehe ==den Mann==. Ich kaufe ==einen Tisch==.
- **Dativ**: "kime?" sorusu (genelde kişi): Ich gebe ==dem Kind== ein Buch. (kime? → çocuğa: Dativ; ne? → kitap: Akkusativ)
- **Dativ isteyen fiiller**: helfen, danken, gefallen, gehören, antworten, gratulieren, schmecken, passen, glauben (jdm), fehlen
  - Ich helfe ==dir==. Das Kleid gefällt ==meiner Mutter==.

### Şahıs zamirleri
| Nom. | ich | du | er | sie | es | wir | ihr | sie/Sie |
|---|---|---|---|---|---|---|---|---|
| Akk. | mich | dich | ihn | sie | es | uns | euch | sie/Sie |
| Dat. | mir | dir | ihm | ihr | ihm | uns | euch | ihnen/Ihnen |

İyelik ve kein da ein gibi çekilir: mein, dein, sein, ihr, unser, euer, Ihr, kein → mein==en==, mein==em==, mein==er==…
`,
    ex: `
mc | Ich sehe ___ Mann. | den* / dem / der | sehen + Akkusativ, maskulin: den.
mc | Ich helfe ___ Frau. | der* / die / den | helfen + Dativ, feminin: der.
ty | Ich kaufe ___ neuen Tisch. (ein) | einen | Akkusativ maskulin: einen.
mc | Das Buch gehört ___ Kind. | dem* / das / den | gehören + Dativ, neutral: dem.
ty | Ich gebe ___ Kindern Schokolade. (die) | den | Dativ çoğul: den Kindern.
mc | Kannst du ___ helfen? | mir* / mich / ich | helfen + Dativ: mir.
mc | Ich rufe ___ morgen an. (o, erkek) | ihn* / ihm / er | anrufen + Akkusativ: ihn.
ty | Wie gefällt ___ die Wohnung? (Sie, nazik) | Ihnen | gefallen + Dativ: Ihnen.
mc | Ich habe ___ Bruder und eine Schwester. | einen* / ein / einem | haben + Akkusativ, maskulin: einen.
mc | Wir danken ___ Lehrerin. | unserer* / unsere / unseren | danken + Dativ, feminin: unserer.
ty | Ich schenke ___ Vater eine Uhr. (mein) | meinem | Kime? babama → Dativ: meinem.
mc | Hast du ___ Schlüssel gesehen? | meinen* / meinem / mein | sehen + Akkusativ, der Schlüssel → meinen.
ty | Das Essen schmeckt ___ nicht. (o, kadın) | ihr | schmecken + Dativ: ihr.
mc | Der Lehrer antwortet ___ Studenten. (çoğul) | den* / die / dem | Dativ çoğul: den Studenten.
ty | Ich brauche ___ Termin beim Arzt. (ein) | einen | der Termin, Akkusativ → einen.
mc | Ich gratuliere ___ zum Geburtstag! (sen) | dir* / dich / du | gratulieren + Dativ: dir.
ty | Gib ___ bitte das Salz! (ben) | mir | Kime? bana → mir.
mc | Ich verstehe ___ nicht. (siz, samimi çoğul) | euch* / ihr / ihnen | verstehen + Akkusativ: euch.
ty | Wir haben ___ Auto gekauft. (ein, das Auto) | ein | Akkusativ neutral değişmez: ein.
mc | Die Schuhe passen ___ nicht. (ben) | mir* / mich / mein | passen + Dativ: mir.
`,
  },
  {
    id: 'praep',
    title: 'Präpositionen & Wechselpräpositionen',
    titleTr: 'Edatlar: Wo? → Dativ, Wohin? → Akkusativ',
    level: 'A2',
    summary: 'mit/bei/zu… Dativ; für/ohne/durch… Akkusativ; in/an/auf… soruya göre.',
    lesson: `
### Hep Akkusativ alanlar
**durch, für, gegen, ohne, um, bis**
- Das Geschenk ist ==für den== Vater.
- Wir gehen ==durch den== Park.

### Hep Dativ alanlar
**aus, bei, mit, nach, seit, von, zu, gegenüber, außer, ab**
- Ich fahre ==mit dem== Bus.
- Er wohnt ==bei seinen== Eltern.
- Ich komme ==aus der== Türkei.

Kısaltmalar: zu + dem = ==zum==, zu + der = ==zur==, bei + dem = ==beim==, von + dem = ==vom==

### Wechselpräpositionen: Wo? mu Wohin? mi?
**in, an, auf, über, unter, vor, hinter, neben, zwischen**

| Soru | Hal | Fiiller | Örnek |
|---|---|---|---|
| **Wo?** (nerede, durum) | Dativ | sein, liegen, stehen, hängen, sitzen, wohnen | Das Buch liegt ==auf dem== Tisch. |
| **Wohin?** (nereye, hareket) | Akkusativ | legen, stellen, hängen, setzen, gehen, fahren | Ich lege das Buch ==auf den== Tisch. |

- Ich bin ==im== Kino. (in + dem) → Ich gehe ==ins== Kino. (in + das)
- Das Bild hängt ==an der== Wand. → Ich hänge das Bild ==an die== Wand.

> Durum fiilleri (liegen, stehen, sitzen, hängen) → Dativ. Yerleştirme fiilleri (legen, stellen, setzen, hängen) → Akkusativ. İkili ezberle: liegen/legen, stehen/stellen, sitzen/setzen.

### Zaman ifadeleri
am Montag, am Wochenende, um 8 Uhr, im Mai, im Sommer, vor einer Woche, seit drei Jahren (Dativ)
`,
    ex: `
mc | Ich fahre mit ___ Fahrrad zur Arbeit. | dem* / das / den | mit + Dativ, das Fahrrad → dem.
mc | Das Geschenk ist für ___ Mutter. | meine* / meiner / meinem | für + Akkusativ, feminin: meine.
mc | Das Buch liegt auf ___ Tisch. | dem* / den / der | Wo? (liegen) → Dativ.
mc | Ich lege das Buch auf ___ Tisch. | den* / dem / der | Wohin? (legen) → Akkusativ.
ty | Wir gehen heute Abend ___ Kino. (in + das) | ins | Wohin? → in das = ins.
ty | Ich war gestern ___ Arzt. (bei + dem) | beim | bei + dem = beim.
mc | Er kommt aus ___ Schweiz. | der* / die / dem | aus + Dativ, die Schweiz → der.
mc | Wir laufen durch ___ Park. | den* / dem / der | durch + Akkusativ.
ty | Ich wohne seit drei ___ in Köln. (Jahr, çoğul) | Jahren | seit + Dativ çoğul → -n: Jahren.
mc | Das Bild hängt an ___ Wand. | der* / die / den | Wo? → Dativ.
mc | Stell die Flasche in ___ Kühlschrank! | den* / dem / der | Wohin? (stellen) → Akkusativ.
ty | Ich gehe ___ Bäckerei. (zu + der) | zur | zu + der = zur.
mc | Die Katze sitzt unter ___ Sofa. | dem* / das / den | Wo? (sitzen) → Dativ.
mc | Ohne ___ Brille kann ich nichts sehen. | meine* / meiner / meinen | ohne + Akkusativ, feminin: meine.
ty | Nach ___ Arbeit gehe ich einkaufen. (die) | der | nach + Dativ: der Arbeit.
mc | Ich habe ___ Montag einen Termin. | am* / im / um | Günler: am.
mc | Wir fahren ___ Sommer in die Türkei. | im* / am / um | Mevsim ve aylar: im.
mc | Er setzt sich neben ___ Freundin. | seine* / seiner / seinen | Wohin? (sich setzen) → Akkusativ.
mc | Das Auto steht vor ___ Haus. | dem* / das / den | Wo? (stehen) → Dativ.
ty | Ich fahre ___ Bahnhof. (zu + dem) | zum | zu + dem = zum.
`,
  },
  {
    id: 'adjbasic',
    title: 'Adjektivdeklination (Grundlagen)',
    titleTr: 'Sıfat çekimi: der/ein sonrası',
    level: 'A2',
    summary: 'der/die/das sonrası: -e ya da -en. ein sonrası: eksik sinyali sıfat tamamlar (-er, -es).',
    lesson: `
Sıfat ismin **önünde** durunca ek alır. ("Das Auto ist ==neu==." gibi sein'dan sonra ek almaz.)

### Belirli artikelden sonra: neredeyse hep -e ya da -en
| | {m:mask.} | {f:fem.} | {n:neutr.} | {p:çoğul} |
|---|---|---|---|---|
| Nom. | der neu==e== Tisch | die neu==e== Lampe | das neu==e== Bett | die neu==en== Stühle |
| Akk. | den neu==en== Tisch | die neu==e== Lampe | das neu==e== Bett | die neu==en== Stühle |
| Dat. | dem neu==en== Tisch | der neu==en== Lampe | dem neu==en== Bett | den neu==en== Stühlen |

> Kolay kural: Nominativ tekil (ve Akkusativ fem./neutr.) → **-e**. Geri kalan her yer → **-en**.

### Belirsiz artikelden sonra (ein/kein/mein)
| | {m:mask.} | {f:fem.} | {n:neutr.} | {p:çoğul (kein/mein)} |
|---|---|---|---|---|
| Nom. | ein neu==er== Tisch | eine neu==e== Lampe | ein neu==es== Bett | meine neu==en== Stühle |
| Akk. | einen neu==en== Tisch | eine neu==e== Lampe | ein neu==es== Bett | meine neu==en== Stühle |
| Dat. | einem neu==en== Tisch | einer neu==en== Lampe | einem neu==en== Bett | meinen neu==en== Stühlen |

"ein" cinsiyeti göstermediği için sıfat gösterir: ein neu**er** Tisch (der), ein neu**es** Bett (das).
`,
    ex: `
ty | Das ist ein schön___ Tag. (der Tag) | er | ein + mask. Nom. → -er (der sinyali).
ty | Ich kaufe einen neu___ Computer. | en | einen → -en.
ty | Die klein___ Kinder spielen im Garten. | en | Çoğul → -en.
ty | Das ist ein gut___ Buch. (das Buch) | es | ein + neutr. → -es (das sinyali).
ty | Ich wohne in einer groß___ Wohnung. | en | Dativ → -en.
mc | Der ___ Mann ist mein Nachbar. | alte* / alten / alter | Belirli artikel + Nom. tekil → -e.
mc | Ich habe eine ___ Frage. | wichtige* / wichtigen / wichtiger | eine + fem. Akk. → -e.
mc | Wir sehen den ___ Film. | neuen* / neue / neuer | den → -en.
ty | Sie hat ein rot___ Auto. | es | ein + neutr. Akk. → -es.
ty | Mit dem neu___ Fahrrad fahre ich zur Arbeit. | en | Dativ → -en.
mc | Das ist eine ___ Idee! | gute* / guten / guter | eine + fem. Nom. → -e.
mc | Er trägt heute ein ___ Hemd. | weißes* / weiße / weißen | ein + neutr. → -es.
ty | Kennst du die neu___ Kollegin? | e | die + fem. Akk. → -e.
ty | Wir haben keine frisch___ Brötchen mehr. | en | kein + çoğul → -en.
mc | Ich gebe dem ___ Kind ein Eis. | kleinen* / kleine / kleines | Dativ → -en.
ty | Mein alt___ Laptop ist kaputt. (der Laptop) | er | mein + mask. Nom. → -er.
`,
  },
  {
    id: 'komparativ',
    title: 'Komparativ & Superlativ',
    titleTr: 'Karşılaştırma: daha, en',
    level: 'A2',
    summary: 'schnell → schneller → am schnellsten. "-den daha" = als, "kadar" = so … wie.',
    lesson: `
| Temel | Komparativ (-er) | Superlativ (am -sten) |
|---|---|---|
| schnell | schnell==er== | am schnell==sten== |
| billig | billig==er== | am billig==sten== |
| alt | ==ä==lt==er== | am ==ä==lt==esten== |
| groß | gr==ö==ß==er== | am gr==ö==ß==ten== |
| jung | j==ü==ng==er== | am j==ü==ng==sten== |
| warm | w==ä==rm==er== | am w==ä==rm==sten== |

### Düzensizler
| Temel | Komparativ | Superlativ |
|---|---|---|
| gut | besser | am besten |
| viel | mehr | am meisten |
| gern | lieber | am liebsten |
| hoch | höher | am höchsten |
| nah | näher | am nächsten |

### als mı wie mi?
- Eşitlik: **so … wie**: Tom ist ==so groß wie== Ali.
- Fark: **-er als**: Tom ist ==größer als== Ali.

> Türkçedeki "-den daha" → **als**: "Ich bin älter als du." (Senden daha yaşlıyım.)

Sıfat ismin önündeyse çekim eki de alır: das schnell==ere== Auto, der beste Freund, die größte Stadt.
`,
    ex: `
ty | Ein Auto ist ___ als ein Fahrrad. (schnell) | schneller | Komparativ: -er.
mc | Berlin ist größer ___ München. | als* / wie / so | Fark → als.
mc | Mein Bruder ist so alt ___ ich. | wie* / als / so | Eşitlik → so … wie.
ty | Ich trinke ___ Tee als Kaffee. (gern) | lieber | gern → lieber.
ty | Welches Restaurant ist am ___? (gut) | besten | gut → am besten.
ty | Im Sommer ist es ___ als im Winter. (warm) | wärmer | warm → wärmer (umlaut).
mc | Wer hat am ___ gearbeitet? (viel) | meisten* / mehrsten / mehr | viel → am meisten.
ty | Die Zugspitze ist der ___ Berg Deutschlands. (hoch) | höchste | hoch → der höchste.
mc | Mein Handy ist ___ als deins. | teurer* / teuerer / mehr teuer | teuer → teurer (e düşer).
ty | Heute ist es noch ___ als gestern. (kalt) | kälter | kalt → kälter.
mc | Das ist die ___ Stadt, die ich kenne. | schönste* / schönsten / schöner | die + Superlativ + Nom. → -e.
ty | Am ___ esse ich Pizza. (gern) | liebsten | gern → am liebsten.
mc | Er spricht besser Deutsch ___ ich. | als* / wie / wenn | Fark → als.
ty | Wo ist die ___ Apotheke? (nah) | nächste | nah → die nächste.
`,
  },
  {
    id: 'reflexiv',
    title: 'Reflexive Verben',
    titleTr: 'Dönüşlü fiiller (sich)',
    level: 'A2',
    summary: 'sich freuen, sich treffen… Ayrıca Akkusativ nesne varsa zamir Dativ olur: Ich wasche mir die Hände.',
    lesson: `
Bazı fiiller "kendini" anlamında bir dönüşlü zamir (**sich**) ister.

| | Akkusativ | Dativ |
|---|---|---|
| ich | mich | mir |
| du | dich | dir |
| er/sie/es | sich | sich |
| wir | uns | uns |
| ihr | euch | euch |
| sie/Sie | sich | sich |

- Ich ==freue mich== auf das Wochenende.
- Du ==ärgerst dich== zu oft.
- Wir ==treffen uns== um acht.

### Ne zaman Dativ (mir/dir)?
Cümlede ayrıca bir Akkusativ nesne varsa dönüşlü zamir **Dativ** olur:
- Ich wasche ==mich==. → Ich wasche ==mir== die Hände.
- Ich ziehe ==mich== an. → Ich ziehe ==mir== eine Jacke an.
- Ich wünsche ==mir== ein neues Handy.

### Sık kullanılan dönüşlü fiiller
sich freuen (auf/über), sich ärgern (über), sich interessieren (für), sich erinnern (an), sich treffen (mit), sich beeilen, sich ausruhen, sich entschuldigen (bei/für), sich fühlen, sich vorstellen, sich kümmern (um), sich gewöhnen (an), sich bewerben (um/bei)

> Devrik cümlede ve yan cümlede sich öznenin hemen arkasına gelir: Morgen treffen ==wir uns==. / …, weil ==er sich== nicht wohl fühlt.
`,
    ex: `
ty | Ich freue ___ auf den Urlaub. | mich | ich → mich.
ty | Interessierst du ___ für Fußball? | dich | du → dich.
ty | Wir treffen ___ um 8 Uhr vor dem Kino. | uns | wir → uns.
mc | Er fühlt ___ heute nicht gut. | sich* / ihn / ihm | er → sich.
mc | Ich wasche ___ die Hände. | mir* / mich / sich | Akkusativ nesne (die Hände) var → Dativ: mir.
ty | Ihr müsst ___ beeilen! | euch | ihr → euch.
mc | Kannst du ___ an seinen Namen erinnern? | dich* / dir / sich | du → dich (başka nesne yok).
mc | Ich wünsche ___ ein Fahrrad zum Geburtstag. | mir* / mich / mein | sich etwas wünschen → Dativ: mir.
ty | Darf ich ___ vorstellen? Mein Name ist Ali. | mich | ich → mich.
mc | Sie kümmert ___ um ihre Mutter. | sich* / ihr / sie | sie → sich.
or | Morgen ___ | treffen wir uns im Park. | Devrik cümle: fiil + özne + sich.
ty | Ich habe ___ an das Wetter gewöhnt. | mich | sich gewöhnen an → mich.
mc | Zieh ___ eine Jacke an, es ist kalt! | dir* / dich / sich | Akkusativ nesne (eine Jacke) var → dir.
ty | Wir haben ___ sehr über dein Geschenk gefreut. | uns | wir → uns.
`,
  },
]
