import { parseExercises, parseGlossary } from './parse'
import type { Reading } from './types'

interface RawReading {
  id: string
  week: number
  title: string
  level: 'A2' | 'B1'
  text: string
  glossary: string
  questions: string
}

const RAW: RawReading[] = [
  {
    id: 'r01',
    week: 1,
    title: 'Ein ganz normaler Tag',
    level: 'A2',
    text: `
Ayşe wohnt seit einem Jahr in Köln. Sie arbeitet in einer Apotheke in der Innenstadt. Jeden Morgen steht sie um halb sechs auf, weil sie um sieben Uhr anfangen muss.

Zuerst trinkt sie einen Tee und isst ein Brötchen mit Käse. Dann fährt sie mit der Straßenbahn zur Arbeit. Die Fahrt dauert ungefähr zwanzig Minuten. In der Bahn hört sie oft einen deutschen Podcast, denn sie möchte ihr Deutsch verbessern.

In der Apotheke ist immer viel los. Die Kunden haben viele Fragen, und manchmal versteht Ayşe nicht alles. Dann fragt sie ihre Kollegin Sabine. Sabine ist sehr nett und erklärt ihr alles geduldig.

Um vier Uhr hat Ayşe Feierabend. Zweimal pro Woche geht sie danach zum Deutschkurs. An den anderen Tagen kauft sie ein, kocht und ruft ihre Familie in Izmir an. Am Abend ist sie meistens sehr müde, aber sie ist zufrieden.
`,
    glossary: `
innenstadt = şehir merkezi
halb sechs = beş buçuk
fahrt = yolculuk
verbessern = geliştirmek
ist viel los = çok hareketli, çok iş var
kunden = müşteriler
geduldig = sabırla
feierabend = iş çıkışı
zweimal = iki kez
zufrieden = memnun
`,
    questions: `
mc | Warum steht Ayşe so früh auf? | Weil sie um sieben Uhr anfangen muss.* / Weil sie gern früh frühstückt. / Weil die Bahn nicht fährt. | "…, weil sie um sieben Uhr anfangen muss."
mc | Was macht Ayşe in der Straßenbahn? | Sie hört einen deutschen Podcast.* / Sie schläft. / Sie liest die Zeitung. | "In der Bahn hört sie oft einen deutschen Podcast."
mc | Wer hilft Ayşe in der Apotheke? | Ihre Kollegin Sabine.* / Ihr Chef. / Die Kunden. | "Dann fragt sie ihre Kollegin Sabine."
`,
  },
  {
    id: 'r02',
    week: 1,
    title: 'Die neue Wohnung',
    level: 'A2',
    text: `
Lange hat Murat eine Wohnung gesucht. In der Stadt sind die Mieten sehr hoch, und viele Vermieter wollen keine Studenten. Er hat über dreißig E-Mails geschrieben, aber nur zweimal eine Antwort bekommen.

Endlich hat es geklappt: Murat hat eine kleine Zweizimmerwohnung im vierten Stock gefunden. Einen Aufzug gibt es leider nicht. Die Wohnung hat eine Küche, ein Bad und einen kleinen Balkon. Die Kaltmiete beträgt 520 Euro, dazu kommen 130 Euro Nebenkosten.

Am Samstag ist Murat umgezogen. Seine Freunde haben ihm geholfen und die Möbel die Treppe hinaufgetragen. Danach haben sie zusammen Pizza gegessen.

Nur ein Problem gibt es noch: Die Heizung im Schlafzimmer funktioniert nicht. Murat hat den Vermieter angerufen. Der Hausmeister kommt am Montag und repariert sie hoffentlich.
`,
    glossary: `
geklappt = (iş) oldu, başardı
zweizimmerwohnung = iki odalı daire
aufzug = asansör
kaltmiete = ısınmasız kira
beträgt = tutar, -dir
möbel = mobilya
treppe = merdiven
hinaufgetragen = yukarı taşıdılar
funktioniert = çalışıyor
hausmeister = kapıcı, bina görevlisi
hoffentlich = umarım
`,
    questions: `
mc | Warum war die Suche schwierig? | Die Mieten sind hoch und viele Vermieter wollen keine Studenten.* / Murat hatte keine Zeit. / Es gab keine Wohnungen mit Balkon. | Metnin ilk paragrafı.
mc | Wie viel bezahlt Murat insgesamt pro Monat? | 650 Euro* / 520 Euro / 130 Euro | 520 + 130 = 650.
mc | Was ist kaputt? | Die Heizung im Schlafzimmer.* / Der Aufzug. / Der Balkon. | "Die Heizung im Schlafzimmer funktioniert nicht."
`,
  },
  {
    id: 'r03',
    week: 2,
    title: 'Der erste Arbeitstag',
    level: 'A2',
    text: `
Gestern war mein erster Arbeitstag in einer Logistikfirma. Ich war sehr nervös und bin schon um sieben Uhr losgefahren, obwohl ich erst um neun anfangen musste.

Am Empfang hat mich eine Frau begrüßt und zu meinem Chef gebracht. Herr Weber hat mir das ganze Gebäude gezeigt: das Lager, die Büros und die Kantine. Danach habe ich meine Kollegen kennengelernt. Alle haben mich geduzt. Das war für mich am Anfang komisch, denn in der Türkei sagt man zum Chef nicht „du".

Am Vormittag habe ich viele Formulare ausgefüllt. Am Nachmittag hat mir mein Kollege Jonas das Computerprogramm erklärt. Er hat sehr schnell gesprochen, aber ich habe gefragt, wenn ich etwas nicht verstanden habe.

Um fünf Uhr hatte ich Feierabend. Ich war total müde, aber glücklich. Ich glaube, die Arbeit wird mir gefallen.
`,
    glossary: `
losgefahren = yola çıktım
empfang = resepsiyon, giriş
begrüßt = karşıladı
gebäude = bina
lager = depo
kantine = yemekhane
geduzt = "sen" diye hitap ettiler
komisch = tuhaf
ausgefüllt = doldurdum
`,
    questions: `
mc | Warum ist die Person so früh losgefahren? | Weil sie nervös war.* / Weil der Bus nicht fährt. / Weil sie um sieben anfangen musste. | "Ich war sehr nervös und bin schon um sieben Uhr losgefahren."
mc | Was war am Anfang komisch? | Dass alle "du" gesagt haben.* / Dass die Kantine geschlossen war. / Dass der Chef nicht da war. | "Alle haben mich geduzt. Das war … komisch."
mc | Was hat Jonas gemacht? | Er hat das Computerprogramm erklärt.* / Er hat das Lager gezeigt. / Er hat die Formulare ausgefüllt. | "… hat mir mein Kollege Jonas das Computerprogramm erklärt."
`,
  },
  {
    id: 'r04',
    week: 2,
    title: 'Mit dem Zug nach Hamburg',
    level: 'A2',
    text: `
Letzten Freitag wollte Elif ihre Freundin in Hamburg besuchen. Sie hatte schon vor drei Wochen ein günstiges Ticket gebucht. Der Zug sollte um 14.12 Uhr in Frankfurt abfahren.

Am Bahnhof kam dann die erste schlechte Nachricht: „Der ICE nach Hamburg hat circa 40 Minuten Verspätung." Elif hat einen Kaffee getrunken und gewartet. Dann gab es noch eine Durchsage: Der Zug fährt heute von Gleis 9 statt von Gleis 7. Viele Leute sind mit ihren Koffern schnell zum anderen Gleis gelaufen.

Im Zug war es sehr voll. Elif hatte keine Platzreservierung und musste eine Stunde lang stehen. In Hannover sind viele Leute ausgestiegen, und sie hat endlich einen Platz gefunden.

Mit einer Stunde Verspätung ist sie in Hamburg angekommen. Ihre Freundin hat am Bahnhof auf sie gewartet. „Willkommen bei der Deutschen Bahn!", hat sie gelacht.
`,
    glossary: `
günstiges = uygun fiyatlı
gebucht = rezervasyon yaptı, almıştı
circa = yaklaşık
durchsage = anons
statt = yerine
platzreservierung = koltuk rezervasyonu
ausgestiegen = indiler
willkommen = hoş geldin
`,
    questions: `
mc | Was war die erste schlechte Nachricht? | Der Zug hatte Verspätung.* / Der Zug fiel aus. / Das Ticket war ungültig. | "… hat circa 40 Minuten Verspätung."
mc | Warum musste Elif stehen? | Sie hatte keine Platzreservierung und der Zug war voll.* / Sie wollte nicht sitzen. / Ihr Platz war kaputt. | "Im Zug war es sehr voll. Elif hatte keine Platzreservierung…"
mc | Wo hat Elif endlich einen Platz gefunden? | In Hannover.* / In Frankfurt. / In Hamburg. | "In Hannover sind viele Leute ausgestiegen…"
`,
  },
  {
    id: 'r05',
    week: 3,
    title: 'Beim Hausarzt',
    level: 'A2',
    text: `
Seit drei Tagen hat Can Halsschmerzen und Fieber. Am Montagmorgen ruft er in der Praxis von Dr. Schneider an. „Sie können um 10.30 Uhr kommen", sagt die Frau am Telefon. „Bitte bringen Sie Ihre Versichertenkarte mit."

Im Wartezimmer sitzen schon viele Leute. Can muss fast eine Stunde warten. Dann ruft man ihn auf. Die Ärztin fragt: „Was fehlt Ihnen denn?" Can erklärt seine Beschwerden. Die Ärztin untersucht ihn und schaut in seinen Hals.

„Das ist eine starke Erkältung, aber keine Grippe", sagt sie. „Sie sollten viel trinken und sich ausruhen. Ich schreibe Sie bis Freitag krank." Sie gibt ihm auch ein Rezept für ein Medikament gegen die Schmerzen.

Can geht zur Apotheke und holt das Medikament. Danach schickt er die Krankmeldung an seinen Arbeitgeber. Zu Hause legt er sich ins Bett und trinkt einen heißen Tee mit Honig.
`,
    glossary: `
halsschmerzen = boğaz ağrısı
praxis = muayenehane
wartezimmer = bekleme odası
aufrufen = adını çağırmak
beschwerden = şikâyetler (sağlık)
untersucht = muayene ediyor
krankschreiben = rapor vermek
holt = alıyor
honig = bal
`,
    questions: `
mc | Was soll Can in die Praxis mitbringen? | Seine Versichertenkarte.* / Ein Rezept. / Seinen Ausweis. | "Bitte bringen Sie Ihre Versichertenkarte mit."
mc | Was hat Can? | Eine starke Erkältung.* / Eine Grippe. / Rückenschmerzen. | "Das ist eine starke Erkältung, aber keine Grippe."
mc | Bis wann ist Can krankgeschrieben? | Bis Freitag.* / Bis Mittwoch. / Bis nächste Woche. | "Ich schreibe Sie bis Freitag krank."
`,
  },
  {
    id: 'r06',
    week: 3,
    title: 'Termin beim Bürgeramt',
    level: 'A2',
    text: `
Wer in Deutschland umzieht, muss sich innerhalb von zwei Wochen beim Bürgeramt anmelden. Das wusste Dilara nicht. Erst ihre Nachbarin hat es ihr erzählt.

Einen Termin bekommt man am besten online. Dilara hat lange gesucht, denn viele Termine waren schon weg. Schließlich hat sie einen Termin in einem anderen Stadtteil gefunden, um 8.15 Uhr morgens.

Für die Anmeldung braucht man den Pass oder Personalausweis, das ausgefüllte Formular und eine Bestätigung vom Vermieter. Diese Bestätigung hatte Dilara zuerst vergessen. Zum Glück konnte sie den Vermieter noch erreichen, und er hat sie ihr per E-Mail geschickt.

Beim Bürgeramt ging dann alles ganz schnell. Der Mitarbeiter hat die Unterlagen geprüft, ein paar Fragen gestellt und nach zehn Minuten war alles fertig. Dilara hat eine Meldebescheinigung bekommen. Die braucht sie jetzt für die Bank und für die Krankenkasse.
`,
    glossary: `
umzieht = taşınırsa
innerhalb von = içinde
bürgeramt = nüfus müdürlüğü (vatandaş dairesi)
stadtteil = semt
personalausweis = kimlik kartı
bestätigung = onay belgesi
erreichen = ulaşmak
unterlagen = belgeler
geprüft = kontrol etti
meldebescheinigung = ikametgâh belgesi
`,
    questions: `
mc | Wie lange hat man Zeit für die Anmeldung? | Zwei Wochen.* / Zwei Monate. / Zehn Tage. | "… innerhalb von zwei Wochen …"
mc | Was hatte Dilara zuerst vergessen? | Die Bestätigung vom Vermieter.* / Ihren Pass. / Das Formular. | "Diese Bestätigung hatte Dilara zuerst vergessen."
mc | Wofür braucht Dilara die Meldebescheinigung? | Für die Bank und die Krankenkasse.* / Für die Arbeit. / Für den Deutschkurs. | Son cümle.
`,
  },
  {
    id: 'r07',
    week: 4,
    title: 'Das Vorstellungsgespräch',
    level: 'B1',
    text: `
Als Burak die Einladung zum Vorstellungsgespräch bekam, freute er sich sehr. Er hatte sich als Elektroniker bei einem mittelgroßen Betrieb in Stuttgart beworben. In der Türkei hatte er schon fünf Jahre in diesem Beruf gearbeitet.

Am Tag vor dem Gespräch bereitete er sich gründlich vor. Er informierte sich auf der Website über die Firma und übte typische Fragen mit seiner Frau: „Warum möchten Sie bei uns arbeiten?", „Was sind Ihre Stärken und Schwächen?".

Das Gespräch dauerte fast eine Stunde. Zuerst stellte sich Burak kurz vor. Dann wollte die Personalchefin wissen, ob er Erfahrung mit modernen Steuerungssystemen hatte. Burak erzählte von einem großen Projekt in Bursa. Bei manchen Fachwörtern war er unsicher, aber er erklärte die Dinge einfach mit anderen Worten.

Am Ende durfte er selbst Fragen stellen. Er fragte nach den Arbeitszeiten und nach Möglichkeiten zur Weiterbildung. Eine Woche später kam der Anruf: Burak hatte die Stelle bekommen.
`,
    glossary: `
einladung = davet
mittelgroß = orta büyüklükte
beworben = başvurmuştu
gründlich = esaslı, iyice
personalchefin = insan kaynakları müdürü
steuerungssystem = kontrol sistemi
fachwörter = teknik terimler
unsicher = emin olmayan
anruf = telefon
`,
    questions: `
mc | Wie hat sich Burak vorbereitet? | Er hat sich über die Firma informiert und Fragen geübt.* / Er hat einen Kurs besucht. / Er hat nichts gemacht. | İkinci paragraf.
mc | Was hat Burak gemacht, als er Fachwörter nicht kannte? | Er hat es mit anderen Worten erklärt.* / Er hat nichts gesagt. / Er hat auf Türkisch gesprochen. | "… er erklärte die Dinge einfach mit anderen Worten."
mc | Wonach hat Burak am Ende gefragt? | Nach Arbeitszeiten und Weiterbildung.* / Nach dem Gehalt. / Nach dem Urlaub. | Son paragraf.
`,
  },
  {
    id: 'r08',
    week: 4,
    title: 'Pünktlichkeit – typisch deutsch?',
    level: 'B1',
    text: `
„Die Deutschen sind immer pünktlich" – das ist eines der bekanntesten Klischees über Deutschland. Aber stimmt es wirklich?

Im Berufsleben ist Pünktlichkeit tatsächlich sehr wichtig. Wer zu einem Termin oder einer Besprechung zu spät kommt, macht einen schlechten Eindruck. Viele Deutsche kommen deshalb lieber fünf Minuten zu früh. Wenn man sich verspätet, sollte man vorher anrufen oder eine Nachricht schicken.

Bei privaten Treffen ist es etwas lockerer. Wenn man zu einer Party um 20 Uhr eingeladen ist, kann man auch eine Viertelstunde später kommen. Zu einem Abendessen bei Freunden sollte man aber nicht zu spät erscheinen, denn das Essen wird sonst kalt.

Und die Deutsche Bahn? Sie zeigt, dass das Klischee nicht immer stimmt. Im Fernverkehr kommt ungefähr jeder dritte Zug zu spät. Viele Deutsche ärgern sich darüber – vielleicht gerade, weil ihnen Pünktlichkeit so wichtig ist.
`,
    glossary: `
klischee = klişe
berufsleben = iş hayatı
eindruck = izlenim
sich verspäten = gecikmek
locker = rahat, gevşek
viertelstunde = çeyrek saat
erscheinen = gelmek, görünmek
fernverkehr = şehirlerarası ulaşım
sich ärgern = sinirlenmek
`,
    questions: `
mc | Was sollte man tun, wenn man sich verspätet? | Vorher anrufen oder eine Nachricht schicken.* / Einfach später kommen. / Den Termin absagen. | İkinci paragraf.
mc | Wann darf man etwas später kommen? | Zu einer Party.* / Zu einer Besprechung. / Zu einem Vorstellungsgespräch. | "Bei privaten Treffen ist es etwas lockerer."
mc | Was sagt der Text über die Deutsche Bahn? | Ungefähr jeder dritte Fernzug ist zu spät.* / Die Bahn ist immer pünktlich. / Die Bahn ist sehr billig. | Son paragraf.
`,
  },
  {
    id: 'r09',
    week: 5,
    title: 'Wer macht den Haushalt?',
    level: 'B1',
    text: `
In vielen Familien gibt es Streit über die Hausarbeit. Eine aktuelle Umfrage zeigt: Obwohl heute in den meisten Familien beide Partner arbeiten, machen Frauen immer noch deutlich mehr im Haushalt. Sie kochen öfter, waschen die Wäsche und kümmern sich häufiger um die Kinder.

Lena und Tobias aus Leipzig wollten das anders machen. „Als unser Sohn geboren wurde, haben wir einen Plan gemacht", erzählt Lena. „Jeder hat seine festen Aufgaben. Tobias kocht unter der Woche und ich mache die Wäsche. Am Wochenende putzen wir zusammen."

Das funktioniert nicht immer perfekt. „Manchmal vergisst Tobias, einzukaufen, und dann haben wir nichts im Kühlschrank", lacht Lena. „Aber wir sprechen offen darüber und finden einen Kompromiss."

Tobias findet die Aufteilung fair: „Ich arbeite Teilzeit, damit ich mehr Zeit für die Familie habe. Natürlich verdiene ich weniger, aber ich sehe meinen Sohn aufwachsen. Das ist mir wichtiger."
`,
    glossary: `
umfrage = anket
deutlich = belirgin şekilde
häufiger = daha sık
geboren = doğdu
feste aufgaben = belirli görevler
unter der woche = hafta içi
offen = açıkça
aufteilung = paylaşım, bölüşüm
aufwachsen = büyümek
`,
    questions: `
mc | Was zeigt die Umfrage? | Frauen machen immer noch mehr im Haushalt.* / Männer kochen öfter. / Niemand macht gern Hausarbeit. | İlk paragraf.
mc | Was macht Tobias unter der Woche? | Er kocht.* / Er macht die Wäsche. / Er putzt. | "Tobias kocht unter der Woche…"
mc | Warum arbeitet Tobias Teilzeit? | Damit er mehr Zeit für die Familie hat.* / Weil er keine Vollzeitstelle findet. / Weil er krank ist. | "… damit ich mehr Zeit für die Familie habe."
`,
  },
  {
    id: 'r10',
    week: 5,
    title: 'Kennengelernt im Internet',
    level: 'B1',
    text: `
Früher lernten sich Paare bei der Arbeit, in der Schule oder durch Freunde kennen. Heute hat fast jedes dritte Paar in Deutschland sich zuerst im Internet getroffen.

So war es auch bei Selin und Max. Selin war gerade nach Hamburg gezogen und kannte dort kaum jemanden. „Ich habe mich einsam gefühlt", erzählt sie. „Eine Kollegin hat mir dann eine Dating-App empfohlen." Nach ein paar Wochen schrieb ihr Max. Sie chatteten jeden Abend, bevor sie sich zum ersten Mal in einem Café trafen.

„Ich war total nervös", sagt Max. „Auf den Fotos sah sie so selbstbewusst aus, und ich bin eher schüchtern." Aber das Treffen war ein Erfolg: Sie redeten vier Stunden lang.

Nicht alle machen so gute Erfahrungen. Experten raten, beim ersten Treffen einen öffentlichen Ort zu wählen und einer Freundin oder einem Freund Bescheid zu sagen. Selin und Max wohnen inzwischen zusammen und planen im nächsten Jahr ihre Hochzeit.
`,
    glossary: `
paar = çift
kaum jemanden = neredeyse hiç kimseyi
einsam = yalnız
empfohlen = tavsiye etti
selbstbewusst = özgüvenli
schüchtern = utangaç
erfolg = başarı
öffentlich = herkese açık, kamusal
bescheid sagen = haber vermek
`,
    questions: `
mc | Warum hat Selin die App benutzt? | Sie war neu in Hamburg und fühlte sich einsam.* / Sie wollte Deutsch üben. / Max hat sie eingeladen. | İkinci paragraf.
mc | Wie lange dauerte das erste Treffen? | Vier Stunden.* / Eine Stunde. / Den ganzen Tag. | "Sie redeten vier Stunden lang."
mc | Was raten Experten? | Das erste Treffen an einem öffentlichen Ort.* / Nie online Leute treffen. / Sofort zusammenziehen. | Son paragraf.
`,
  },
  {
    id: 'r11',
    week: 6,
    title: 'Ein Unfall auf dem Arbeitsweg',
    level: 'B1',
    text: `
Am Dienstagmorgen fuhr Herr Yılmaz wie jeden Tag mit dem Fahrrad zur Arbeit. Es regnete stark, und die Straße war nass. An einer Kreuzung bog ein Auto plötzlich nach rechts ab, ohne zu blinken. Herr Yılmaz konnte nicht mehr bremsen und stürzte.

Eine Passantin rief sofort den Notruf an. Nach wenigen Minuten kam der Krankenwagen. Die Sanitäter untersuchten ihn: Er hatte sich den Arm gebrochen und am Knie verletzt. Im Krankenhaus wurde der Arm geröntgt und eingegipst.

Weil der Unfall auf dem Weg zur Arbeit passierte, gilt er in Deutschland als Arbeitsunfall. Das bedeutet: Die Berufsgenossenschaft, eine spezielle Unfallversicherung, bezahlt die Behandlung. Herr Yılmaz musste seinem Arbeitgeber den Unfall sofort melden.

Die Polizei nahm den Unfall auf und sprach mit der Zeugin. Die Autofahrerin gab zu, dass sie nicht aufgepasst hatte. Ihre Haftpflichtversicherung ersetzt jetzt auch das kaputte Fahrrad.
`,
    glossary: `
bog ab = döndü
blinken = sinyal vermek
bremsen = fren yapmak
stürzte = düştü
passantin = yoldan geçen kadın
sanitäter = sağlık görevlisi
gebrochen = kırılmış
geröntgt = röntgeni çekildi
eingegipst = alçıya alındı
berufsgenossenschaft = mesleki kaza sigortası kurumu
gab zu = itiraf etti
`,
    questions: `
mc | Warum ist Herr Yılmaz gestürzt? | Ein Auto ist ohne Blinken abgebogen.* / Er ist zu schnell gefahren. / Sein Fahrrad war kaputt. | İlk paragraf.
mc | Wer bezahlt die Behandlung? | Die Berufsgenossenschaft.* / Herr Yılmaz selbst. / Die Polizei. | Üçüncü paragraf.
mc | Was hat die Autofahrerin zugegeben? | Dass sie nicht aufgepasst hatte.* / Dass sie zu schnell war. / Dass sie keinen Führerschein hat. | Son paragraf (Plusquamperfekt: hatte aufgepasst).
`,
  },
  {
    id: 'r12',
    week: 6,
    title: 'Lernen mit 40',
    level: 'B1',
    text: `
„Kinder lernen Sprachen schneller als Erwachsene" – diesen Satz hört man oft. Aber ist das wirklich so? Sprachforscher sagen: nicht unbedingt. Kinder lernen die Aussprache leichter, aber Erwachsene haben andere Vorteile. Sie können Grammatikregeln verstehen, Lernstrategien benutzen und ihre Zeit planen.

Gülay ist 42 Jahre alt und lernt seit einem Jahr Deutsch. Sie arbeitet als Krankenpflegerin und hat zwei Kinder. „Ich habe wenig Zeit, deshalb lerne ich jeden Tag ein bisschen", erzählt sie. „Morgens in der Bahn wiederhole ich Wörter mit einer App, und abends höre ich deutsche Nachrichten."

Am Anfang war sie oft frustriert. „Ich habe gedacht, ich bin zu alt dafür. Aber dann habe ich gemerkt, dass ich jeden Monat ein bisschen mehr verstehe." Besonders hilft ihr das Sprechen mit Kolleginnen in der Pause. Fehler sind ihr nicht mehr peinlich.

Ihr Tipp: „Nicht aufgeben! Lieber jeden Tag zwanzig Minuten als einmal pro Woche drei Stunden."
`,
    glossary: `
sprachforscher = dil araştırmacıları
nicht unbedingt = illa ki değil
vorteile = avantajlar
lernstrategien = öğrenme stratejileri
krankenpflegerin = hemşire
wiederhole = tekrar ediyorum
frustriert = hüsrana uğramış
gemerkt = fark ettim
peinlich = utanç verici
aufgeben = pes etmek
`,
    questions: `
mc | Welchen Vorteil haben Erwachsene laut Text? | Sie können Regeln verstehen und ihre Zeit planen.* / Sie haben eine bessere Aussprache. / Sie lernen schneller Wörter. | İlk paragraf.
mc | Wann wiederholt Gülay Wörter? | Morgens in der Bahn.* / Abends im Bett. / In der Mittagspause. | "Morgens in der Bahn wiederhole ich Wörter…"
mc | Was ist Gülays Tipp? | Jeden Tag ein bisschen lernen.* / Einmal pro Woche lange lernen. / Nur Grammatik lernen. | Son paragraf.
`,
  },
  {
    id: 'r13',
    week: 7,
    title: 'Ausbildung oder Studium?',
    level: 'B1',
    text: `
Nach dem Schulabschluss stehen viele junge Menschen in Deutschland vor einer wichtigen Entscheidung: Sollen sie eine Ausbildung machen oder studieren?

Die duale Ausbildung ist eine Besonderheit des deutschen Systems. Die Auszubildenden arbeiten drei oder vier Tage pro Woche in einem Betrieb und gehen an den anderen Tagen in die Berufsschule. So lernen sie Theorie und Praxis gleichzeitig. Ein großer Vorteil: Sie verdienen schon während der Ausbildung Geld. Es werden rund 320 verschiedene Ausbildungsberufe angeboten, vom Bäcker bis zur Mechatronikerin.

Ein Studium an einer Universität ist dagegen theoretischer. Es dauert meistens länger, und viele Studenten müssen nebenbei jobben. Dafür sind die Gehälter später oft höher, besonders in Berufen wie Medizin oder Ingenieurwesen.

Experten raten, sich gut zu informieren, zum Beispiel bei der Berufsberatung der Agentur für Arbeit oder durch ein Praktikum. Denn die beste Entscheidung hängt vor allem von den eigenen Interessen und Stärken ab.
`,
    glossary: `
schulabschluss = okul diploması
duale ausbildung = ikili meslek eğitimi
besonderheit = özellik
berufsschule = meslek okulu
gleichzeitig = aynı anda
werden angeboten = sunuluyor (Passiv)
dagegen = buna karşın
jobben = ek iş yapmak
berufsberatung = meslek danışmanlığı
`,
    questions: `
mc | Wo lernen Auszubildende in der dualen Ausbildung? | Im Betrieb und in der Berufsschule.* / Nur an der Universität. / Nur im Betrieb. | İkinci paragraf.
mc | Was ist ein Vorteil der Ausbildung? | Man verdient schon Geld.* / Sie ist sehr theoretisch. / Sie dauert länger. | "Sie verdienen schon während der Ausbildung Geld."
mc | Wovon hängt die beste Entscheidung ab? | Von den eigenen Interessen und Stärken.* / Vom Gehalt der Eltern. / Von der Stadt. | Son cümle.
`,
  },
  {
    id: 'r14',
    week: 7,
    title: 'Mein Praktikum in der Kita',
    level: 'B1',
    text: `
Drei Monate lang habe ich ein Praktikum in einer Kindertagesstätte gemacht. Ich wollte herausfinden, ob der Beruf Erzieherin wirklich zu mir passt.

Am ersten Tag wurde ich allen Kindern vorgestellt. Die Kinder waren zwischen drei und sechs Jahre alt und sehr neugierig. Sie wollten wissen, woher ich komme und warum ich „so lustig" spreche. Das war am Anfang ein bisschen peinlich, aber dann haben wir zusammen gelacht.

Meine Aufgaben waren vielfältig: Ich habe mit den Kindern gespielt, gebastelt und vorgelesen. Beim Mittagessen habe ich geholfen, und nachmittags sind wir oft in den Park gegangen. Besonders gefallen hat mir, dass die Kinder mit mir ganz natürlich Deutsch gesprochen haben. Ich habe viele neue Wörter gelernt – auch solche, die nicht im Kursbuch stehen.

Anstrengend war es trotzdem. Es ist oft laut, und man muss immer aufmerksam sein. Aber am Ende war ich sicher: Ich möchte die Ausbildung zur Erzieherin machen. Meine Bewerbung habe ich schon abgeschickt.
`,
    glossary: `
kindertagesstätte = kreş (Kita)
herausfinden = öğrenmek, keşfetmek
erzieherin = anaokulu öğretmeni
neugierig = meraklı
vielfältig = çeşitli
gebastelt = el işi yaptık
vorgelesen = kitap okudum (yüksek sesle)
aufmerksam = dikkatli
abgeschickt = gönderdim
`,
    questions: `
mc | Warum hat die Person das Praktikum gemacht? | Um zu sehen, ob der Beruf passt.* / Weil sie Geld brauchte. / Weil die Schule es verlangt hat. | İlk paragraf.
mc | Was hat ihr besonders gefallen? | Dass die Kinder natürlich Deutsch mit ihr sprachen.* / Dass es ruhig war. / Dass sie viel Geld verdient hat. | Üçüncü paragraf.
mc | Was ist am Ende passiert? | Sie hat sich für die Ausbildung beworben.* / Sie hat das Praktikum abgebrochen. / Sie studiert jetzt Medizin. | Son cümle.
`,
  },
  {
    id: 'r15',
    week: 8,
    title: 'Weniger Müll im Alltag',
    level: 'B1',
    text: `
Jeder Mensch in Deutschland produziert pro Jahr etwa 600 Kilogramm Haushaltsmüll. Ein großer Teil davon sind Verpackungen. Familie Demir aus Bremen hat beschlossen, das zu ändern.

„Angefangen hat alles mit einem Dokumentarfilm über Plastik im Meer", erzählt Zeynep Demir. „Danach wollten wir nicht mehr so weitermachen." Heute kauft die Familie Obst und Gemüse auf dem Wochenmarkt und bringt eigene Taschen und Dosen mit. Statt Wasser in Plastikflaschen zu kaufen, trinken sie Leitungswasser.

Natürlich trennt die Familie auch den Müll, wie fast alle Haushalte in Deutschland: Papier kommt in die blaue Tonne, Verpackungen in die gelbe, Essensreste in die Biotonne und der Rest in die schwarze Tonne. Glas wird zum Container gebracht.

„Ganz ohne Müll geht es nicht", sagt Zeynep. „Aber wir haben unseren Müll um die Hälfte reduziert. Und wir sparen sogar Geld, weil wir weniger unnötige Dinge kaufen."
`,
    glossary: `
haushaltsmüll = evsel atık
verpackungen = ambalajlar
beschlossen = karar verdi
dokumentarfilm = belgesel
weitermachen = devam etmek
dosen = kutular
leitungswasser = musluk suyu
tonne = çöp kutusu (büyük)
essensreste = yemek artıkları
um die hälfte = yarı yarıya
unnötig = gereksiz
`,
    questions: `
mc | Was war der Anfang für Familie Demir? | Ein Dokumentarfilm über Plastik im Meer.* / Eine hohe Müllrechnung. / Ein Kurs in der Schule. | İkinci paragraf.
mc | Wohin kommen Verpackungen? | In die gelbe Tonne.* / In die blaue Tonne. / In die Biotonne. | Üçüncü paragraf.
mc | Was ist ein positiver Nebeneffekt? | Die Familie spart Geld.* / Die Familie hat mehr Zeit. / Der Markt ist billiger. | Son cümle.
`,
  },
  {
    id: 'r16',
    week: 8,
    title: 'Ein Sommer der Rekorde',
    level: 'B1',
    text: `
Der letzte Sommer war einer der heißesten seit Beginn der Wetteraufzeichnungen. In vielen Städten stiegen die Temperaturen auf über 38 Grad. Es regnete wochenlang kaum, und in manchen Regionen wurde das Wasser knapp.

Besonders für ältere Menschen und kleine Kinder war die Hitze gefährlich. Ärzte rieten, viel zu trinken, in der Mittagszeit drinnen zu bleiben und körperliche Anstrengung zu vermeiden. Einige Schulen schickten die Kinder früher nach Hause, weil es in den Klassenzimmern zu heiß war.

Auch die Natur litt unter der Trockenheit. Im Osten Deutschlands gab es mehrere Waldbrände, und die Bauern hatten eine schlechte Ernte. Gleichzeitig führten heftige Gewitter im Süden zu Überschwemmungen.

Klimaforscher sind sich einig: Solche extremen Wetterereignisse werden durch den Klimawandel häufiger. Wenn wir nicht weniger CO2 produzieren, werden heiße Sommer in Zukunft normal sein.
`,
    glossary: `
wetteraufzeichnungen = hava kayıtları
knapp = kıt, yetersiz
anstrengung = efor, zorlanma
litt = acı çekti (leiden)
trockenheit = kuraklık
ernte = hasat
heftig = şiddetli
überschwemmungen = sel baskınları
sind sich einig = hemfikirdir
`,
    questions: `
mc | Was rieten die Ärzte? | Viel trinken und mittags drinnen bleiben.* / Viel Sport machen. / In den Urlaub fahren. | İkinci paragraf.
mc | Was passierte im Osten Deutschlands? | Es gab Waldbrände.* / Es gab Überschwemmungen. / Es schneite. | Üçüncü paragraf.
mc | Was sagen Klimaforscher? | Extreme Wetterereignisse werden häufiger.* / Der Sommer war eine Ausnahme. / Das Klima wird kälter. | Son paragraf.
`,
  },
  {
    id: 'r17',
    week: 9,
    title: 'Echt oder falsch?',
    level: 'B1',
    text: `
Jeden Tag sehen wir in sozialen Netzwerken Hunderte von Nachrichten, Fotos und Videos. Aber nicht alles, was dort gepostet wird, ist wahr. Falsche Nachrichten, sogenannte Fake News, verbreiten sich oft schneller als echte, weil sie überraschend oder emotional sind.

Ein Beispiel: Vor einiger Zeit wurde ein Foto von einem Hai auf einer überschwemmten Autobahn tausendfach geteilt. Das Foto war gefälscht – es tauchte bei fast jeder Überschwemmung wieder auf.

Wie kann man Fake News erkennen? Medienexperten geben einige Tipps. Erstens: Prüfen Sie die Quelle. Ist es eine bekannte Zeitung oder eine unbekannte Website? Zweitens: Suchen Sie die Nachricht auch bei anderen Medien. Drittens: Seien Sie vorsichtig bei Überschriften, die sehr wütend oder ängstlich machen sollen.

Vor allem sollte man nichts teilen, bevor man es überprüft hat. Denn wer falsche Informationen weiterleitet, hilft – auch ohne Absicht – dabei, sie zu verbreiten.
`,
    glossary: `
sogenannte = sözde, adı verilen
hai = köpek balığı
überschwemmt = sular altında kalmış
tausendfach = binlerce kez
tauchte auf = ortaya çıktı
erkennen = tanımak, ayırt etmek
überschriften = başlıklar
weiterleitet = iletir, paylaşır
absicht = niyet, kasıt
`,
    questions: `
mc | Warum verbreiten sich Fake News schnell? | Weil sie überraschend oder emotional sind.* / Weil sie immer lang sind. / Weil Zeitungen sie drucken. | İlk paragraf.
mc | Was war mit dem Hai-Foto? | Es war gefälscht.* / Es war echt. / Es kam aus einer Zeitung. | İkinci paragraf.
mc | Was sollte man vor dem Teilen tun? | Die Nachricht überprüfen.* / Sie sofort weiterleiten. / Einen Kommentar schreiben. | Son paragraf.
`,
  },
  {
    id: 'r18',
    week: 9,
    title: 'Ein peinlicher Moment',
    level: 'B1',
    text: `
Es war mein dritter Monat in Deutschland. Ich war zu einer Geburtstagsfeier bei einem Kollegen eingeladen und wollte natürlich einen guten Eindruck machen.

Als ich ankam, gab ich allen die Hand und stellte mich vor. Dann fragte mich die Mutter meines Kollegen, ob ich etwas trinken möchte. Ich wollte höflich sein und sagte: „Nein, danke." Ich dachte, sie würde noch einmal fragen – so ist es bei uns in der Türkei üblich. Aber sie fragte nicht noch einmal. Den ganzen Abend hatte ich Durst!

Das war aber nicht das Peinlichste. Beim Essen wollte ich sagen, dass mir das Essen gut schmeckt. Ich sagte: „Ich bin sehr heiß auf das Essen!" Alle lachten laut. Erst später erklärte mir mein Kollege, dass „heiß sein auf" etwas ganz anderes bedeuten kann.

Heute lache ich darüber. Und ich habe zwei Dinge gelernt: In Deutschland sagt man „Ja, gern", wenn man etwas möchte. Und man sollte neue Ausdrücke lieber erst nachschlagen, bevor man sie benutzt.
`,
    glossary: `
geburtstagsfeier = doğum günü partisi
gab die hand = el sıkıştım
üblich = olağan, alışılmış
durst = susuzluk
das peinlichste = en utanç verici olan
heiß sein auf = bir şeye çok istekli olmak (argo)
ausdrücke = ifadeler
nachschlagen = sözlükten bakmak
`,
    questions: `
mc | Warum hatte die Person den ganzen Abend Durst? | Sie sagte "Nein, danke" und wurde nicht noch einmal gefragt.* / Es gab keine Getränke. / Sie durfte nichts trinken. | İkinci paragraf.
mc | Warum lachten alle beim Essen? | Wegen eines falschen Ausdrucks.* / Weil das Essen heiß war. / Weil sie nichts gegessen hat. | Üçüncü paragraf.
mc | Was sagt man in Deutschland, wenn man etwas möchte? | „Ja, gern."* / „Nein, danke." / „Vielleicht." | Son paragraf.
`,
  },
  {
    id: 'r19',
    week: 10,
    title: 'Du oder Sie?',
    level: 'B1',
    text: `
Für viele Deutschlernende ist es eine schwierige Frage: Wann sagt man „du" und wann „Sie"? Die Regeln haben sich in den letzten Jahren verändert, aber es gibt einige Grundsätze.

Erwachsene, die sich nicht kennen, siezen sich normalerweise – zum Beispiel im Geschäft, beim Arzt oder auf dem Amt. Kinder, Jugendliche und Studenten duzen sich dagegen fast immer. Auch in der Familie und unter Freunden sagt man „du".

Am Arbeitsplatz ist es unterschiedlich. In jungen Firmen und Start-ups duzen sich oft alle, sogar mit dem Chef. In Banken, Behörden oder traditionellen Unternehmen siezt man sich dagegen häufig, auch nach vielen Jahren.

Und wer darf das „Du" anbieten? Grundsätzlich die ältere Person oder die Person mit der höheren Position. Wenn man unsicher ist, sollte man lieber „Sie" sagen. Ein zu frühes „Du" kann unhöflich wirken, ein „Sie" ist dagegen nie falsch.
`,
    glossary: `
grundsätze = temel ilkeler
siezen = "siz" demek
duzen = "sen" demek
dagegen = buna karşılık
unterschiedlich = farklı
traditionell = geleneksel
anbieten = teklif etmek
position = pozisyon, konum
wirken = izlenim vermek
`,
    questions: `
mc | Wer duzt sich fast immer? | Kinder, Jugendliche und Studenten.* / Fremde Erwachsene. / Beamte auf dem Amt. | İkinci paragraf.
mc | Wer bietet normalerweise das "Du" an? | Die ältere Person oder die mit der höheren Position.* / Immer die jüngere Person. / Niemand. | Son paragraf.
mc | Was sollte man tun, wenn man unsicher ist? | „Sie" sagen.* / „Du" sagen. / Nichts sagen. | Son paragraf.
`,
  },
  {
    id: 'r20',
    week: 10,
    title: 'Ein Beschwerdebrief',
    level: 'B1',
    text: `
Sehr geehrte Frau Hoffmann,

ich wohne seit März im zweiten Stock Ihres Hauses in der Lindenstraße 14. Leider muss ich mich heute über ein Problem beschweren, das schon seit mehreren Wochen besteht.

In der Wohnung über mir wird fast jede Nacht bis zwei oder drei Uhr laute Musik gehört. Ich habe die Nachbarn bereits zweimal freundlich darauf angesprochen, aber es hat sich nichts geändert. Da ich jeden Morgen um fünf Uhr aufstehen muss, schlafe ich viel zu wenig. Das ist auf Dauer sehr anstrengend.

Laut Hausordnung gilt ab 22 Uhr Nachtruhe. Ich bitte Sie deshalb, mit den Mietern zu sprechen und sie an diese Regel zu erinnern. Falls sich die Situation nicht verbessert, sehe ich mich leider gezwungen, die Miete zu mindern.

Ich danke Ihnen im Voraus für Ihre Hilfe und hoffe auf eine schnelle Lösung.

Mit freundlichen Grüßen
Emre Kaya
`,
    glossary: `
sehr geehrte = sayın
besteht = süregelen
bereits = zaten, daha önce
angesprochen = (bu konuyu) açtım
auf dauer = uzun vadede
nachtruhe = gece sessizliği
mieter = kiracılar
gezwungen = zorunda kalmış
miete mindern = kirayı düşürmek
im voraus = şimdiden
`,
    questions: `
mc | Worüber beschwert sich Emre Kaya? | Über laute Musik in der Nacht.* / Über eine kaputte Heizung. / Über die hohe Miete. | İkinci paragraf.
mc | Was hat er schon gemacht? | Er hat die Nachbarn zweimal angesprochen.* / Er hat die Polizei gerufen. / Er ist ausgezogen. | "Ich habe die Nachbarn bereits zweimal … angesprochen."
mc | Was macht er, wenn es nicht besser wird? | Er mindert die Miete.* / Er kündigt die Wohnung. / Er spielt auch laute Musik. | Üçüncü paragraf.
`,
  },
  {
    id: 'r21',
    week: 11,
    title: 'Wählen ab 16?',
    level: 'B1',
    text: `
In Deutschland dürfen Bürger ab 18 Jahren den Bundestag wählen. Bei manchen Landtags- und Kommunalwahlen dürfen aber schon 16-Jährige ihre Stimme abgeben. Seit einiger Zeit gilt das auch für die Wahl zum Europäischen Parlament. Darüber wird viel diskutiert.

Die Befürworter meinen: Junge Menschen sind von politischen Entscheidungen besonders betroffen, zum Beispiel beim Klimaschutz oder bei der Rente. Deshalb sollten sie auch mitbestimmen dürfen. Außerdem würden sie sich durch das Wahlrecht früher für Politik interessieren.

Die Gegner sagen dagegen, dass viele Jugendliche noch nicht reif genug seien. Sie würden sich zu wenig informieren und könnten leichter beeinflusst werden, zum Beispiel durch soziale Medien.

Studien zeigen ein gemischtes Bild. Junge Erstwähler beteiligen sich etwas häufiger an Wahlen als 18- bis 21-Jährige, wenn sie in der Schule gut über Politik informiert werden. Die Frage ist also vielleicht nicht nur, ab wann man wählen darf, sondern auch, wie gut man darauf vorbereitet wird.
`,
    glossary: `
landtag = eyalet meclisi
kommunalwahl = yerel seçim
stimme abgeben = oy kullanmak
befürworter = destekçiler
betroffen = etkilenen
mitbestimmen = söz sahibi olmak
gegner = karşıtlar
reif = olgun
gemischt = karışık
erstwähler = ilk kez oy kullananlar
`,
    questions: `
mc | Was sagen die Befürworter? | Junge Menschen sind von Entscheidungen stark betroffen.* / Jugendliche sind nicht reif genug. / Wahlen sind zu teuer. | İkinci paragraf.
mc | Was bedeutet „Sie würden sich zu wenig informieren" im Text? | Das ist die Meinung der Gegner.* / Das ist eine Tatsache. / Das sagt die Regierung. | Konjunktiv ile aktarım: "seien, würden".
mc | Was zeigen die Studien? | Gute politische Bildung in der Schule hilft.* / Junge Menschen wählen nie. / 16-Jährige dürfen überall wählen. | Son paragraf.
`,
  },
  {
    id: 'r22',
    week: 11,
    title: 'Von Kohle zu Kultur',
    level: 'B1',
    text: `
Über hundert Jahre lang war das Ruhrgebiet das industrielle Herz Deutschlands. Städte wie Essen, Bochum und Dortmund wuchsen schnell, weil in den Zechen Kohle abgebaut und in den Fabriken Stahl produziert wurde. Hunderttausende Menschen kamen zum Arbeiten hierher – auch viele Gastarbeiter aus der Türkei, Italien und Polen.

Ab den 1960er-Jahren begann die Krise. Kohle aus dem Ausland war billiger, und eine Zeche nach der anderen wurde geschlossen. Viele Menschen verloren ihre Arbeit, und die Arbeitslosigkeit stieg stark an.

Die Region musste sich neu erfinden. Dieser Strukturwandel dauerte Jahrzehnte. Heute gibt es im Ruhrgebiet zahlreiche Universitäten, Technologiefirmen und Dienstleistungsunternehmen. Alte Industrieanlagen wurden zu Museen, Konzerthallen und Parks umgebaut. Die Zeche Zollverein in Essen gehört heute sogar zum UNESCO-Welterbe.

2018 wurde die letzte Steinkohlenzeche geschlossen. Die Bergleute bekamen zum Abschied ein Stück Kohle geschenkt – als Erinnerung an eine Zeit, die die Region für immer geprägt hat.
`,
    glossary: `
zeche = maden ocağı
abgebaut = çıkarıldı (maden)
stahl = çelik
erfinden = icat etmek, yeniden yaratmak
jahrzehnte = on yıllar
zahlreiche = çok sayıda
dienstleistung = hizmet
industrieanlagen = sanayi tesisleri
welterbe = dünya mirası
bergleute = madenciler
geprägt = şekillendirdi, iz bıraktı
`,
    questions: `
mc | Warum begann ab den 1960er-Jahren die Krise? | Kohle aus dem Ausland war billiger.* / Es gab keine Arbeiter mehr. / Die Städte waren zu groß. | İkinci paragraf.
mc | Was ist mit alten Industrieanlagen passiert? | Sie wurden zu Museen und Parks umgebaut.* / Sie wurden alle abgerissen. / Sie produzieren wieder Kohle. | Üçüncü paragraf (Passiv: wurden umgebaut).
mc | Was bekamen die Bergleute zum Abschied? | Ein Stück Kohle.* / Eine Medaille. / Einen neuen Job. | Son paragraf.
`,
  },
  {
    id: 'r23',
    week: 12,
    title: 'Mein Opa, der Gastarbeiter',
    level: 'B1',
    text: `
Mein Großvater kam 1971 als Gastarbeiter aus einem kleinen Dorf bei Sivas nach Köln. Er war 23 Jahre alt, sprach kein Wort Deutsch und hatte nur einen Koffer dabei. Eigentlich wollte er nur zwei oder drei Jahre bleiben, Geld sparen und dann zurückkehren.

Er arbeitete in einer Autofabrik am Fließband, oft in der Nachtschicht. Mit fünf anderen Männern wohnte er in einem Wohnheim. „Am Anfang war alles fremd", erzählte er mir einmal. „Das Essen, das Wetter, die Sprache. Ich hatte jeden Tag Heimweh."

Deutsch lernte er vor allem bei der Arbeit, von seinen Kollegen. Einen Sprachkurs gab es damals für Gastarbeiter kaum. 1976 holte er meine Oma und meinen Vater nach Deutschland. Aus den drei Jahren wurden fünfzig.

Heute ist mein Opa Rentner. Im Sommer verbringt er einige Monate in der Türkei, aber er kommt immer wieder zurück. „Köln ist meine zweite Heimat geworden", sagt er. „Hier sind meine Kinder und Enkel. Hier bin ich zu Hause."
`,
    glossary: `
gastarbeiter = misafir işçi
fließband = montaj bandı
nachtschicht = gece vardiyası
wohnheim = yurt, işçi yurdu
heimweh = sıla hasreti
damals = o zamanlar
holte nach = yanına getirdi
verbringt = geçiriyor
enkel = torunlar
`,
    questions: `
mc | Wie lange wollte der Großvater ursprünglich bleiben? | Zwei oder drei Jahre.* / Fünfzig Jahre. / Für immer. | İlk paragraf.
mc | Wo hat er Deutsch gelernt? | Vor allem bei der Arbeit.* / In einem Sprachkurs. / In der Türkei. | Üçüncü paragraf.
mc | Was ist Köln für ihn heute? | Seine zweite Heimat.* / Nur ein Arbeitsort. / Eine fremde Stadt. | Son paragraf.
`,
  },
  {
    id: 'r24',
    week: 12,
    title: 'Neuanfang mit 35',
    level: 'B1',
    text: `
Vor zwei Jahren hätte Deniz nie gedacht, dass sie einmal in Deutschland leben würde. In Istanbul hatte sie einen sicheren Job als Grafikdesignerin, eine schöne Wohnung und viele Freunde. Doch dann bekam ihr Mann ein Angebot von einer Firma in München.

„Die Entscheidung war nicht leicht", erzählt sie. „Ich musste alles aufgeben, was ich mir aufgebaut hatte." Die ersten Monate waren schwierig. Ohne gute Deutschkenntnisse fand sie keine Stelle in ihrem Beruf. Sie besuchte einen Integrationskurs und lernte jeden Tag mehrere Stunden.

Heute spricht sie fließend Deutsch – mit Akzent, wie sie lachend sagt. Vor einem halben Jahr hat sie sich selbstständig gemacht und gestaltet Websites für kleine Unternehmen. Viele ihrer Kunden sind türkisch-deutsche Familienbetriebe.

„Wenn ich die Wahl noch einmal hätte, würde ich es wieder machen", sagt Deniz. „Ein Neuanfang ist anstrengend, aber man lernt dabei viel über sich selbst. Mein Rat: Habt Geduld mit euch – und hört nie auf zu lernen."
`,
    glossary: `
hätte nie gedacht = hiç düşünmezdi
sicheren = güvenli, garantili
aufgebaut = kurmuştu (emekle)
fließend = akıcı
akzent = aksan
sich selbstständig machen = kendi işini kurmak
gestaltet = tasarlıyor
familienbetriebe = aile işletmeleri
geduld = sabır
`,
    questions: `
mc | Warum ist Deniz nach Deutschland gekommen? | Ihr Mann bekam ein Jobangebot in München.* / Sie wollte studieren. / Sie hatte keine Arbeit in Istanbul. | İlk paragraf.
mc | Was macht Deniz heute beruflich? | Sie gestaltet als Selbstständige Websites.* / Sie unterrichtet Deutsch. / Sie arbeitet in einem Café. | Üçüncü paragraf.
mc | Was bedeutet „Wenn ich die Wahl noch einmal hätte, würde ich es wieder machen"? | Sie bereut die Entscheidung nicht.* / Sie möchte zurück nach Istanbul. / Sie hatte keine Wahl. | Konjunktiv II: gerçek dışı koşul.
`,
  },
]

export const READINGS: Reading[] = RAW.map((r) => ({
  id: r.id,
  week: r.week,
  title: r.title,
  level: r.level,
  text: r.text.trim(),
  glossary: parseGlossary(r.glossary),
  questions: parseExercises(r.id, r.questions),
}))

export const READING_BY_ID: Record<string, Reading> = Object.fromEntries(READINGS.map((r) => [r.id, r]))
