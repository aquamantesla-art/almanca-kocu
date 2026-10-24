import type { RawTopic } from './raw'

export const B1A: RawTopic[] = [
  {
    id: 'praeteritum',
    title: 'Präteritum',
    titleTr: 'Anlatı geçmişi (haber, hikâye)',
    level: 'B1',
    summary: 'Düzenli: -te (machte). Düzensiz: kök değişir (ging, kam, fuhr).',
    lesson: `
**Präteritum** yazılı anlatımın (hikâye, haber, rapor) geçmiş zamanıdır. Konuşmada Perfekt daha yaygındır ama haberlerde ve kitaplarda Präteritum'u **tanıman** şart.

### Düzenli fiiller: kök + -te
| | machen | arbeiten |
|---|---|---|
| ich | mach==te== | arbeit==ete== |
| du | mach==test== | arbeit==etest== |
| er/sie/es | mach==te== | arbeit==ete== |
| wir | mach==ten== | arbeit==eten== |
| ihr | mach==tet== | arbeit==etet== |
| sie/Sie | mach==ten== | arbeit==eten== |

### Düzensiz fiiller: kök değişir, ich ve er formunda ek yok
| | gehen | kommen |
|---|---|---|
| ich | ==ging== | ==kam== |
| du | ging==st== | kam==st== |
| er/sie/es | ==ging== | ==kam== |
| wir | ging==en== | kam==en== |
| ihr | ging==t== | kam==t== |
| sie/Sie | ging==en== | kam==en== |

### Bilmen gereken düzensizler
| Mastar | Präteritum | Mastar | Präteritum |
|---|---|---|---|
| gehen | ging | sehen | sah |
| kommen | kam | geben | gab |
| fahren | fuhr | nehmen | nahm |
| finden | fand | sprechen | sprach |
| bleiben | blieb | schreiben | schrieb |
| essen | aß | trinken | trank |
| lesen | las | sitzen | saß |
| stehen | stand | liegen | lag |
| laufen | lief | rufen | rief |
| denken | dachte | bringen | brachte |
| wissen | wusste | kennen | kannte |
| werden | wurde | tun | tat |

> Karışık fiiller (denken, bringen, kennen, wissen, nennen) hem kök değiştirir hem -te alır: dachte, brachte, kannte.

Haber dilinden: Der Zug ==kam== mit zwei Stunden Verspätung ==an==. Die Polizei ==fand== das Auto am Abend.
`,
    ex: `
ty | Gestern ___ ich mit dem Bus zur Arbeit. (fahren) | fuhr | fahren → fuhr.
ty | Er ___ um 8 Uhr nach Hause. (kommen) | kam | kommen → kam.
ty | Wir ___ den ganzen Tag. (arbeiten) | arbeiteten | Kök -t ile bitiyor → arbeit-ete-n.
mc | Als Kind ___ ich viel. | las* / lies / lest | lesen → las.
ty | Sie ___ einen Brief an ihre Mutter. (schreiben) | schrieb | schreiben → schrieb.
ty | Ich ___ das nicht. (wissen) | wusste | wissen → wusste.
mc | Der Unfall ___ um 7 Uhr. | passierte* / passiert / passierten | Düzenli: passier-te.
ty | Wir ___ ins Restaurant. (gehen) | gingen | gehen → gingen.
ty | Er ___ einen Kaffee und ___ die Zeitung. (trinken, lesen) | trank ; las | trinken → trank, lesen → las.
mc | Plötzlich ___ das Telefon. | klingelte* / klingeltet / klang | Düzenli: klingel-te.
ty | Ich ___ an dich. (denken) | dachte | denken → dachte (karışık).
ty | Die Kinder ___ im Garten. (spielen) | spielten | Düzenli: spiel-ten.
mc | Die Polizei ___ den Dieb nach zwei Tagen. | fand* / findete / fund | finden → fand.
ty | Wo ___ du gestern Abend? (sein) | warst | sein → du warst.
ty | Das Wetter ___ schlecht. (werden) | wurde | werden → wurde.
mc | Er ___ mir ein Geschenk. | brachte* / bringte / brang | bringen → brachte.
ty | Wir ___ zwei Stunden am Bahnhof. (warten) | warteten | wart-ete-n.
mc | Sie ___ lange am Fenster. | stand* / stehte / standen | stehen → stand.
`,
  },
  {
    id: 'temporal',
    title: 'Temporale Nebensätze & Plusquamperfekt',
    titleTr: 'als/wenn, bevor, nachdem, während, seit, bis',
    level: 'B1',
    summary: 'Geçmişte bir kez → als; her seferinde → wenn. nachdem + Plusquamperfekt.',
    lesson: `
### als mı wenn mi?
| | Geçmişte **bir kez** | Geçmişte **her seferinde** / şimdi / gelecek |
|---|---|---|
| Bağlaç | **als** | **wenn** (immer wenn) |
| Örnek | ==Als== ich 10 war, zogen wir um. | ==Wenn== ich Zeit habe, lese ich. |
| Örnek | ==Als== ich ankam, regnete es. | ==Immer wenn== er kam, brachte er Blumen mit. |

### Diğer zaman bağlaçları (yan cümle → fiil sonda)
| Bağlaç | Anlam | Örnek |
|---|---|---|
| während | -iken | ==Während== ich koche, hört er Musik. |
| bevor | -meden önce | ==Bevor== ich schlafe, lese ich. |
| nachdem | -dikten sonra | ==Nachdem== ich gegessen hatte, ging ich spazieren. |
| seit / seitdem | -den beri | ==Seit== ich in Berlin wohne, fahre ich Fahrrad. |
| bis | -e kadar | Warte, ==bis== ich komme! |
| sobald | -ir -mez | ==Sobald== ich fertig bin, rufe ich dich an. |

### Plusquamperfekt: geçmişten de önce
**hatte/war + Partizip II**. Çoğunlukla nachdem ile kullanılır.
- ==Nachdem== wir gegessen ==hatten==, ==gingen== wir ins Kino.
- Als ich am Bahnhof ankam, ==war== der Zug schon ==abgefahren==.

> nachdem-cümlesi ana cümleden "bir adım önce"dir: ana cümle geçmişteyse nachdem-cümlesi **Plusquamperfekt** olur; ana cümle şimdiki zamandaysa nachdem-cümlesi Perfekt olur.
`,
    ex: `
mc | ___ ich ein Kind war, wohnten wir in Izmir. | Als* / Wenn / Wann | Geçmişte tek bir dönem → als.
mc | ___ ich Zeit habe, gehe ich schwimmen. | Wenn* / Als / Wann | Şimdiki zaman, tekrar eden → wenn.
mc | Immer ___ es regnete, blieben wir zu Hause. | wenn* / als / wann | Geçmişte tekrar eden → (immer) wenn.
mc | ___ ich schlafe, lese ich noch ein bisschen. | Bevor* / Nachdem / Während | Uyumadan önce → bevor.
ty | Nachdem er gegessen ___, ging er spazieren. | hatte | Plusquamperfekt: hatte + gegessen.
ty | Als wir ankamen, ___ der Film schon ___. (anfangen) | hatte ; angefangen | Plusquamperfekt: hatte angefangen.
mc | ___ ich in Deutschland lebe, spreche ich jeden Tag Deutsch. | Seit* / Als / Bis | -den beri → seit.
mc | Warte hier, ___ ich zurückkomme! | bis* / bevor / seit | -e kadar → bis.
ty | Nachdem sie ins Kino gegangen ___, aßen sie Pizza. | waren | gehen → sein: waren gegangen.
mc | ___ ich koche, räumt mein Mann die Wohnung auf. | Während* / Nachdem / Als | Aynı anda → während.
or | ___ | Als ich nach Hause kam, war niemand da. | als-cümlesi önde → kam, war (fiil, fiil).
mc | Ich rufe dich an, ___ ich in Berlin angekommen bin. | sobald* / bevor / während | Varır varmaz → sobald.
ty | Der Zug ___ schon ___, als ich zum Bahnhof kam. (abfahren) | war ; abgefahren | abfahren → sein: war abgefahren.
mc | ___ du gehst, mach bitte das Licht aus! | Bevor* / Nachdem / Seit | Gitmeden önce → bevor.
mc | Wann hast du ihn kennengelernt? – ___ ich in Köln studiert habe. | Als* / Wenn / Wann | Geçmişte tek dönem → als.
ty | Nachdem ich die Prüfung bestanden ___, habe ich gefeiert. | hatte | Ana cümle geçmiş → Plusquamperfekt: hatte bestanden.
or | ___ | Bevor ich zur Arbeit gehe, trinke ich einen Kaffee. | bevor-cümlesi önde → gehe, trinke.
mc | ___ ich jung war, konnte ich schneller laufen. | Als* / Wenn / Wann | Geçmişte tek dönem → als.
`,
  },
  {
    id: 'konj2',
    title: 'Konjunktiv II',
    titleTr: 'Rica, dilek, tavsiye, gerçek dışı koşul',
    level: 'B1',
    summary: 'würde + mastar; wäre, hätte, könnte, müsste, sollte. Türkçedeki -se/-sa, -erdi.',
    lesson: `
Konjunktiv II şu anlamları taşır: **dilek, kibar rica, tavsiye, hayal** (-se/-sa, -erdi).

### Formlar
| | würde + mastar | sein | haben | können | müssen | sollen |
|---|---|---|---|---|---|---|
| ich | würde … gehen | wäre | hätte | könnte | müsste | sollte |
| du | würdest | wärst | hättest | könntest | müsstest | solltest |
| er/sie/es | würde | wäre | hätte | könnte | müsste | sollte |
| wir | würden | wären | hätten | könnten | müssten | sollten |
| ihr | würdet | wärt | hättet | könntet | müsstet | solltet |
| sie/Sie | würden | wären | hätten | könnten | müssten | sollten |

Çoğu fiil için **würde + mastar** kullanılır: Ich ==würde== gern nach Kanada ==reisen==.
sein, haben ve modal fiiller kendi formuyla: wäre, hätte, könnte…

### Kullanım
| Amaç | Örnek |
|---|---|
| Kibar rica | ==Könnten== Sie mir helfen? ==Würden== Sie das Fenster öffnen? |
| Dilek | Ich ==hätte== gern einen Kaffee. Ich ==wäre== gern am Meer. |
| Tavsiye | Du ==solltest== mehr schlafen. An deiner Stelle ==würde== ich zum Arzt gehen. |
| Gerçek dışı koşul | ==Wenn== ich mehr Zeit ==hätte==, ==würde== ich mehr lesen. |
| Hayıflanma | ==Wenn== ich doch nur Urlaub ==hätte==! |

> "Wenn ich reich wäre…" = "Zengin olsaydım…". Türkçedeki **-se/-sa** ve **-erdi** genelde Konjunktiv II'dir.
`,
    ex: `
ty | Wenn ich Zeit ___, würde ich dich besuchen. (haben) | hätte | haben → hätte.
ty | ___ Sie mir bitte helfen? (können) | Könnten | Kibar rica: Könnten Sie…?
mc | Du ___ mehr Wasser trinken. | solltest* / sollst / würdest | Tavsiye: du solltest.
ty | Ich ___ gern Arzt. (sein) | wäre | Dilek: ich wäre gern…
mc | An deiner Stelle ___ ich das nicht machen. | würde* / wäre / hätte | würde + mastar (machen).
ty | Wenn ich reich ___, ___ ich ein Haus kaufen. (sein, werden) | wäre ; würde | wäre … würde kaufen.
mc | Ich ___ gern ein Glas Wasser. | hätte* / habe / wäre | Kibar sipariş: Ich hätte gern…
ty | ___ du mir das Salz geben? (werden) | Würdest | Rica: Würdest du…?
or | ___ | Wenn ich Zeit hätte, würde ich mehr lesen. | wenn-cümlesi önde → hätte, würde.
mc | Wenn das Wetter schön ___, könnten wir grillen. | wäre* / ist / würde | Gerçek dışı koşul: wäre.
ty | Wir ___ eigentlich früher losfahren. (müssen) | müssten | müssen → müssten.
mc | ___ Sie so nett und öffnen das Fenster? | Wären* / Würden / Hätten | Kalıp: Wären Sie so nett…?
ty | Wenn ich du ___, würde ich den Job nehmen. (sein) | wäre | Wenn ich du wäre… = Senin yerinde olsam…
mc | Wenn ich doch nur mehr Geld ___! | hätte* / habe / würde | Hayıflanma: hätte.
ty | Ich ___ gern mit dir ins Kino gehen. (werden) | würde | würde + gehen.
mc | Das ___ eine gute Idee! | wäre* / würde / hätte | sein → wäre.
ty | Es ___ schön, wenn du kommen ___. (sein, können) | wäre ; könntest | wäre … könntest.
mc | Was ___ du machen, wenn du im Lotto gewinnen würdest? | würdest* / wärst / hättest | würdest + machen.
`,
  },
  {
    id: 'konnektoren',
    title: 'Konnektoren: weil, denn, deshalb, obwohl, trotzdem',
    titleTr: 'Neden, sonuç, karşıtlık bağlaçları',
    level: 'B1',
    summary: 'Aynı anlam, farklı fiil yeri: weil/obwohl → sonda; denn → 2. yer; deshalb/trotzdem → hemen arkasında.',
    lesson: `
Aynı anlamı farklı bağlaçlar farklı **fiil yeriyle** verir. Asıl zorluk anlam değil, kelime sırası!

| Anlam | Yan cümle (fiil sonda) | Ana cümle (bağlaç 0. yer) | Zarf (1. yerde, fiil hemen arkasında) |
|---|---|---|---|
| neden | **weil**, da | **denn** | – |
| sonuç | – | – | **deshalb, deswegen, darum, also** |
| karşıtlık | **obwohl** | aber | **trotzdem** |

- Ich bleibe zu Hause, ==weil== ich krank ==bin==.
- Ich bleibe zu Hause, ==denn== ich ==bin== krank.
- Ich bin krank, ==deshalb bleibe== ich zu Hause.
- ==Obwohl== ich krank ==bin==, gehe ich zur Arbeit.
- Ich bin krank, ==trotzdem gehe== ich zur Arbeit.

### Edat olarak: wegen / trotz (+ Genitiv)
- ==Wegen des== Regens bleiben wir zu Hause.
- ==Trotz des== Regens gehen wir spazieren.

### sondern mı aber mı?
- **sondern**: olumsuzdan sonra "bilakis": Ich trinke ==nicht== Kaffee, ==sondern== Tee.
- **aber**: "ama": Ich trinke gern Kaffee, ==aber== keinen Tee.

> deshalb ve trotzdem 1. yeri kaplar → arkasından çekimli fiil gelir: "deshalb **bleibe ich**" (deshalb ich bleibe ❌).
`,
    ex: `
mc | Ich lerne Deutsch, ___ ich in Deutschland arbeiten will. | weil* / denn / deshalb | Fiil sonda → weil.
mc | Ich lerne Deutsch, ___ ich will in Deutschland arbeiten. | denn* / weil / obwohl | Fiil 2. yerde → denn.
or | Es regnet, ___ | deshalb bleiben wir zu Hause. | deshalb + fiil + özne.
mc | ___ ich müde bin, gehe ich joggen. | Obwohl* / Trotzdem / Weil | Karşıtlık + fiil sonda → obwohl.
or | Ich bin müde, ___ | trotzdem gehe ich joggen. | trotzdem + fiil + özne.
mc | Er ist nicht dumm, ___ faul. | sondern* / aber / denn | Olumsuzdan sonra "bilakis" → sondern.
mc | Das Essen war teuer, ___ sehr lecker. | aber* / sondern / obwohl | "ama" → aber.
ty | Der Bus kam nicht, ___ bin ich zu spät gekommen. (bu yüzden) | deshalb / deswegen / darum | Sonuç + fiil hemen arkasında.
mc | ___ des Regens fand das Konzert statt. | Trotz* / Wegen / Obwohl | Edat + Genitiv, karşıtlık → trotz.
mc | ___ des Streiks fahren heute keine Züge. | Wegen* / Trotz / Weil | Edat + Genitiv, neden → wegen.
ty | Ich gehe zum Arzt, ___ ich Kopfschmerzen habe. | weil / da | Fiil sonda → weil (ya da da).
or | Ich habe wenig Geld, ___ | trotzdem fahre ich in Urlaub. | trotzdem + fiil + özne.
mc | ___ er viel lernt, besteht er die Prüfung nicht. | Obwohl* / Weil / Deshalb | Karşıtlık → obwohl.
mc | Ich habe den Zug verpasst, ___ ich zu spät aufgestanden bin. | weil* / deshalb / trotzdem | Fiil sonda → weil.
or | Ich habe den Zug verpasst, ___ | deshalb bin ich zu spät gekommen. | deshalb + bin + ich.
mc | Wir fahren nicht mit dem Auto, ___ mit dem Zug. | sondern* / aber / oder | nicht … sondern.
ty | ___ es kalt war, sind wir schwimmen gegangen. (rağmen) | Obwohl | Karşıtlık + fiil sonda → Obwohl.
mc | Sie war krank. ___ ist sie zur Arbeit gegangen. | Trotzdem* / Obwohl / Weil | Fiil hemen arkasında → Trotzdem.
`,
  },
  {
    id: 'relativ',
    title: 'Relativsätze',
    titleTr: 'İlgi cümleleri (-en, -dığı)',
    level: 'B1',
    summary: 'Cinsiyet isimden, hal ilgi cümlesinin içinden gelir. Dativ çoğul: denen.',
    lesson: `
İlgi cümlesi bir ismi açıklar: "dün aldığım kitap" → "das Buch, ==das== ich gestern gekauft ==habe==". Fiil sona gider.

### İlgi zamirleri
| | {m:mask.} | {f:fem.} | {n:neutr.} | {p:çoğul} |
|---|---|---|---|---|
| Nom. | {m:der} | {f:die} | {n:das} | {p:die} |
| Akk. | {m:den} | {f:die} | {n:das} | {p:die} |
| Dat. | {m:dem} | {f:der} | {n:dem} | {p:denen} |
| Gen. | {m:dessen} | {f:deren} | {n:dessen} | {p:deren} |

### İki soru, iki karar
1. **Cinsiyet ve sayı** → açıkladığın isimden: der Mann → der/den/dem…
2. **Hal (Kasus)** → ilgi cümlesinin içindeki görevden:
- Der Mann, ==der== dort ==steht==, ist mein Chef. (Nom.: der Mann steht)
- Der Mann, ==den== ich gestern ==gesehen habe==, … (Akk.: ich habe den Mann gesehen)
- Der Mann, ==dem== ich ==helfe==, … (Dat.: ich helfe dem Mann)
- Die Leute, ==denen== ich ==danke==, … (Dat. çoğul: denen!)

### Edatla
Edat ilgi zamirinin **önüne** gelir:
- Die Stadt, ==in der== ich ==wohne==, ist sehr schön.
- Der Freund, ==mit dem== ich ==telefoniert habe==, wohnt in Wien.

### Yer için: wo
- Die Stadt, ==wo== ich wohne… (= in der)

> Türkçedeki "-en, -dığı" sıfat-fiilleri (dün gördüğüm adam) Almancada ilgi cümlesidir: der Mann, den ich gestern gesehen habe.
`,
    ex: `
mc | Das ist der Mann, ___ neben mir wohnt. | der* / den / dem | Özne (der Mann wohnt) → Nom.: der.
mc | Das ist der Film, ___ ich gestern gesehen habe. | den* / der / dem | ich habe den Film gesehen → Akk.: den.
mc | Die Frau, ___ ich geholfen habe, war sehr nett. | der* / die / dem | helfen + Dativ, fem. → der.
mc | Das Buch, ___ du mir gegeben hast, ist spannend. | das* / dem / den | du hast mir das Buch gegeben → Akk. neutr.: das.
ty | Die Kinder, ___ im Garten spielen, sind laut. | die | Çoğul, Nom. → die.
ty | Die Leute, mit ___ ich arbeite, sind sehr nett. | denen | mit + Dativ çoğul → denen.
mc | Die Stadt, in ___ ich wohne, ist klein. | der* / die / dem | in + Dativ (Wo?), fem. → der.
ty | Der Kollege, ___ ich angerufen habe, ist krank. | den | anrufen + Akk., mask. → den.
or | Das ist die Wohnung, ___ | die ich mieten möchte. | İlgi cümlesinde fiil (möchte) sonda.
mc | Wie heißt das Restaurant, ___ wir letzte Woche gegessen haben? | in dem* / das / den | Nerede yedik? → in dem (Dativ).
ty | Ist das der Bus, ___ zum Bahnhof fährt? | der | Özne → Nom. mask.: der.
mc | Ich habe eine Freundin, ___ Bruder in Berlin lebt. | deren* / dessen / der | Kimin kardeşi? fem. → deren (Genitiv).
ty | Das ist das Kind, ___ ich ein Eis gekauft habe. | dem | Kime aldım? → Dativ neutr.: dem.
mc | Der Arzt, zu ___ ich immer gehe, hat heute zu. | dem* / den / der | zu + Dativ, mask. → dem.
or | Kennst du den Mann, ___ | der dort am Fenster steht? | Özne → der; fiil (steht) sonda.
ty | Die Firma, bei ___ ich arbeite, sucht neue Mitarbeiter. | der | bei + Dativ, fem. → der.
mc | Das sind die Schuhe, ___ ich gestern gekauft habe. | die* / denen / den | Akk. çoğul → die.
mc | Das ist der Ort, ___ ich geboren bin. | wo* / wohin / wann | Yer → wo.
`,
  },
  {
    id: 'verbpraep',
    title: 'Verben mit Präpositionen, da- & wo-Wörter',
    titleTr: 'Edatlı fiiller: warten auf, denken an…',
    level: 'B1',
    summary: 'Edat Türkçeyle örtüşmez, kalıp olarak öğren. Şeyler için worauf?/darauf.',
    lesson: `
Birçok fiil sabit bir edatla kullanılır. Edat Türkçeyle **örtüşmez**, kalıp olarak ezberlenmeli.

| Fiil | Edat + hal | Örnek |
|---|---|---|
| warten | **auf** + Akk. | Ich warte ==auf den== Bus. |
| sich freuen | **auf** + Akk. (gelecek) | Ich freue mich ==auf das== Wochenende. |
| sich freuen | **über** + Akk. (olmuş) | Ich freue mich ==über das== Geschenk. |
| sich interessieren | **für** + Akk. | Er interessiert sich ==für== Politik. |
| denken | **an** + Akk. | Ich denke oft ==an== dich. |
| sich erinnern | **an** + Akk. | Erinnerst du dich ==an== ihn? |
| sprechen | **über** + Akk. / **mit** + Dat. | Wir sprechen ==über das== Problem. |
| sich ärgern | **über** + Akk. | Sie ärgert sich ==über den== Lärm. |
| Angst haben | **vor** + Dat. | Ich habe Angst ==vor== Hunden. |
| teilnehmen | **an** + Dat. | Ich nehme ==an dem== Kurs teil. |
| sich kümmern | **um** + Akk. | Wer kümmert sich ==um die== Kinder? |
| fragen | **nach** + Dat. | Er fragt ==nach dem== Weg. |
| träumen | **von** + Dat. | Ich träume ==von einem== Haus. |
| sich bewerben | **um** + Akk. / **bei** + Dat. | Ich bewerbe mich ==um die== Stelle ==bei== Siemens. |
| abhängen | **von** + Dat. | Das hängt ==vom== Wetter ab. |
| sich beschweren | **über** + Akk. / **bei** + Dat. | Sie beschwert sich ==beim== Chef ==über den== Lärm. |

### wo(r)- ve da(r)- kelimeleri (şeyler için)
| | Soru | Cevap / gönderme |
|---|---|---|
| Şey | ==Worauf== wartest du? | Ich warte ==darauf==. |
| Şey | ==Wofür== interessierst du dich? | ==Dafür== interessiere ich mich nicht. |
| Kişi | ==Auf wen== wartest du? | Ich warte ==auf ihn==. |

Edat sesli harfle başlıyorsa araya **r** girer: wo==r==an, da==r==über, wo==r==auf.

> da-kelimesi bir yan cümleyi de gösterebilir: Ich freue mich ==darauf==, dass du kommst.
`,
    ex: `
mc | Ich warte ___ den Bus. | auf* / für / an | warten auf + Akk.
mc | Interessierst du dich ___ Kunst? | für* / an / über | sich interessieren für.
mc | Ich denke oft ___ meine Familie. | an* / über / von | denken an + Akk.
mc | Wir freuen uns ___ die Ferien. (henüz gelmedi) | auf* / über / für | Gelecek → sich freuen auf.
mc | Er hat sich sehr ___ das Geschenk gefreut. | über* / auf / für | Olmuş bir şey → sich freuen über.
ty | ___ wartest du? – Auf den Zug. | Worauf | Şey için soru: wo + r + auf.
ty | Ich habe keine Lust ___. (auf + es) | darauf | Lust haben auf → darauf.
mc | Hast du Angst ___ der Prüfung? | vor* / für / über | Angst haben vor + Dat.
ty | ___ sprecht ihr? – Über den Film. | Worüber | wo + r + über.
mc | Ich kümmere mich ___ meine Oma. | um* / für / an | sich kümmern um.
mc | Sie nimmt ___ einem Deutschkurs teil. | an* / in / bei | teilnehmen an + Dat.
ty | Ich träume ___ einer Reise nach Japan. | von | träumen von + Dat.
mc | ___ wen denkst du? – An meine Freundin. | An* / Woran / Daran | Kişi → an wen.
ty | Ich bewerbe mich ___ die Stelle als Krankenpfleger. | um | sich bewerben um + Akk.
mc | Das hängt ___ Wetter ab. | vom* / am / zum | abhängen von + Dat.: vom.
ty | Erinnerst du dich ___ unseren ersten Urlaub? | an | sich erinnern an + Akk.
ty | Ich ärgere mich ___, dass der Zug Verspätung hat. (über + es) | darüber | sich ärgern über → darüber.
mc | Er fragt den Polizisten ___ dem Weg. | nach* / über / für | fragen nach + Dat.
`,
  },
  {
    id: 'passiv',
    title: 'Passiv',
    titleTr: 'Edilgen çatı (yapılır, yapıldı)',
    level: 'B1',
    summary: 'werden + Partizip II. Präteritum: wurde. Perfekt: ist … worden.',
    lesson: `
Passiv'de **işi yapan değil, iş** önemlidir: "Burada Almanca konuşulur." Haberlerde, talimatlarda ve resmi metinlerde çok sık!

### Kuruluş: werden + Partizip II
| Zaman | Kalıp | Örnek |
|---|---|---|
| Präsens | wird + Partizip II | Das Haus ==wird== ==gebaut==. |
| Präteritum | wurde + Partizip II | Das Haus ==wurde== 1990 ==gebaut==. |
| Perfekt | ist + Partizip II + worden | Das Haus ==ist== 1990 ==gebaut worden==. |
| Modal fiille | muss + Partizip II + werden | Das Formular ==muss== heute ==ausgefüllt werden==. |

- Aktiv: Der Mechaniker ==repariert== das Auto.
- Passiv: Das Auto ==wird== (vom Mechaniker) ==repariert==.

İşi yapan söylenecekse **von + Dativ**: vom Mechaniker, von der Polizei.

### werden'in üç görevi
| | Örnek | Anlam |
|---|---|---|
| tek başına | Er ==wird== Arzt. | olmak |
| + mastar | Es ==wird== regnen. | gelecek zaman (Futur) |
| + Partizip II | Es ==wird== gebaut. | Passiv |

> Haber cümlesi: "Der Täter ==wurde== gestern ==festgenommen==." = Fail dün yakalandı.
`,
    ex: `
ty | Das Auto ___ heute repariert. | wird | Passiv Präsens: wird + Partizip II.
ty | Die Briefe ___ jeden Morgen gebracht. | werden | Çoğul → werden.
ty | Das Haus wurde 1950 ___. (bauen) | gebaut | Partizip II: gebaut.
mc | Hier ___ Deutsch gesprochen. | wird* / ist / hat | Passiv Präsens: wird gesprochen.
ty | Der Dieb ___ gestern von der Polizei ___. (festnehmen, Präteritum) | wurde ; festgenommen | wurde + festgenommen.
mc | Das Formular muss bis Freitag ___. | ausgefüllt werden* / ausfüllen werden / ausgefüllt wird | Modal + Partizip II + werden.
ty | Die Stadt ___ im Krieg zerstört. (Präteritum) | wurde | Passiv Präteritum: wurde.
mc | Das Paket ist gestern geliefert ___. | worden* / geworden / werden | Passiv Perfekt: worden (ge- yok).
ty | Die Fenster ___ jede Woche ___. (putzen, Präsens) | werden ; geputzt | werden + geputzt.
mc | Er ___ nächstes Jahr Lehrer. | wird* / wurde gemacht / ist worden | Burada werden = olmak.
or | ___ | Das Essen wird gerade gekocht. | wird 2. yerde, Partizip II sonda.
ty | Die Rechnung muss sofort ___ werden. (bezahlen) | bezahlt | Partizip II: bezahlt.
mc | Wann ___ die Post gebracht? | wird* / ist / hat | Passiv Präsens: wird gebracht.
ty | Amerika ___ 1492 von Kolumbus entdeckt. | wurde | Geçmiş → wurde.
mc | Die Kinder ___ vom Vater abgeholt. | werden* / wird / worden | Çoğul → werden.
ty | In Deutschland ___ viel Brot gegessen. | wird | Özne yok ("Brot") → wird.
`,
  },
]
