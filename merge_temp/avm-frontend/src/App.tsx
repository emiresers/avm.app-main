import { useEffect, useState, FormEvent } from "react";

type Magaza = {
  magazaId: string;
  magazaAdi: string;
  adres: string;
  kira: number;
};

type RaporOzet = {
  toplamGelir: number;
  toplamGider: number;
  netKar: number;
};

const API_URL = "http://localhost:8080/api";

function App() {
  const [magazalar, setMagazalar] = useState<Magaza[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    magazaId: "",
    magazaAdi: "",
    adres: "",
    kira: "",
  });

  const [seciliMagazaId, setSeciliMagazaId] = useState<string | null>(null);

  const [gelirForm, setGelirForm] = useState({
    miktar: "",
    aciklama: "",
    tarih: "",
  });

  const [giderForm, setGiderForm] = useState({
    miktar: "",
    aciklama: "",
    tarih: "",
  });

  const [raporTarih, setRaporTarih] = useState({
    baslangic: "",
    bitis: "",
  });
  const [rapor, setRapor] = useState<RaporOzet | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/magazalar`)
      .then((res) => res.json())
      .then((data) => setMagazalar(data))
      .catch((err) => console.error("Listeleme hatası", err))
      .finally(() => setLoading(false));
  }, []);

  const handleMagazaEkle = (e: FormEvent) => {
    e.preventDefault();
    const body = {
      magazaId: form.magazaId,
      magazaAdi: form.magazaAdi,
      adres: form.adres,
      kira: Number(form.kira),
    };

    fetch(`${API_URL}/magazalar`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((yeni) => {
        setMagazalar((prev) => [...prev, yeni]);
        setForm({ magazaId: "", magazaAdi: "", adres: "", kira: "" });
      })
      .catch((err) => console.error("Ekleme hatası", err));
  };

  const postGelirGider = (tip: "gelir" | "gider", e: FormEvent) => {
    e.preventDefault();
    if (!seciliMagazaId) {
      alert("Önce bir mağaza seçin.");
      return;
    }

    const ff = tip === "gelir" ? gelirForm : giderForm;
    const body = {
      miktar: Number(ff.miktar),
      aciklama: ff.aciklama,
      tarih: ff.tarih,
    };

    fetch(`${API_URL}/magazalar/${seciliMagazaId}/${tip}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Hata");
        if (tip === "gelir") {
          setGelirForm({ miktar: "", aciklama: "", tarih: "" });
        } else {
          setGiderForm({ miktar: "", aciklama: "", tarih: "" });
        }
      })
      .catch(() => alert("Kayıt sırasında hata oluştu."));
  };

  const raporGetir = (e: FormEvent) => {
    e.preventDefault();
    if (!seciliMagazaId) {
      alert("Önce bir mağaza seçin.");
      return;
    }

    let url = `${API_URL}/magazalar/${seciliMagazaId}/rapor/ozet`;
    if (raporTarih.baslangic && raporTarih.bitis) {
      url += `?baslangic=${raporTarih.baslangic}&bitis=${raporTarih.bitis}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => setRapor(data))
      .catch(() => alert("Rapor alınırken hata oluştu."));
  };

  return (
    <div className="app-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="logo-mark">
            <div className="logo-mark-inner" />
          </div>
          <div className="logo-text">
            <span className="logo-title">AVM Panel</span>
            <span className="logo-sub">Yönetim & Finans</span>
          </div>
        </div>

        <div>
          <div className="sidebar-section-title">Modüller</div>
          <ul className="nav-list">
            <li className="nav-item nav-item-active">
              <span>Mağaza Yönetimi</span>
              <span className="nav-item-badge">
                {magazalar.length.toString().padStart(2, "0")}
              </span>
            </li>
            <li className="nav-item">
              <span>Raporlama</span>
            </li>
          </ul>
        </div>

        <div className="sidebar-footer">
          v1.0 • Sadece lokal kullanım için
        </div>
      </aside>

      {/* Main */}
      <div className="main">
        <header className="topbar">
          <div>
            <div className="topbar-title">AVM Yönetim Sistemi</div>
            <div className="topbar-sub">
              Mağaza, gelir/gider ve kar-zarar takibi
            </div>
          </div>
          <div className="topbar-user">
            <span className="status-pill">
              <span className="status-dot" />
              {loading ? "Backend bekleniyor..." : "Backend bağlı"}
            </span>
          </div>
        </header>

        <main className="content">
          <div className="content-grid">
            {/* Sol kolon */}
            <div>
              <section className="card">
                <div className="card-header">
                  <div>
                    <div className="card-title">Mağaza Ekle</div>
                    <div className="card-sub">
                      Yeni kiracıyı AVM’ye tanımlayın
                    </div>
                  </div>
                </div>
                <form
                  onSubmit={handleMagazaEkle}
                  className="form-grid"
                  style={{ maxWidth: 380 }}
                >
                  <div>
                    <div className="label">Mağaza ID</div>
                    <input
                      className="input"
                      value={form.magazaId}
                      onChange={(e) =>
                        setForm({ ...form, magazaId: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <div className="label">Mağaza Adı</div>
                    <input
                      className="input"
                      value={form.magazaAdi}
                      onChange={(e) =>
                        setForm({ ...form, magazaAdi: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <div className="label">Adres</div>
                    <input
                      className="input"
                      value={form.adres}
                      onChange={(e) =>
                        setForm({ ...form, adres: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <div className="label">Kira (TL)</div>
                    <input
                      className="input"
                      type="number"
                      min={0}
                      value={form.kira}
                      onChange={(e) =>
                        setForm({ ...form, kira: e.target.value })
                      }
                      required
                    />
                  </div>
                  <button className="button" type="submit">
                    Mağazayı Kaydet
                  </button>
                </form>
              </section>

              <section className="card card-muted" style={{ marginTop: 14 }}>
                <div className="card-header">
                  <div>
                    <div className="card-title">Mağazalar</div>
                    <div className="card-sub">
                      Toplam {magazalar.length} kayıt
                    </div>
                  </div>
                </div>

                {magazalar.length === 0 ? (
                  <p style={{ fontSize: 12, color: "#9ca3af" }}>
                    Henüz mağaza yok. Üstten yeni bir mağaza ekleyin.
                  </p>
                ) : (
                  <>
                    <div className="table-wrapper">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Seç</th>
                            <th>ID</th>
                            <th>Ad</th>
                            <th>Adres</th>
                            <th>Kira</th>
                          </tr>
                        </thead>
                        <tbody>
                          {magazalar.map((m) => (
                            <tr key={m.magazaId}>
                              <td>
                                <input
                                  type="radio"
                                  name="seciliMagaza"
                                  checked={seciliMagazaId === m.magazaId}
                                  onChange={() =>
                                    setSeciliMagazaId(m.magazaId)
                                  }
                                />
                              </td>
                              <td>{m.magazaId}</td>
                              <td>{m.magazaAdi}</td>
                              <td>{m.adres}</td>
                              <td>{m.kira}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <p style={{ marginTop: 8, fontSize: 11, color: "#9ca3af" }}>
                      Seçili mağaza:{" "}
                      <strong>{seciliMagazaId ?? "Seçilmedi"}</strong>
                    </p>
                  </>
                )}
              </section>
            </div>

            {/* Sağ kolon */}
            <div>
              <section className="card card-muted">
                <div className="card-header">
                  <div>
                    <div className="card-title">Gelir &amp; Gider</div>
                    <div className="card-sub">
                      Seçili mağaza için kayıt ekleyin
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                    gap: 12,
                  }}
                >
                  <div>
                    <div className="card-sub" style={{ marginBottom: 4 }}>
                      Gelir Ekle
                    </div>
                    <form
                      onSubmit={(e) => postGelirGider("gelir", e)}
                      className="form-grid"
                    >
                      <div>
                        <div className="label">Miktar</div>
                        <input
                          className="input"
                          type="number"
                          min={0}
                          value={gelirForm.miktar}
                          onChange={(e) =>
                            setGelirForm({
                              ...gelirForm,
                              miktar: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div>
                        <div className="label">Açıklama</div>
                        <input
                          className="input"
                          value={gelirForm.aciklama}
                          onChange={(e) =>
                            setGelirForm({
                              ...gelirForm,
                              aciklama: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div>
                        <div className="label">Tarih</div>
                        <input
                          className="input"
                          type="date"
                          value={gelirForm.tarih}
                          onChange={(e) =>
                            setGelirForm({
                              ...gelirForm,
                              tarih: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <button className="button" type="submit">
                        Gelir Kaydet
                      </button>
                    </form>
                  </div>

                  <div>
                    <div className="card-sub" style={{ marginBottom: 4 }}>
                      Gider Ekle
                    </div>
                    <form
                      onSubmit={(e) => postGelirGider("gider", e)}
                      className="form-grid"
                    >
                      <div>
                        <div className="label">Miktar</div>
                        <input
                          className="input"
                          type="number"
                          min={0}
                          value={giderForm.miktar}
                          onChange={(e) =>
                            setGiderForm({
                              ...giderForm,
                              miktar: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div>
                        <div className="label">Açıklama</div>
                        <input
                          className="input"
                          value={giderForm.aciklama}
                          onChange={(e) =>
                            setGiderForm({
                              ...giderForm,
                              aciklama: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div>
                        <div className="label">Tarih</div>
                        <input
                          className="input"
                          type="date"
                          value={giderForm.tarih}
                          onChange={(e) =>
                            setGiderForm({
                              ...giderForm,
                              tarih: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <button className="button" type="submit">
                        Gider Kaydet
                      </button>
                    </form>
                  </div>
                </div>
              </section>

              <section className="card" style={{ marginTop: 14 }}>
                <div className="card-header">
                  <div>
                    <div className="card-title">Kar/Zarar Özeti</div>
                    <div className="card-sub">
                      Toplam veya tarih aralığına göre rapor
                    </div>
                  </div>
                </div>
                <form
                  onSubmit={raporGetir}
                  style={{
                    display: "flex",
                    gap: 10,
                    alignItems: "flex-end",
                    flexWrap: "wrap",
                  }}
                >
                  <div>
                    <div className="label">Başlangıç</div>
                    <input
                      className="input"
                      type="date"
                      value={raporTarih.baslangic}
                      onChange={(e) =>
                        setRaporTarih({
                          ...raporTarih,
                          baslangic: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <div className="label">Bitiş</div>
                    <input
                      className="input"
                      type="date"
                      value={raporTarih.bitis}
                      onChange={(e) =>
                        setRaporTarih({
                          ...raporTarih,
                          bitis: e.target.value,
                        })
                      }
                    />
                  </div>
                  <button className="button" type="submit">
                    Raporu Getir
                  </button>
                </form>

                {rapor && (
                  <div className="kpi-row">
                    <div className="kpi">
                      <div className="kpi-label">Toplam Gelir</div>
                      <div className="kpi-value">
                        {rapor.toplamGelir.toFixed(2)} TL
                      </div>
                    </div>
                    <div className="kpi">
                      <div className="kpi-label">Toplam Gider</div>
                      <div className="kpi-value">
                        {rapor.toplamGider.toFixed(2)} TL
                      </div>
                    </div>
                    <div className="kpi">
                      <div className="kpi-label">Net Kar</div>
                      <div
                        className={
                          "kpi-value " +
                          (rapor.netKar >= 0 ? "positive" : "negative")
                        }
                      >
                        {rapor.netKar.toFixed(2)} TL
                      </div>
                    </div>
                  </div>
                )}
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;