# Almanca Koçu — Tasarım

## Amaç
Haftada 6 saat (kurs dışı) çalışan, B1.1 kursuna (Netzwerk neu) devam eden ama A2 temeli
zayıf bir Türk öğrenciyi 12 haftada "B1 seviyesinde rahat anlayan" bir noktaya taşımak.
Yöntem `Öğrenme yollar.txt` raporundan: Nation'ın 4 çizgisi, FSRS aralıklı tekrar,
interleaving, renk kodlu artikeller (der mavi / die kırmızı / das yeşil), zorlanmış çıktı,
4/3/2 ve RRR akıcılık teknikleri.

## Başarı ölçütü
- Nicos Weg B1, DW Langsam gesprochene Nachrichten, Easy German (altyazılı) büyük ölçüde anlaşılır.
- ~1500–2000 kelime artikeliyle; B1 gramerini tanıma ve çoğunu kurma.
- Anti-hedef: kullanıcıya "ne yapacağım?" diye düşündüren, uzun menülü bir uygulama.
  Her gün tek tuş: "Başla".

## Program
- 12 hafta × 6 oturum × ~60 dk. Program günü, takvime değil tamamlanan oturuma göre ilerler.
- Dönem 1 (H1–3) A2 tamiri: Dil odaklı %40 · Girdi %25 · Yazma %17 · Akıcılık %18
- Dönem 2 (H4–8) B1 çekirdek: 4 çizgi eşit
- Dönem 3 (H9–12) Anlama sıçraması: Girdi %40 · Dil %20 · Yazma %20 · Akıcılık %20
- Dönem 1'de gramer odağı seviye testine göre (zayıf konu önce).
- "Kursta şu an işlediğimiz konu" seçilirse her gün o konudan da alıştırma gelir (Netzwerk neu ile hizalama).

## Günlük oturum blokları
1. Kelime (FSRS): tekrarlar + günlük yeni kelime limiti (varsayılan 15). İsimlerde önce artikel tahmini, sonra anlam.
2. Gramer: konu anlatımı (ilk sefer) + karışık alıştırma (odak konu + kurs konusu + eski konuların tekrarları).
3. Girdi: Nicos Weg B1 dersi (sırayla, 76 ders) + dönüşümlü ek kaynak (DW LGN, Easy German, nachrichtenleicht, Top-Thema, tagesschau einfach, Jojo).
4. Yazma: günün görevi → hazır düzeltme promptu kopyala → ChatGPT/Gemini → hataları "hata defteri"ne ekle (SRS kartı olur).
5. Akıcılık: 4/3/2 konuşma (sayaç + ses kaydı) ya da RRR (metni 3 kez sesli oku, kapat, anlat).

## Ek bölümler
Pratik merkezi (serbest çalışma, hızlı eleme, artikel ustası, gramer konuları, okuma metinleri,
konuşma, hata defteri, kaynaklar), İlerleme, Ayarlar (yedekle/geri yükle).

## Teknik
- Vite + React + TypeScript + Tailwind, PWA (çevrimdışı). Sunucu yok; veriler cihazda (IndexedDB).
- ts-fsrs ile zamanlama. Web Speech API / Capacitor TTS ile Almanca seslendirme.
- Yayın: GitHub Pages. APK: Capacitor + GitHub Actions (bulutta derleme, Releases'e yükleme).
- İçerik (kelime, gramer, metinler, görevler) uygulamanın içinde, Türkçe açıklamalı.

## Kararlar (benim seçimlerim)
- Kelime kartı yönü: Almanca → Türkçe (hedef "anlamak"); üretim yazma bloğunda.
- AI düzeltme: API anahtarı yok, ücretsiz kopyala-yapıştır akışı.
- Uygulama adı: "Almanca Koçu".
