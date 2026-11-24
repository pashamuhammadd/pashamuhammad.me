import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";

export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = "image/png";

export function generateOgImage() {
  const imageBuffer = readFileSync(join(process.cwd(), "public", "profile.png"));
  const imageBase64 = `data:image/png;base64,${imageBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1f1f27",
          backgroundImage:
            "radial-gradient(circle at 25% 20%, rgba(0,206,153,0.25), transparent 45%), radial-gradient(circle at 80% 85%, rgba(0,206,153,0.15), transparent 40%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 232,
            height: 232,
            borderRadius: "9999px",
            border: "6px solid rgba(0,206,153,0.5)",
            marginBottom: 36,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src={imageBase64}
            width={220}
            height={220}
            style={{
              width: 220,
              height: 220,
              objectFit: "cover",
              borderRadius: "9999px",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 64,
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "-0.02em",
          }}
        >
          Pasha Muhammad
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 18,
            fontSize: 28,
            color: "#00ce99",
            fontWeight: 600,
          }}
        >
          Software Developer &amp; Founder of Nimia Studio
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 40,
            fontSize: 22,
            color: "#9ca3af",
          }}
        >
          pashamuhammad.me
        </div>
      </div>
    ),
    { ...ogImageSize }
  );
}
