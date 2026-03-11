🏬 AVM Yönetim ve Finans Takip Sistemi

Spring Boot tabanlı bir REST API backend ve React + TypeScript ile geliştirilmiş modern bir web arayüzünden oluşan tam yığın (Full Stack) bir demo uygulamasıdır.

Bu proje, bir alışveriş merkezindeki mağazaların kira, gelir, gider ve kar/zarar durumlarını takip etmek amacıyla geliştirilmiştir.

Proje aynı zamanda aşağıdaki konuları uygulamalı olarak göstermek için hazırlanmıştır:
	•	Nesne Yönelimli Programlama (OOP)
	•	RESTful API geliştirme
	•	Full Stack uygulama mimarisi
	•	Backend–Frontend entegrasyonu
	•	Finansal veri modelleme

⸻

🚀 Özellikler

🏪 Mağaza Yönetimi
	•	Yeni mağaza ekleme
	•	Mağazaları listeleme
	•	Mağaza detaylarını görüntüleme
	•	Mağaza silme

Mağaza bilgileri:
	•	Mağaza ID
	•	Mağaza adı
	•	Adres
	•	Kira bilgisi

⸻

💰 Gelir / Gider Yönetimi

Seçilen mağaza için finans kayıtları tutulabilir.

Eklenebilen kayıtlar:
	•	Gelir kaydı
	•	Gider kaydı

Her kayıt aşağıdaki bilgileri içerir:
	•	Tutar
	•	Açıklama
	•	Tarih

⸻

📊 Finansal Raporlama

Her mağaza için aşağıdaki özet bilgiler hesaplanabilir:
	•	Toplam gelir
	•	Toplam gider
	•	Net kar / zarar

Raporlar isteğe bağlı olarak tarih aralığı verilerek de alınabilir.

Örnek:
	•	Başlangıç tarihi
	•	Bitiş tarihi

⸻

🌐 Modern Web Arayüzü

Frontend tarafı React + TypeScript kullanılarak geliştirilmiştir.

Arayüzde bulunan temel bölümler:
	•	Mağaza ekleme formu
	•	Mağaza listesi
	•	Seçili mağaza paneli
	•	Gelir ekleme formu
	•	Gider ekleme formu
	•	Kar / zarar özet kartları

Frontend, backend ile REST API üzerinden haberleşir.

⚙️ Backend

Backend uygulaması Spring Boot kullanılarak geliştirilmiştir.
Kullanılan teknolojiler:
	•	Java 17
	•	Spring Boot
	•	Gradle
	•	REST API mimarisi

Backend tarafında bulunan ana controller sınıfları:

Controller                Görev
MagazaController          Mağaza CRUD işlemleri
FinansController          Gelir ve gider kayıtları
RaporController           Finansal rapor oluşturma

💻 Frontend

Frontend uygulaması aşağıdaki teknolojiler kullanılarak geliştirilmiştir:
	•	React
	•	TypeScript
	•	CSS

📁 Proje Yapısı

avm-management-system
│
├── avm.app-main        → Spring Boot backend
│   ├── controller
│   ├── model
│   ├── service
│   └── manager
│
├── avm-frontend        → React frontend
│   ├── components
│   ├── services
│   └── pages
│
└── README.md

👨‍💻 Developer : Emir Eser
