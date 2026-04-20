"use client";
import { useState } from "react";

const areas = [
  {
    id: "sakarya",
    name: "Sakarya",
    desc: "Merkez ve tum ilceler",
    cx: 200,
    cy: 160,
    r: 54,
    color: "var(--leaf-700)",
    opacity: 0.18,
    dotColor: "#2d5e3d",
  },
  {
    id: "sapanca",
    name: "Sapanca",
    desc: "Golcuk ve cevre",
    cx: 310,
    cy: 200,
    r: 38,
    color: "var(--leaf-700)",
    opacity: 0.13,
    dotColor: "#2d5e3d",
  },
  {
    id: "izmit",
    name: "Izmit",
    desc: "Kocaeli merkez",
    cx: 410,
    cy: 155,
    r: 46,
    color: "var(--leaf-700)",
    opacity: 0.15,
    dotColor: "#2d5e3d",
  },
];

export function CoverageMap() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="rounded-[28px] border border-[var(--sand-300)] bg-white p-6 shadow-[0_14px_34px_rgba(39,74,52,0.07)]">
      <p className="mb-1 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--leaf-700)]">
        Hizmet Bölgesi
      </p>
      <p className="mb-4 text-xs text-[var(--ink-600)]">
        Sakarya, Sapanca ve Izmit'te aktif servis veriyoruz.
      </p>

      {/* SVG Map */}
      <div className="relative overflow-hidden rounded-[18px] bg-[var(--sand-50)]">
        <svg
          viewBox="0 0 600 320"
          className="w-full"
          style={{ fontFamily: "inherit" }}
        >
          {/* Background grid */}
          <defs>
            <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(45,94,61,0.06)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="600" height="320" fill="url(#grid)" />

          {/* Decorative coastline hint */}
          <path
            d="M 0 260 Q 100 240 200 255 Q 300 270 400 250 Q 500 230 600 245 L600 320 L0 320 Z"
            fill="rgba(113,168,111,0.08)"
          />
          <path
            d="M 0 260 Q 100 240 200 255 Q 300 270 400 250 Q 500 230 600 245"
            fill="none"
            stroke="rgba(45,94,61,0.12)"
            strokeWidth="1.5"
          />

          {/* Connecting lines between areas */}
          <line x1="200" y1="160" x2="310" y2="200" stroke="rgba(45,94,61,0.15)" strokeWidth="1.5" strokeDasharray="4 4" />
          <line x1="310" y1="200" x2="410" y2="155" stroke="rgba(45,94,61,0.15)" strokeWidth="1.5" strokeDasharray="4 4" />

          {/* Area circles */}
          {areas.map((area) => (
            <g key={area.id}>
              <circle
                cx={area.cx}
                cy={area.cy}
                r={area.r}
                fill={area.dotColor}
                fillOpacity={hovered === area.id ? 0.28 : area.opacity}
                stroke={area.dotColor}
                strokeOpacity={hovered === area.id ? 0.5 : 0.2}
                strokeWidth="1.5"
                style={{ transition: "all 0.2s ease", cursor: "pointer" }}
                onMouseEnter={() => setHovered(area.id)}
                onMouseLeave={() => setHovered(null)}
              />
              {/* Dot */}
              <circle
                cx={area.cx}
                cy={area.cy}
                r="5"
                fill={area.dotColor}
                style={{ cursor: "pointer" }}
                onMouseEnter={() => setHovered(area.id)}
                onMouseLeave={() => setHovered(null)}
              />
              {/* Label */}
              <text
                x={area.cx}
                y={area.cy + area.r + 16}
                textAnchor="middle"
                fontSize="11"
                fontWeight="600"
                fill="#1e3d2b"
                letterSpacing="0.05em"
              >
                {area.name}
              </text>
            </g>
          ))}

          {/* Tooltip on hover */}
          {hovered && (() => {
            const area = areas.find((a) => a.id === hovered)!;
            return (
              <g>
                <rect
                  x={area.cx - 60}
                  y={area.cy - area.r - 42}
                  width="120"
                  height="32"
                  rx="10"
                  fill="#1e3d2b"
                  opacity="0.92"
                />
                <text
                  x={area.cx}
                  y={area.cy - area.r - 22}
                  textAnchor="middle"
                  fontSize="10"
                  fill="white"
                  fontWeight="500"
                >
                  {area.desc}
                </text>
              </g>
            );
          })()}

          {/* "Yakin cevre" label */}
          <text x="510" y="200" fontSize="10" fill="rgba(45,94,61,0.45)" fontStyle="italic">
            + yakin cevre
          </text>
        </svg>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-2">
        {areas.map((area) => (
          <span
            key={area.id}
            className="flex items-center gap-1.5 rounded-full border border-[var(--sand-300)] bg-[var(--sand-50)] px-3 py-1.5 text-xs font-medium text-[var(--ink-700)]"
            onMouseEnter={() => setHovered(area.id)}
            onMouseLeave={() => setHovered(null)}
            style={{ cursor: "default" }}
          >
            <span className="h-2 w-2 rounded-full bg-[var(--leaf-700)]" />
            {area.name}
          </span>
        ))}
      </div>
    </div>
  );
}
