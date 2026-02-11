/**
 * Grid fragment shader
 *
 * Applies distance-based fade at edges and elevation-based brightness.
 * - Base alpha: 40% (0.4)
 * - Edge fade: smoothstep from 0.3 to 1.0 distance
 * - Elevation brightness: 0.5 + elevation * 0.5
 */
export const gridFragmentShader = `
precision mediump float;

uniform vec3 color;
varying vec2 vUv;
varying float vElevation;

void main() {
  // Distance fade at edges - wider visible area
  float distFromCenter = length(vUv - 0.5) * 2.0;
  float alpha = (1.0 - smoothstep(0.5, 1.0, distFromCenter)) * 0.6;

  // Elevation brightness - normalize to visible range
  float brightness = 0.6 + clamp(vElevation, -0.5, 0.5) * 0.8;

  gl_FragColor = vec4(color * brightness, alpha);
}
`.trim()
