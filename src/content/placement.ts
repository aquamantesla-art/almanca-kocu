import { parseExercises } from './parse'
import type { Exercise } from './types'

// Three questions per A2 topic. Score 0–3 per topic decides the repair order of weeks 1–3.
const RAW: Record<string, string> = {
  verbpos: `
mc | Am Montag ___ einen Termin beim Arzt. | habe ich* / ich habe / ich hatte | V2: Am Montag + fiil + özne.
mc | Wir ___ heute Abend ins Kino ___. | wollen … gehen* / wollen gehen … – / gehen … wollen | Modal 2. yerde, mastar sonda.
mc | Der Kurs ___ um neun Uhr ___. | fängt … an* / anfängt … – / fängt an … – | Ayrılabilen: fängt … an.
`,
  nebensatz: `
mc | Ich kann nicht kommen, weil ich ___. | arbeiten muss* / muss arbeiten / arbeite muss | Yan cümlede çekimli fiil sonda.
mc | Weißt du, ___ Tom morgen kommt? | ob* / dass / wenn | Evet/hayır → ob.
mc | Wenn es regnet, ___ zu Hause. | bleiben wir* / wir bleiben / bleiben | Yan cümle önde → fiil hemen.
`,
  perfekt: `
mc | Wir ___ gestern ins Museum gegangen. | sind* / haben / werden | gehen → sein.
mc | Ich habe den Brief schon ___. | geschrieben* / geschreibt / schreibt | schreiben → geschrieben.
mc | Hast du deine Oma ___? | besucht* / gebesucht / besuchen | be- → ge- yok.
`,
  praetbasic: `
mc | Gestern ___ ich keine Zeit. | hatte* / habe / war | haben → hatte.
mc | Als Kind ___ ich nicht schwimmen. | konnte* / könnte / kann | können → konnte.
mc | Wo ___ ihr am Wochenende? | wart* / waren / seid gewesen | sein → ihr wart.
`,
  trennbar: `
mc | Ich ___ dich später ___. | rufe … an* / anrufe … – / rufe … ab | anrufen → rufe … an.
mc | Ich weiß nicht, wann der Zug ___. | ankommt* / kommt an / an kommt | Yan cümlede bitişik.
mc | Ich habe heute schon ___. | eingekauft* / geeinkauft / einkauft | ein-ge-kauft.
`,
  kasus: `
mc | Ich besuche morgen ___ Onkel. | meinen* / meinem / mein | besuchen + Akk.: meinen.
mc | Das Fahrrad gehört ___ Schwester. | meiner* / meine / meinen | gehören + Dativ: meiner.
mc | Kannst du ___ das Buch geben? (o, erkek) | ihm* / ihn / er | Kime? → ihm.
`,
  praep: `
mc | Die Tasse steht auf ___ Tisch. | dem* / den / der | Wo? → Dativ.
mc | Ich gehe heute ___ Supermarkt. | in den* / im / in dem | Wohin? → Akkusativ.
mc | Wir fahren mit ___ Zug. | dem* / den / das | mit + Dativ.
`,
  adjbasic: `
mc | Ich habe ein ___ Auto gekauft. | neues* / neue / neuen | ein + neutr. → -es.
mc | Der ___ Film war langweilig. | neue* / neuen / neuer | der + Nom. → -e.
mc | Wir wohnen in einem ___ Haus. | alten* / alte / altes | Dativ → -en.
`,
  komparativ: `
mc | Mein Bruder ist ___ als ich. | älter* / alter / mehr alt | alt → älter.
mc | Ich esse am ___ Döner. | liebsten* / gernsten / lieber | gern → am liebsten.
mc | Anna ist so groß ___ Maria. | wie* / als / so | so … wie.
`,
  reflexiv: `
mc | Ich interessiere ___ für Musik. | mich* / mir / sich | ich → mich.
mc | Wir treffen ___ morgen. | uns* / euch / sich | wir → uns.
mc | Ich putze ___ die Zähne. | mir* / mich / sich | Akk. nesne var → mir.
`,
}

export const PLACEMENT: Exercise[] = Object.entries(RAW).flatMap(([topic, src]) =>
  parseExercises(topic, src).map((e) => ({ ...e, id: `place-${e.id}` })),
)
