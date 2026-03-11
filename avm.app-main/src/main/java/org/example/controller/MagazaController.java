package org.example.controller;

import org.example.Magaza;
import org.example.service.MagazaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/magazalar")
@CrossOrigin(origins = "http://localhost:5173")
public class MagazaController {

    private final MagazaService magazaService;

    public MagazaController(MagazaService magazaService) {
        this.magazaService = magazaService;
    }

    @GetMapping
    public List<Magaza> listele() {
        return magazaService.tumMagazalar();
    }

    @PostMapping
    public ResponseEntity<Magaza> ekle(@RequestBody Magaza magaza) {
        Magaza created = magazaService.magazaEkle(magaza);
        return ResponseEntity.ok(created);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Magaza> getir(@PathVariable String id) {
        Magaza magaza = magazaService.magazaBul(id);
        if (magaza == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(magaza);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> sil(@PathVariable String id) {
        magazaService.magazaSil(id);
        return ResponseEntity.noContent().build();
    }
}

