import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 8,
          background: "linear-gradient(135deg, #6366f1 0%, #7c3aed 50%, #9333ea 100%)",
        }}
      >
        <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
          <path
            d="M12 3L4 7v6c0 4.2 3.4 7.4 8 9 4.6-1.6 8-4.8 8-9V7l-8-4Z"
            stroke="white"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="11" r="2.2" fill="white" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
