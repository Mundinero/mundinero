"use client";

import { useRef, useEffect, useState, useMemo, useCallback, MutableRefObject } from "react";
import Globe, { GlobeMethods } from "react-globe.gl";
import { MeshPhongMaterial, Color } from "three";

interface CityPoint {
  name: string;
  lat: number;
  lng: number;
  size: number;
  label: string;
}

const CITIES: CityPoint[] = [
  { name: "CDMX",          lat: 19.43,  lng: -99.13,  size: 0.55, label: "Ciudad de México" },
  { name: "Nueva York",    lat: 40.71,  lng: -74.01,  size: 0.45, label: "Nueva York" },
  { name: "Los Ángeles",   lat: 34.05,  lng: -118.24, size: 0.40, label: "Los Ángeles" },
  { name: "Chicago",       lat: 41.88,  lng: -87.63,  size: 0.35, label: "Chicago" },
  { name: "Miami",         lat: 25.77,  lng: -80.19,  size: 0.35, label: "Miami" },
  { name: "Madrid",        lat: 40.41,  lng: -3.70,   size: 0.40, label: "Madrid" },
  { name: "Londres",       lat: 51.51,  lng: -0.13,   size: 0.42, label: "Londres" },
  { name: "Frankfurt",     lat: 50.11,  lng: 8.68,    size: 0.32, label: "Frankfurt" },
  { name: "Bogotá",        lat: 4.71,   lng: -74.07,  size: 0.35, label: "Bogotá" },
  { name: "Buenos Aires",  lat: -34.60, lng: -58.38,  size: 0.38, label: "Buenos Aires" },
  { name: "São Paulo",     lat: -23.55, lng: -46.63,  size: 0.38, label: "São Paulo" },
  { name: "Tokio",         lat: 35.68,  lng: 139.69,  size: 0.40, label: "Tokio" },
  { name: "Shanghái",      lat: 31.23,  lng: 121.47,  size: 0.38, label: "Shanghái" },
  { name: "Singapur",      lat: 1.35,   lng: 103.82,  size: 0.35, label: "Singapur" },
];

interface ArcData {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  color: string;
}

const CORRIDOR_ARC: ArcData = {
  startLat: 19.43,
  startLng: -99.13,
  endLat:   40.71,
  endLng:  -74.01,
  color:    "#6B87FF",
};

interface Props {
  theme: string;
  pessoMode: boolean;
  onPointHover?: (name: string | null) => void;
}

export default function GloboAtlas({ theme, pessoMode, onPointHover }: Props) {
  const globeRef = useRef<GlobeMethods | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isLight = theme === "light";

  const [countries, setCountries] = useState<object[]>([]);
  const [dims, setDims] = useState({ w: 800, h: 600 });
  const [ready, setReady] = useState(false);

  // Responsive sizing via ResizeObserver
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      if (width > 0 && height > 0) setDims({ w: Math.round(width), h: Math.round(height) });
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Load countries GeoJSON for hexPolygons
  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson"
    )
      .then((r) => r.json())
      .then((d) => setCountries(d.features))
      .catch(() => {}); // silently skip if offline
  }, []);

  // Globe surface material — matches tinta/crema
  const globeMaterial = useMemo(() => {
    const mat = new MeshPhongMaterial({
      shininess: 6,
      transparent: false,
    });
    mat.color = new Color(isLight ? "#F7F6F3" : "#1f1e1d");
    return mat;
  }, [isLight]);

  // On globe ready: set initial POV + start auto-rotate
  const handleGlobeReady = useCallback(() => {
    setReady(true);
    const g = globeRef.current;
    if (!g) return;
    g.pointOfView({ lat: 15, lng: -50, altitude: 1.85 }, 0);
    const ctrl = g.controls();
    if (ctrl) {
      ctrl.autoRotate      = true;
      ctrl.autoRotateSpeed = 0.18;
      ctrl.enableZoom      = true;
      ctrl.minDistance     = 150;
      ctrl.maxDistance     = 600;
    }
  }, []);

  // Update globe material color when theme changes (after mount)
  useEffect(() => {
    if (!ready) return;
    const g = globeRef.current;
    if (!g) return;
    // Re-set material color — globeMaterial memo recreates the object
    // react-globe.gl picks up the new object via the prop change
  }, [isLight, ready]);

  const hexColor = isLight ? "rgba(31,30,29,0.18)" : "rgba(247,246,243,0.18)";
  const labelColor = isLight ? "rgba(31,30,29,0.7)" : "rgba(247,246,243,0.7)";
  const pointColor = "#6B87FF";

  return (
    <div
      ref={containerRef}
      style={{
        width:    "100%",
        height:   "100%",
        overflow: "hidden",
        background: "transparent",
        opacity: ready ? 1 : 0,
        transition: "opacity 600ms ease-out",
      }}
    >
      <Globe
        ref={globeRef as MutableRefObject<GlobeMethods>}
        width={dims.w}
        height={dims.h}
        backgroundColor="rgba(0,0,0,0)"
        showGlobe={true}
        globeMaterial={globeMaterial}
        showAtmosphere={false}
        showGraticules={false}
        onGlobeReady={handleGlobeReady}

        // Continent hexagons
        hexPolygonsData={countries}
        hexPolygonResolution={3}
        hexPolygonMargin={0.38}
        hexPolygonUseDots={true}
        hexPolygonColor={() => hexColor}

        // MX–US corridor arc
        arcsData={[CORRIDOR_ARC]}
        arcStartLat="startLat"
        arcStartLng="startLng"
        arcEndLat="endLat"
        arcEndLng="endLng"
        arcColor="color"
        arcDashLength={0.45}
        arcDashGap={0.25}
        arcDashInitialGap={0}
        arcDashAnimateTime={2800}
        arcStroke={1.4}
        arcAltitudeAutoScale={0.4}

        // Financial hub markers
        pointsData={CITIES}
        pointLat="lat"
        pointLng="lng"
        pointColor={() => pointColor}
        pointAltitude={0.01}
        pointRadius="size"
        pointLabel={(d) => `<span style="font-family:sans-serif;font-size:12px;color:#F7F6F3;background:#1f1e1d;padding:3px 7px;border-radius:3px">${(d as CityPoint).label}</span>`}
        onPointHover={(p) => onPointHover?.((p as CityPoint | null)?.name ?? null)}

        // Labels
        labelsData={CITIES}
        labelLat="lat"
        labelLng="lng"
        labelText="name"
        labelColor={() => labelColor}
        labelSize={0.42}
        labelAltitude={0.02}
        labelIncludeDot={false}
      />
    </div>
  );
}
