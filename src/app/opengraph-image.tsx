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
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#fafaf9",
          color: "#0c0c0c",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            letterSpacing: 4,
            color: "#686868",
            fontFamily: "monospace",
          }}
        >
          <span>PORTFOLIO</span>
          <span>GUAYAQUIL, EC</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 150, lineHeight: 0.9, letterSpacing: -6, fontWeight: 800 }}>MIGUEL</div>
          <div style={{ fontSize: 150, lineHeight: 0.9, letterSpacing: -6, fontWeight: 800 }}>
            MEDINA.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            borderTop: "1px solid #e4e4e2",
            paddingTop: 24,
            fontSize: 28,
            color: "#686868",
            fontFamily: "sans-serif",
          }}
        >
          Computer Science Student & Software Developer · ESPOL
        </div>
      </div>
    ),
    { ...size },
  );
}
