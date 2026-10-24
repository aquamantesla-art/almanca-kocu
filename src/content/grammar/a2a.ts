import type { RawTopic } from './raw'

export const A2A: RawTopic[] = [
  {
    id: 'verbpos',
    title: 'Verbposition & Satzklammer',
    titleTr: 'Fiilin yeri ve cümle parantezi',
    level: 'A2',
    summary: 'Ana cümlede çekimli fiil hep 2. yerde; ikinci parça en sonda.',
    lesson: `
Almanca cümlenin en önemli kuralı: **çekimli fiil ana cümlede hep 2. yerde** durur. 1. yerde özne, zaman ya da yer olabilir, fark etmez.

| 1. yer | 2. yer (fiil) | geri kalan |
|---|---|---|
| Ich | ==fahre== | morgen nach Berlin. |
| Morgen | ==fahre== | ich nach Berlin. |
| Nach Berlin | ==fahre== | ich morgen. |

> Türkçede fiil sonda: "Yarın Berlin'e gidiyorum." Almancada çekimli fiil 2. yerde: "Morgen fahre ich nach Berlin." 1. yer doluysa özne fiilin arkasına geçer.

### Satzklammer (cümle parantezi)
İki parçalı fiillerde çekimli kısım 2. yerde kalır, ikinci kısım **en sona** gider:

| Yapı | Örnek |
|---|---|
| Modal fiil | Ich ==muss== heute lange ==arbeiten==. |
| Perfekt | Wir ==haben== gestern Pizza ==gegessen==. |
| Ayrılabilen fiil | Der Zug ==kommt== um acht Uhr ==an==. |
| Futur | Es ==wird== morgen ==regnen==. |

### Soru cümleleri
- W-sorusu: soru kelimesi 1. yerde, fiil 2. yerde: **Wann kommst du?**
- Evet/hayır sorusu: fiil 1. yerde: **Kommst du morgen?**

### Orta alanın sırası: TeKaMoLo
Fiilden sonraki bilgiler genelde şu sırayla gelir: **Te**mporal (ne zaman), **Ka**usal (neden), **Mo**dal (nasıl), **Lo**kal (nereye).
Ich fahre ==morgen== ==wegen der Arbeit== ==mit dem Zug== ==nach Köln==.
`,
    ex: `
or | Heute ___ | gehe ich ins Kino. | Zaman ifadesi 1. yerde → çekimli fiil 2. yerde, özne fiilden sonra.
or | Am Wochenende ___ | besuche ich meine Eltern. | 1. yerde "Am Wochenende" var, fiil (besuche) yine 2. yerde.
mc | Morgen ___ nach Hamburg. | fahre ich* / ich fahre / fahren ich | V2: Morgen + fiil + özne.
or | Ich ___ | muss heute lange arbeiten. | Modal fiil 2. yerde, mastar (arbeiten) en sonda.
or | Wir ___ | haben gestern Pizza gegessen. | Perfekt: haben 2. yerde, Partizip II (gegessen) en sonda.
or | Der Zug ___ | kommt um acht Uhr an. | Ayrılabilen fiil: kommt 2. yerde, ön ek (an) en sonda.
mc | Wann ___ du morgen? | kommst* / kommen / du kommst | W-sorusu: soru kelimesi + fiil + özne.
or | ___ | Kannst du mir helfen? | Evet/hayır sorusunda çekimli fiil 1. yerde, mastar sonda.
ty | Ich ___ dich morgen ___. (anrufen) | rufe ; an | anrufen ayrılabilir: rufe … an.
ty | Gestern ___ wir lange ___. (schlafen, Perfekt) | haben ; geschlafen | Perfekt: haben 2. yerde, geschlafen sonda.
mc | Nach der Arbeit ___ oft ins Fitnessstudio. | gehe ich* / ich gehe / gehen ich | 1. yer dolu (Nach der Arbeit) → önce fiil, sonra özne.
or | Ich fahre ___ | morgen mit dem Zug nach Köln. | TeKaMoLo: zaman (morgen), nasıl (mit dem Zug), nereye (nach Köln).
mc | Was ___ du am Wochenende gemacht? | hast* / bist / machst | machen Perfekt'te haben alır: hast 2. yerde, gemacht sonda.
or | Leider ___ | kann ich heute nicht kommen. | Leider 1. yerde → kann 2. yerde, kommen sonda.
ty | Meine Schwester ___ nächstes Jahr in Berlin ___. (wollen, studieren) | will ; studieren | Modal fiil (will) 2. yerde, mastar sonda.
mc | Um 7 Uhr ___ ich ___. (aufstehen) | stehe … auf* / aufstehe … – / stehe … an | aufstehen ayrılır: stehe … auf.
or | Im Sommer ___ | fliegen wir in die Türkei. | Im Sommer 1. yerde → fliegen 2. yerde, wir arkasında.
mc | ___ das Wetter morgen schön? | Wird* / Werden / Wirst | Evet/hayır sorusu fiille başlar; das Wetter → wird.
`,
  },
  {
    id: 'nebensatz',
    title: 'Nebensätze: weil, dass, wenn, ob',
    titleTr: 'Yan cümle ve dolaylı sorular',
    level: 'A2',
    summary: 'Yan cümlede çekimli fiil en sona gider.',
    lesson: `
Yan cümlede (Nebensatz) **çekimli fiil en sona** gider. Bağlaç (weil, dass, wenn, ob…) yan cümlenin başında durur.

| Ana cümle | Yan cümle |
|---|---|
| Ich bleibe zu Hause, | weil ich krank ==bin==. |
| Ich glaube, | dass er heute ==kommt==. |
| Ruf mich an, | wenn du Zeit ==hast==. |
| Weißt du, | ob der Supermarkt offen ==ist==? |

### İki parçalı fiiller yan cümlede
Çekimli fiil en sondaki kelimedir, diğer parça hemen önünde durur:
- …, weil ich heute arbeiten ==muss==.
- …, dass wir gestern ins Kino gegangen ==sind==.
- …, wenn der Zug pünktlich ==ankommt==. (ayrılabilen fiil yan cümlede bitişik!)

### Yan cümle öne gelirse
Yan cümle bütün olarak 1. yeri kaplar → ana cümlenin fiili hemen gelir: **fiil, fiil** kalıbı.
- ==Wenn== ich Zeit ==habe==, ==komme== ich.
- ==Weil== es ==regnet==, ==bleiben== wir zu Hause.

### Dolaylı sorular
- W-sorusu → aynı soru kelimesiyle: Wo wohnt er? → Ich weiß nicht, **wo er wohnt**.
- Evet/hayır sorusu → **ob**: Kommt sie? → Ich frage, **ob sie kommt**.

> weil ≠ denn: **denn** ana cümle bağlar, fiil 2. yerde kalır: …, denn ich bin müde. **weil** ile fiil sona gider: …, weil ich müde bin.
`,
    ex: `
or | Ich bleibe zu Hause, ___ | weil ich krank bin. | weil → çekimli fiil (bin) en sonda.
or | Ich glaube, ___ | dass er heute kommt. | dass → fiil (kommt) en sonda.
or | Ruf mich an, ___ | wenn du Zeit hast. | wenn → fiil (hast) en sonda.
mc | Ich lerne Deutsch, weil ich in Deutschland ___. | arbeiten möchte* / möchte arbeiten / arbeite möchte | Yan cümlede çekimli fiil (möchte) en sonda, mastar ondan önce.
mc | Weißt du, ___ der Bus schon weg ist? | ob* / dass / wenn | Evet/hayır sorusu dolaylı olunca: ob.
or | Kannst du mir sagen, ___ | wo der Bahnhof ist? | Dolaylı W-sorusu: wo + özne + … + fiil sonda.
mc | Wenn ich Zeit habe, ___ dich. | besuche ich* / ich besuche / ich besuchen | Yan cümle 1. yerde → ana cümlenin fiili hemen gelir.
ty | Ich weiß, dass du gestern lange ___ ___. (arbeiten, Perfekt) | gearbeitet ; hast | Yan cümlede Perfekt: Partizip + hast (en sonda).
mc | Er sagt, dass der Zug um 9 Uhr ___. | ankommt* / kommt an / an kommt | Ayrılabilen fiil yan cümlede bitişik: ankommt.
mc | Ich gehe nicht mit, ___ ich bin müde. | denn* / weil / dass | Fiil 2. yerde (ich bin müde) → denn.
mc | Ich gehe nicht mit, ___ ich müde bin. | weil* / denn / ob | Fiil sonda → weil.
or | ___ | Weil es regnet, bleiben wir zu Hause. | Yan cümle önde → "fiil, fiil": regnet, bleiben.
ty | Ich frage mich, ___ sie morgen Zeit hat. | ob | Evet/hayır sorusu → ob.
ty | Wir wissen nicht, ___ das Konzert beginnt. (ne zaman) | wann | Dolaylı W-sorusu: wann.
mc | Es ist wichtig, dass man jeden Tag ein bisschen ___. | lernt* / lernen / lernt man | dass → fiil sonda.
or | Ich hoffe, ___ | dass du bald gesund wirst. | dass → wirst en sonda.
mc | ___ du Hilfe brauchst, ruf mich an! | Wenn* / Ob / Dass | Koşul: wenn.
ty | Sie hat gesagt, dass sie heute nicht kommen ___. (können) | kann | Modal fiil yan cümlede en sonda: kommen kann.
`,
  },
  {
    id: 'perfekt',
    title: 'Perfekt: haben oder sein?',
    titleTr: 'Konuşma dilinde geçmiş zaman',
    level: 'A2',
    summary: 'haben/sein 2. yerde + Partizip II sonda. Hareket ve durum değişimi → sein.',
    lesson: `
Konuşmada geçmiş zaman çoğunlukla **Perfekt** ile anlatılır: **haben/sein (çekimli, 2. yerde) + Partizip II (sonda)**.

### sein mi, haben mi?
**sein** alan fiiller:
- Yer değiştirme (A'dan B'ye): gehen, fahren, fliegen, kommen, laufen, reisen, umziehen
- Durum değişimi: aufstehen, einschlafen, aufwachen, sterben, werden, wachsen
- Ayrıca: sein, bleiben, passieren

Geri kalan hemen hepsi **haben**: essen, arbeiten, schlafen, kaufen, lernen, machen…

### Partizip II nasıl yapılır?
| Fiil türü | Kalıp | Örnek |
|---|---|---|
| Düzenli | ge- + kök + -t | machen → ==ge==mach==t== |
| Düzensiz | ge- + (değişen) kök + -en | fahren → ==ge==fahr==en==, trinken → ge==trunk==en |
| Ayrılabilen | ön ek + ge + … | einkaufen → ein==ge==kauft, aufstehen → auf==ge==standen |
| Ayrılamayan (be-, ver-, er-, ent-, ge-, zer-, emp-) | ge- yok | besuchen → besucht, verstehen → verstanden |
| -ieren | ge- yok, -t | studieren → studiert |

### Sık kullanılan düzensizler
| Mastar | Partizip II | Mastar | Partizip II |
|---|---|---|---|
| essen | gegessen | gehen | (ist) gegangen |
| trinken | getrunken | kommen | (ist) gekommen |
| schreiben | geschrieben | fahren | (ist) gefahren |
| lesen | gelesen | bleiben | (ist) geblieben |
| sehen | gesehen | fliegen | (ist) geflogen |
| nehmen | genommen | laufen | (ist) gelaufen |
| sprechen | gesprochen | aufstehen | (ist) aufgestanden |
| treffen | getroffen | einschlafen | (ist) eingeschlafen |
| finden | gefunden | werden | (ist) geworden |
| helfen | geholfen | sein | (ist) gewesen |

> sein ve haben fiillerinin kendisi konuşmada da genelde **Präteritum** ile söylenir: ich war, ich hatte. (ich bin gewesen de doğru ama daha az kullanılır.)
`,
    ex: `
mc | Gestern ___ ich lange geschlafen. | habe* / bin / hatte | schlafen yer değiştirmez → haben.
mc | Wir ___ am Samstag nach München gefahren. | sind* / haben / werden | fahren: A'dan B'ye hareket → sein.
ty | Ich habe eine Pizza ___. (essen) | gegessen | essen → gegessen (düzensiz).
ty | Hast du die Hausaufgaben ___? (machen) | gemacht | Düzenli: ge-mach-t.
ty | Sie ist um 6 Uhr ___. (aufstehen) | aufgestanden | Ayrılabilen + düzensiz: auf-ge-standen; durum değişimi → sein.
ty | Wir haben im Supermarkt ___. (einkaufen) | eingekauft | ein-ge-kauft.
ty | Ich habe dich nicht ___. (verstehen) | verstanden | ver- ayrılmaz → ge- yok.
ty | Er hat in Köln Informatik ___. (studieren) | studiert | -ieren → ge- yok.
mc | Was ___ passiert? | ist* / hat / wird | passieren → sein.
mc | Wie lange ___ ihr in Italien geblieben? | seid* / habt / wart | bleiben → sein.
ty | Ich ___ meine Oma ___. (besuchen) | habe ; besucht | be- ayrılmaz: besucht; haben ile.
ty | ___ du schon mal in Berlin ___? (sein) | Bist ; gewesen | sein → ist gewesen. (Konuşmada: Warst du schon mal…?)
mc | Das Kind ___ schnell eingeschlafen. | ist* / hat / war | einschlafen: durum değişimi → sein.
ty | Wir haben einen Brief ___. (schreiben) | geschrieben | schreiben → geschrieben.
ty | Hast du den Film ___? (sehen) | gesehen | sehen → gesehen.
mc | Ich habe meinen Schlüssel nicht ___. | gefunden* / gefindet / findet | finden → gefunden.
ty | Sie ___ mir sehr ___. (helfen) | hat ; geholfen | helfen → haben + geholfen.
mc | Wann ___ du nach Deutschland gekommen? | bist* / hast / warst | kommen → sein.
ty | Ich ___ gestern mit meinem Chef ___. (telefonieren) | habe ; telefoniert | -ieren → ge- yok; haben.
mc | Wir ___ letztes Jahr umgezogen. | sind* / haben / werden | umziehen (taşınmak) → sein.
`,
  },
  {
    id: 'praetbasic',
    title: 'Präteritum: war, hatte, Modalverben',
    titleTr: 'sein, haben ve modal fiillerin geçmişi',
    level: 'A2',
    summary: 'Konuşmada da: ich war, ich hatte, ich musste, ich konnte.',
    lesson: `
Konuşmada bile şu fiiller geçmişte genelde **Präteritum** ile söylenir: **sein, haben** ve **modal fiiller**.

| | sein | haben | können | müssen | wollen |
|---|---|---|---|---|---|
| ich | war | hatte | konnte | musste | wollte |
| du | warst | hattest | konntest | musstest | wolltest |
| er/sie/es | war | hatte | konnte | musste | wollte |
| wir | waren | hatten | konnten | mussten | wollten |
| ihr | wart | hattet | konntet | musstet | wolltet |
| sie/Sie | waren | hatten | konnten | mussten | wollten |

Diğerleri: dürfen → **durfte**, sollen → **sollte**, mögen → **mochte**.

> Modal fiillerde Präteritum'da **umlaut düşer**: können → konnte, müssen → musste, dürfen → durfte. ich ve er/sie/es formu aynıdır.

- Gestern ==war== ich müde.
- Wir ==hatten== keine Zeit.
- Ich ==musste== lange ==arbeiten==. (mastar sonda!)
- Als Kind ==wollte== ich Pilot ==werden==.
`,
    ex: `
mc | Gestern ___ ich krank. | war* / bin / hatte | sein → ich war.
mc | Wir ___ letzte Woche keine Zeit. | hatten* / waren / haben | haben → wir hatten.
ty | ___ du gestern auf der Party? (sein) | Warst | sein → du warst.
ty | Ich ___ gestern nicht kommen. (können) | konnte | können → konnte (umlaut yok).
ty | Er ___ früh aufstehen. (müssen) | musste | müssen → musste.
ty | Als Kind ___ ich Ärztin werden. (wollen) | wollte | wollen → wollte.
mc | Ihr ___ sehr nett zu mir. | wart* / waren / wartet | sein → ihr wart.
ty | Die Kinder ___ nicht draußen spielen. (dürfen) | durften | dürfen → durften.
mc | Wo ___ du so lange? | warst* / hattest / bist | sein → du warst.
ty | Wir ___ viel Glück. (haben) | hatten | haben → wir hatten.
ty | Sie ___ das Essen nicht. (mögen) | mochte | mögen → mochte.
mc | Ich ___ eigentlich heute anrufen. | sollte* / sollt / solle | sollen → ich sollte.
or | Letztes Jahr ___ | musste ich viel arbeiten. | Modal fiil 2. yerde, mastar sonda.
ty | Wie ___ der Urlaub? (sein) | war | sein → er war.
mc | ___ ihr Hunger? | Hattet* / Hatten / Hattest | haben → ihr hattet.
ty | Mein Vater ___ früher einen alten Mercedes. (haben) | hatte | haben → er hatte.
`,
  },
  {
    id: 'trennbar',
    title: 'Trennbare & untrennbare Verben',
    titleTr: 'Ayrılabilen ve ayrılamayan fiiller',
    level: 'A2',
    summary: 'an-, auf-, ein-, mit-… ayrılıp sona gider; be-, ver-, er-… asla ayrılmaz.',
    lesson: `
Bazı fiillerin ön eki cümlede **ayrılır ve en sona** gider.

| Ön ek | Örnek | Cümlede |
|---|---|---|
| an | anrufen | Ich ==rufe== dich morgen ==an==. |
| auf | aufstehen | Er ==steht== um 6 Uhr ==auf==. |
| ein | einkaufen | Wir ==kaufen== im Supermarkt ==ein==. |
| mit | mitkommen | ==Kommst== du ==mit==? |
| aus | aussteigen | Wir ==steigen== hier ==aus==. |
| zurück | zurückgeben | Ich ==gebe== dir das Buch ==zurück==. |

Ayrılabilen ön ekler: **ab, an, auf, aus, bei, ein, mit, nach, vor, weg, zu, zurück, fern, los, um…** Vurgu ön ektedir: ==AN==rufen.

**Ayrılamayan** ön ekler hiç ayrılmaz ve Perfekt'te ge- almaz: **be-, emp-, ent-, er-, ge-, miss-, ver-, zer-**. Vurgu köktedir: be==SU==chen.

### Ön ek nerede durur?
| Durum | Örnek |
|---|---|
| Ana cümle | Der Film ==fängt== um 8 ==an==. |
| Modal fiille | Der Film ==soll== um 8 ==anfangen==. |
| Perfekt | Der Film ==hat== um 8 ==angefangen==. |
| Yan cümle | …, weil der Film um 8 ==anfängt==. |
| zu + mastar | Ich habe vergessen, dich ==anzurufen==. |
`,
    ex: `
ty | Ich ___ dich heute Abend ___. (anrufen) | rufe ; an | Ana cümlede ayrılır: rufe … an.
ty | Wann ___ du morgen ___? (aufstehen) | stehst ; auf | stehst … auf.
or | Wir ___ | kaufen am Samstag ein. | ein en sona gider.
mc | ___ du heute Abend ___? (mitkommen) | Kommst … mit* / Mitkommst … – / Kommst … an | Soru: Kommst du … mit?
mc | Der Zug soll um 10 Uhr ___. | ankommen* / kommen an / an kommen | Modal fiille mastar bitişik: ankommen.
ty | Wir sind in Frankfurt ___. (umsteigen) | umgestiegen | um-ge-stiegen; hareket → sein.
mc | Ich ___ das Wort nicht. | verstehe* / stehe … ver / verstehe … ver | ver- ayrılmaz.
ty | Kannst du mir das Buch ___? (zurückgeben) | zurückgeben | Modal fiille mastar bitişik.
mc | Ich weiß nicht, wann der Kurs ___. | anfängt* / fängt an / an fängt | Yan cümlede bitişik: anfängt.
ty | Hast du schon ___? (einkaufen) | eingekauft | ein-ge-kauft.
ty | Ich habe meinen Freund ___. (besuchen) | besucht | be- ayrılmaz → ge- yok.
ty | Bitte ___ Sie hier ___! (aussteigen) | steigen ; aus | Emir (Sie): Steigen Sie … aus.
ty | Es ist schwer, früh ___. (aufstehen, zu + mastar) | aufzustehen | zu, ön ek ile kök arasına girer.
mc | Der Film hat schon ___. | angefangen* / angefängt / geanfangen | an-ge-fangen.
or | Morgen ___ | rufe ich den Arzt an. | Morgen 1. yerde → rufe 2. yerde, an sonda.
ty | Was ___ du heute Abend ___? (vorhaben) | hast ; vor | vorhaben: hast … vor.
`,
  },
]
