/**
 * Particle fragment shader
 *
 * Creates circular particles with soft edge fade.
 * - Discards pixels outside the circle radius
 * - Applies alpha pulse from vertex shader
 * - Creates soft edge gradient
 */
export const particleFragmentShader = `
precision mediump float;

varying float vAlpha;
varying vec3 vColor;

void main() {
  // Create circular particle shape
  vec2 center = gl_PointCoord - 0.5;
  float dist = length(center);

  if (dist > 0.5) {
    discard;
  }

  // Soft edge fade with glow
  float alpha = (1.0 - smoothstep(0.2, 0.5, dist)) * vAlpha;

  // Use per-vertex color from attribute
  gl_FragColor = vec4(vColor, alpha);
}
`.trim()
