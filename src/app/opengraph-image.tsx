import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Miguel Medina — Computer Science Student & Software Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "linear-gradient(135deg, #0a0a0b 0%, #17070d 60%, #2a0a16 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              background: "#be123c",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 44,
              fontWeight: 700,
            }}
          >
            M
          </div>
          <div style={{ color: "#f2556b", fontSize: 26, letterSpacing: 2 }}>
            PORTFOLIO
          </div>
        </div>
        <div style={{ color: "white", fontSize: 76, fontWeight: 700 }}>
          Miguel Medina
        </div>
        <div style={{ color: "#f2556b", fontSize: 38, marginTop: 8 }}>
          Computer Science Student &amp; Software Developer
        </div>
        <div
          style={{
            color: "rgba(255,255,255,0.6)",
            fontSize: 26,
            marginTop: 28,
            maxWidth: 900,
          }}
        >
          AI agents · Backend · Web · ESPOL, Guayaquil — Ecuador
        </div>
      </div>
    ),
    { ...size },
  );
}
