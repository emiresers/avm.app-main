package org.example.controller;

import org.example.Magaza;
import org.example.dto.RaporOzetResponse;
import org.example.service.MagazaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;

@RestController
@RequestMapping("/api/magazalar/{id}/rapor")
@CrossOrigin(origins = "http://localhost:5173")
public class RaporController {

    private final MagazaService magazaService;

    public RaporController(MagazaService magazaService) {
        this.magazaService = magazaService;
    }

    // Toplam kar/zarar
    @GetMapping("/ozet")
    public ResponseEntity<RaporOzetResponse> ozet(@PathVariable String id,
                                                  @RequestParam(required = false) String baslangic,
                                                  @RequestParam(required = false) String bitis) {
        Magaza magaza = magazaService.magazaBul(id);
        if (magaza == null) {
            return ResponseEntity.notFound().build();
        }

        double toplamGelir;
        double toplamGider;

        if (baslangic != null && bitis != null) {
            Date baslangicTarihi = parseDate(baslangic);
            Date bitisTarihi = parseDate(bitis);
            toplamGelir = magaza.gelirHesapla(baslangicTarihi, bitisTarihi);
            toplamGider = magaza.giderHesapla(baslangicTarihi, bitisTarihi);
        } else {
            toplamGelir = magaza.gelirHesapla();
            toplamGider = magaza.giderHesapla();
        }

        double netKar = toplamGelir - toplamGider;
        RaporOzetResponse response = new RaporOzetResponse(toplamGelir, toplamGider, netKar);
        return ResponseEntity.ok(response);
    }

    private Date parseDate(String isoDate) {
        LocalDate localDate = LocalDate.parse(isoDate); // yyyy-MM-dd
        return Date.from(localDate.atStartOfDay(ZoneId.systemDefault()).toInstant());
    }
}

