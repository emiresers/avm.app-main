package org.example.dto;

public class RaporOzetResponse {
    private double toplamGelir;
    private double toplamGider;
    private double netKar;

    public RaporOzetResponse(double toplamGelir, double toplamGider, double netKar) {
        this.toplamGelir = toplamGelir;
        this.toplamGider = toplamGider;
        this.netKar = netKar;
    }

    public double getToplamGelir() {
        return toplamGelir;
    }

    public double getToplamGider() {
        return toplamGider;
    }

    public double getNetKar() {
        return netKar;
    }
}

