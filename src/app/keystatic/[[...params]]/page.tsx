"use client";

import { makePage } from "@keystatic/next/ui/app";
import config, { keystaticEnabled } from "../../../../keystatic.config";

function NotConfigured() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: 24,
        fontFamily: "system-ui, sans-serif",
        background: "#F7F5F0",
        color: "#1F2421",
      }}
    >
      <div style={{ maxWidth: 520, textAlign: "center" }}>
        <h1 style={{ color: "#1B3022", fontSize: 26, marginBottom: 12 }}>ადმინ პანელი ჯერ არ არის ჩართული</h1>
        <p style={{ lineHeight: 1.6 }}>
          რედაქტორი მუშაობს Keystatic Cloud-ის მეშვეობით. შექმენით პროექტი keystatic.cloud-ზე და მიუთითეთ მისი სახელი
          კონფიგურაციაში (იხ. README → „ადმინ პანელი“).
        </p>
      </div>
    </main>
  );
}

export default keystaticEnabled ? makePage(config) : NotConfigured;
