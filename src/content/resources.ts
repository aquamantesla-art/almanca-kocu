export interface NicosLesson {
  id: string
  n: number
  title: string
  topic: string
  grammar?: string
  url: string
}

const DW = 'https://learngerman.dw.com/de/'

// Nicos Weg B1 (Deutsche Welle), in course order. One lesson ≈ 10–15 minutes with exercises.
const NICOS_RAW: [string, string, string, string?][] = [
  ['berufsberatung/l-38462985', 'Berufsberatung', 'Berufliche Interessen'],
  ['meine-muttersprache/l-38462119', 'Meine Muttersprache', 'Sprachbiografien'],
  ['bei-der-arbeit/l-38463139', 'Bei der Arbeit', 'Arbeitsbedingungen', 'Indirekte Fragesätze: ob'],
  ['zukunftspl%C3%A4ne/l-38463290', 'Zukunftspläne', 'Ziele und Pläne', 'Modalverben'],
  ['zu-wenig-zeit/l-38464354', 'Zu wenig Zeit?', 'Über Zeit sprechen', 'Nominalisierung'],
  ['keine-zeit/l-56006848', 'Keine Zeit', 'Zeitmanagement', 'Nebensätze: während'],
  ['p%C3%BCnktlichkeit/l-38464021', 'Pünktlichkeit', 'Thema Pünktlichkeit'],
  ['jetzt-oder-nie/l-38462994', 'Jetzt oder nie', 'Zeitpunkte definieren', 'Indirekte Rede'],
  ['heimat/l-38463594', 'Heimat', 'Über Heimat sprechen', 'Präteritum: unregelmäßig'],
  ['krieg-und-frieden/l-38462968', 'Krieg und Frieden', 'Persönliche Erlebnisse'],
  ['die-mauer/l-38463064', 'Die Mauer', 'Deutsche Geschichte', 'Präteritum oder Perfekt?'],
  ['wiedervereinigung/l-38465597', 'Wiedervereinigung', 'Über Geschichte sprechen', 'Satzbau: Hauptsätze'],
  ['alltagsprobleme/l-38470438', 'Alltagsprobleme', 'Über Probleme sprechen'],
  ['geldprobleme/l-38466214', 'Geldprobleme', 'Begründungen', 'Adverbien: Gründe'],
  ['tipps-und-ratschl%C3%A4ge/l-38466970', 'Tipps und Ratschläge', 'Über Stress sprechen', 'Konjunktiv II: Tipps'],
  ['alle-haben-probleme/l-38467525', 'Alle haben Probleme', 'Ratschläge geben'],
  ['jobsuche/l-38467171', 'Jobsuche', 'Über Fähigkeiten sprechen', 'Doppelkonjunktionen'],
  ['stellenanzeigen/l-38467719', 'Stellenanzeigen', 'Stellenanzeigen verstehen'],
  ['bewerbungen/l-38467622', 'Bewerbungen', 'Eine Bewerbung schreiben'],
  ['der-erste-eindruck/l-38469854', 'Der erste Eindruck', 'Das Bewerbungsgespräch', 'Finalsätze: um … zu'],
  ['typisch/l-38470217', 'Typisch?', 'Über Klischees sprechen'],
  ['anders/l-38470706', 'Anders!', 'Personenbeschreibung', 'Wortbildung: Adjektive'],
  ['jobs-und-gender/l-38472135', 'Jobs und Gender', 'Über Jobs sprechen', 'Kausale Verbindungen'],
  ['rollenverteilung/l-38481220', 'Rollenverteilung', 'Berufstätigkeit', 'Nebensätze: obwohl'],
  ['partnersuche/l-38481290', 'Partnersuche', 'Partner suchen', 'Konzessive Verbindungen'],
  ['partnerschaft/l-38481801', 'Partnerschaft', 'Über Haushalt sprechen', 'zu + Infinitiv'],
  ['m%C3%A4nner-und-frauen/l-38482861', 'Männer und Frauen', 'Kommunikationsprobleme', 'Konjunktionen: sondern'],
  ['beziehungsprobleme/l-38482841', 'Beziehungsprobleme', 'Über Beziehungen sprechen', 'Doppelkonjunktionen'],
  ['mein-arbeitsplatz/l-38482450', 'Mein Arbeitsplatz', 'Arbeitsplatz und Kollegen'],
  ['mein-gehalt/l-38483260', 'Mein Gehalt?', 'Gehaltsabrechnungen', 'Negation: nicht/kein'],
  ['112/l-38483514', '112', 'Notrufe machen', 'Präteritum'],
  ['gut-versichert/l-38484195', 'Gut versichert', 'Unfälle und Versicherung', 'Nebensätze: wenn'],
  ['schule/l-38483735', 'Schule', 'Über Schule sprechen', 'Ordnungszahlen'],
  ['schulalltag/l-38485158', 'Schulalltag', 'Wünsche äußern', 'Konjunktiv II: Präsens'],
  ['lernen/l-38484213', 'Lernen', 'Über das Lernen sprechen'],
  ['berufe-an-der-schule/l-38485719', 'Berufe an der Schule', 'Über Schulalltag sprechen'],
  ['die-berufswahl/l-38485694', 'Die Berufswahl', 'Berufswahl', 'Fragewörter: wo(r)-'],
  ['weiterbildung/l-38491718', 'Weiterbildung', 'Informationen verstehen'],
  ['praktikum/l-38487433', 'Praktikum', 'Übers Praktikum sprechen'],
  ['studium-und-beruf/l-38487338', 'Studium und Beruf', 'Übers Studium sprechen'],
  ['wetter-und-klima/l-38490530', 'Wetter und Klima', 'Über das Wetter sprechen'],
  ['wieder-so-ein-wetter/l-38487801', 'Wieder so ein Wetter', 'Klima und Gesundheit', 'Doppelkonjunktionen'],
  ['wegen-des-wetters/l-38489408', 'Wegen des Wetters', 'Über das Klima sprechen', 'Präpositionen: wegen'],
  ['es-wird-w%C3%A4rmer/l-38496147', 'Es wird wärmer', 'Klimawandel', 'Futur I'],
  ['mensch-und-umwelt/l-38507260', 'Mensch und Umwelt', 'Über die Umwelt sprechen'],
  ['umweltbelastungen/l-38506132', 'Umweltbelastungen', 'Die Umwelt schützen'],
  ['umweltschutz/l-38506134', 'Umweltschutz', 'Alternative Energien'],
  ['wertstoffe/l-38513010', 'Wertstoffe', 'Über Recycling sprechen'],
  ['in-der-zeitung-steht/l-38511153', 'In der Zeitung steht', 'Zeitungen und Nachrichten'],
  ['in-der-redaktion/l-38508289', 'In der Redaktion', 'Arbeit bei der Zeitung'],
  ['analog-oder-digital/l-38509295', 'Analog oder digital?', 'Alte und neue Medien'],
  ['kontaktanzeigen/l-38508270', 'Kontaktanzeigen', 'Über Werbung sprechen'],
  ['peinlich/l-38591182', 'Peinlich?!', 'Ein Missgeschick schildern'],
  ['richtiges-benehmen/l-38585076', 'Richtiges Benehmen', 'Benehmen im Restaurant', 'Modalverben: sollen'],
  ['benimmregeln/l-38582805', 'Benimmregeln', 'Verhaltensregeln', 'Partizip I'],
  ['was-tun-wenn/l-38585683', 'Was tun, wenn …?', 'Beschwerden', 'Plusquamperfekt'],
  ['endlich-erwachsen/l-38517253', 'Endlich erwachsen', 'Mindestalter', 'Doppelkonjunktionen'],
  ['was-eltern-erwarten/l-38507284', 'Was Eltern erwarten', 'Über Erwartungen sprechen', 'Nebensätze: seit'],
  ['lebenswege/l-38515178', 'Lebenswege', 'Über Erfahrungen sprechen', 'Nebensätze: bevor'],
  ['noch-mal-anfangen/l-38515343', 'Noch mal anfangen', 'Über Neuanfänge sprechen'],
  ['bund-und-l%C3%A4nder/l-38565710', 'Bund und Länder', 'Bundesländer', 'Genitiv'],
  ['die-eu/l-38573517', 'Die EU', 'Politik und Europa', 'brauchen + zu + Infinitiv'],
  ['gerechtigkeit/l-38574938', 'Gerechtigkeit?', 'Steuer- und Sozialsystem', 'Nomen auf -heit/-keit'],
  ['wir-haben-die-wahl/l-38573876', 'Wir haben die Wahl', 'Über Wahlen sprechen', 'Passiv'],
  ['das-ruhrgebiet/l-38594392', 'Das Ruhrgebiet', 'Regionen beschreiben', 'Nomen auf -chen'],
  ['industrie/l-38594827', 'Industrie', 'Arbeitsbedingungen', 'Präpositionen: während'],
  ['strukturwandel/l-38594866', 'Strukturwandel', 'Veränderungen im Leben', 'Vergleiche: wie/als'],
  ['kultur/l-38594790', 'Kultur', 'Über Kultur sprechen'],
  ['nach-deutschland/l-38585038', 'Nach Deutschland', 'Über Migration sprechen', 'Temporale Präpositionen'],
  ['migrationsgr%C3%BCnde/l-38586979', 'Migrationsgründe', 'Migrationsgeschichten'],
  ['hin-und-zur%C3%BCck/l-38585901', 'Hin und zurück?', 'Gründe für Migration', 'Relativsätze: Genitiv'],
  ['existenzgr%C3%BCndung/l-38591272', 'Existenzgründung', 'Geschäftsideen besprechen', 'Adversative Verbindungen'],
  ['neue-heimat/l-38575949', 'Neue Heimat', 'Vermutungen äußern', 'Relativadverb: wo'],
  ['so-gehts/l-38575937', 'So geht’s!', 'Abläufe beschreiben', 'lassen + Infinitiv'],
  ['zukunftspl%C3%A4ne/l-38574989', 'Zukunftspläne (Bank)', 'Gespräche in der Bank', 'n-Deklination'],
  ['w%C3%BCnsche-und-tr%C3%A4ume/l-38575043', 'Wünsche und Träume', 'Wünsche ausdrücken'],
  ['abschlusstest-b1/l-44070818', 'Abschlusstest B1', 'Überprüfe dein Wissen'],
]

export const NICOS_B1: NicosLesson[] = NICOS_RAW.map(([path, title, topic, grammar], i) => ({
  id: path.split('/l-')[1],
  n: i + 1,
  title,
  topic,
  grammar,
  url: DW + path,
}))

export const NICOS_COURSE_URL = DW + 'nicos-weg/c-36519718'

export interface InputSource {
  id: string
  name: string
  what: string
  task: string
  url: string
  minutes: number
}

/** Second listening/reading source, rotated by weekday within the program week */
export const ROTATION: InputSource[] = [
  {
    id: 'lgn',
    name: 'Langsam gesprochene Nachrichten',
    what: 'DW, günün haberleri yavaş okunur, metni de var',
    task: 'Önce metne bakmadan dinle, sonra metinle birlikte bir kez daha dinle.',
    url: DW + 'langsam-gesprochene-nachrichten/s-60040332',
    minutes: 8,
  },
  {
    id: 'easygerman',
    name: 'Easy German',
    what: 'Sokak röportajları, Almanca ve İngilizce altyazılı',
    task: 'Bir video seç. Language Reactor açıksa çift altyazıyla izle, 3 yeni kelimeyi kaydet.',
    url: 'https://www.youtube.com/@EasyGerman/videos',
    minutes: 10,
  },
  {
    id: 'nachrichtenleicht',
    name: 'nachrichtenleicht',
    what: 'Deutschlandfunk, kolay Almanca haberler (ses + metin)',
    task: 'İki haber oku, birini sesli dinle.',
    url: 'https://www.nachrichtenleicht.de',
    minutes: 8,
  },
  {
    id: 'topthema',
    name: 'Top-Thema',
    what: 'DW, B1 seviyesinde kısa makale + ses + kelime listesi',
    task: 'Bir makaleyi dinleyerek oku, sorularını çöz.',
    url: DW + 'top-thema/s-55861562',
    minutes: 10,
  },
  {
    id: 'tagesschau',
    name: 'tagesschau in Einfacher Sprache',
    what: 'ARD, günün haberleri sade Almancayla (video)',
    task: 'Günün yayınını izle. İkinci izleyişte anlamadığın bir cümleyi not et.',
    url: 'https://www.tagesschau.de/multimedia/sendung/tagesschau_in_einfacher_sprache',
    minutes: 8,
  },
  {
    id: 'jojo',
    name: 'Jojo sucht das Glück',
    what: 'DW, B1 telenovela, bölüm başına alıştırmalı',
    task: 'Sıradaki bölümü izle.',
    url: DW + 'jojo-sucht-das-gl%C3%BCck/c-53437698',
    minutes: 10,
  },
]

export interface LinkItem {
  name: string
  what: string
  url: string
}

export interface LinkGroup {
  title: string
  items: LinkItem[]
}

export const LINK_GROUPS: LinkGroup[] = [
  {
    title: 'Kursun için: Netzwerk neu B1',
    items: [
      {
        name: 'Online alıştırmalar, Kapitel 1–6',
        what: 'Klett’in ücretsiz alıştırmaları (B1.1)',
        url: 'https://einstufungstests.klett-sprachen.de/eks/uebungen-nneu-b1-k1-6/',
      },
      {
        name: 'Online alıştırmalar, Kapitel 7–12',
        what: 'Klett’in ücretsiz alıştırmaları (B1.2)',
        url: 'https://einstufungstests.klett-sprachen.de/eks/netzwerk-neu-b1-k7-12/',
      },
      {
        name: 'Netzwerk neu ek materyaller',
        what: 'Kelime listeleri, transkriptler, videolar',
        url: 'https://www.klett-sprachen.de/netzwerk-neu/r-0/605#reiter=mediathek&niveau=B1',
      },
    ],
  },
  {
    title: 'İzle ve dinle',
    items: [
      { name: 'Nicos Weg B1', what: 'DW video kursu, 76 ders', url: NICOS_COURSE_URL },
      ...ROTATION.map((r) => ({ name: r.name, what: r.what, url: r.url })),
      { name: 'Slow German', what: 'Yavaş anlatılan podcast, B1 ve üstü', url: 'https://slowgerman.com' },
      { name: 'Easy German Podcast', what: 'Gündelik konuşma, transkriptli', url: 'https://www.easygerman.fm' },
      { name: 'logo!', what: 'ZDF çocuk haberleri, çok anlaşılır', url: 'https://www.logo.de/' },
    ],
  },
  {
    title: 'Gramer ve alıştırma',
    items: [
      { name: 'vhs-Lernportal', what: 'Ücretsiz BAMF onaylı kurs (üyelik ister)', url: 'https://www.vhs-lernportal.de' },
      { name: 'Deine Deutschprüfung B1', what: 'DW, B1 sınav hazırlığı', url: DW + 'deine-deutschpr%C3%BCfung-b1/s-68121740' },
      { name: 'Deutsch für Euch', what: 'YouTube, gramer anlatımları', url: 'https://www.youtube.com/@DeutschFuerEuch' },
    ],
  },
  {
    title: 'Araçlar',
    items: [
      { name: 'Language Reactor', what: 'YouTube/Netflix için çift altyazı eklentisi (Chrome)', url: 'https://www.languagereactor.com' },
      { name: 'PONS Almanca–Türkçe', what: 'Sözlük', url: 'https://de.pons.com/%C3%BCbersetzung/deutsch-t%C3%BCrkisch' },
      { name: 'Verbformen', what: 'Fiil çekimi ve isim çekimi', url: 'https://www.verbformen.de' },
      { name: 'DWDS', what: 'Almanca tek dilli sözlük, örnek cümleler', url: 'https://www.dwds.de' },
    ],
  },
]

export function ponsUrl(word: string) {
  return `https://de.pons.com/%C3%BCbersetzung/deutsch-t%C3%BCrkisch/${encodeURIComponent(word)}`
}
