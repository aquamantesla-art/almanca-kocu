import { Capacitor } from '@capacitor/core'
import { Browser } from '@capacitor/browser'
import { TextToSpeech } from '@capacitor-community/text-to-speech'
import { useApp } from './store'

export const isNative = Capacitor.isNativePlatform()

export function openLink(url: string) {
  if (isNative) {
    void Browser.open({ url })
  } else {
    window.open(url, '_blank', 'noopener,noreferrer')
  }
}

export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    const ok = document.execCommand('copy')
    ta.remove()
    return ok
  }
}

// ---------- Text to speech ----------

let germanVoice: SpeechSynthesisVoice | null = null

function pickVoice() {
  if (typeof speechSynthesis === 'undefined') return
  const voices = speechSynthesis.getVoices().filter((v) => v.lang.toLowerCase().startsWith('de'))
  germanVoice =
    voices.find((v) => /google/i.test(v.name)) ??
    voices.find((v) => /natural|neural|online/i.test(v.name)) ??
    voices.find((v) => v.lang === 'de-DE') ??
    voices[0] ??
    null
}

if (!isNative && typeof speechSynthesis !== 'undefined') {
  pickVoice()
  speechSynthesis.addEventListener?.('voiceschanged', pickVoice)
}

export function ttsAvailable(): boolean {
  return isNative || typeof speechSynthesis !== 'undefined'
}

let speakToken = 0

/** Speaks German text; resolves when finished (or interrupted by another call) */
export async function speak(text: string, rateMul = 1): Promise<void> {
  const rate = useApp.getState().settings.ttsRate * rateMul
  const token = ++speakToken
  if (isNative) {
    try {
      await TextToSpeech.stop()
      await TextToSpeech.speak({ text, lang: 'de-DE', rate, pitch: 1, volume: 1, category: 'playback' })
    } catch {
      /* no German voice installed */
    }
    return
  }
  if (typeof speechSynthesis === 'undefined') return
  speechSynthesis.cancel()
  await new Promise<void>((resolve) => {
    const u = new SpeechSynthesisUtterance(text)
    u.lang = 'de-DE'
    u.rate = rate
    if (germanVoice) u.voice = germanVoice
    u.onend = () => resolve()
    u.onerror = () => resolve()
    speechSynthesis.speak(u)
    // Chrome sometimes never fires onend for long texts; poll as a fallback
    const iv = window.setInterval(() => {
      if (token !== speakToken || !speechSynthesis.speaking) {
        window.clearInterval(iv)
        resolve()
      }
    }, 400)
  })
}

export function stopSpeaking() {
  speakToken++
  if (isNative) {
    void TextToSpeech.stop().catch(() => {})
  } else if (typeof speechSynthesis !== 'undefined') {
    speechSynthesis.cancel()
  }
}

export function isSpeakingCurrent(token: number) {
  return token === speakToken
}

export function currentSpeakToken() {
  return speakToken
}

// ---------- Audio recording ----------

export interface Recording {
  stop: () => Promise<string>
  cancel: () => void
}

export function recordingSupported(): boolean {
  return typeof MediaRecorder !== 'undefined' && !!navigator.mediaDevices?.getUserMedia
}

export async function startRecording(): Promise<Recording> {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
  const rec = new MediaRecorder(stream)
  const chunks: Blob[] = []
  rec.ondataavailable = (e) => {
    if (e.data.size > 0) chunks.push(e.data)
  }
  rec.start()
  const release = () => stream.getTracks().forEach((t) => t.stop())
  return {
    stop: () =>
      new Promise<string>((resolve) => {
        rec.onstop = () => {
          release()
          resolve(URL.createObjectURL(new Blob(chunks, { type: rec.mimeType || 'audio/webm' })))
        }
        rec.stop()
      }),
    cancel: () => {
      try {
        rec.stop()
      } catch {
        /* already stopped */
      }
      release()
    },
  }
}
