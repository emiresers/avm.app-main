package org.example.controller;

import org.example.Magaza;
import org.example.dto.GelirGiderRequest;
import org.example.service.MagazaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;

@RestController
@RequestMapping("/api/magazalar/{id}")
@CrossOrigin(origins = "http://localhost:5173")
public class FinansController {

    private final MagazaService magazaService;

    public FinansController(MagazaService magazaService) {
        this.magazaService = magazaService;
    }

    @PostMapping("/gelir")
    public ResponseEntity<Void> gelirEkle(@PathVariable String id, @RequestBody GelirGiderRequest request) {
        Magaza magaza = magazaService.magazaBul(id);
        if (magaza == null) {
            return ResponseEntity.notFound().build();
        }

        Date tarih = parseDate(request.getTarih());
        magaza.gelirEkle(request.getMiktar(), request.getAciklama(), tarih);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/gider")
    public ResponseEntity<Void> giderEkle(@PathVariable String id, @RequestBody GelirGiderRequest request) {
        Magaza magaza = magazaService.magazaBul(id);
        if (magaza == null) {
            return ResponseEntity.notFound().build();
        }

        Date tarih = parseDate(request.getTarih());
        magaza.giderEkle(request.getMiktar(), request.getAciklama(), tarih);
        return ResponseEntity.ok().build();
    }

    private Date parseDate(String isoDate) {
        LocalDate localDate = LocalDate.parse(isoDate); // yyyy-MM-dd
        return Date.from(localDate.atStartOfDay(ZoneId.systemDefault()).toInstant());
    }
}

