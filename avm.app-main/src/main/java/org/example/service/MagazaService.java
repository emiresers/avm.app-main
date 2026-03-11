package org.example.service;

import org.example.Magaza;
import org.example.MagazaYonetici;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MagazaService {

    private final MagazaYonetici magazaYonetici = new MagazaYonetici();

    public List<Magaza> tumMagazalar() {
        return magazaYonetici.getMagazalar();
    }

    public Magaza magazaEkle(Magaza magaza) {
        magazaYonetici.magazaEkle(magaza);
        return magaza;
    }

    public void magazaSil(String id) {
        magazaYonetici.magazaSil(id);
    }

    public Magaza magazaBul(String id) {
        return magazaYonetici.magazaBul(id);
    }
}

