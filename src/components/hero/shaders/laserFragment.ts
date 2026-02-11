/**
 * Laser fragment shader
 *
 * Creates laser beam with head/tail fade effects.
 * - Sharp attack at head (fadeFrom < 0.5)
 * - Exponential decay toward tail (fadeFrom >= 0.5)
 * - Core glow effect (brighter center)
 */
export const laserFragmentShader = `
precision mediump float;

uniform vec3 color;
uniform float intensity;
uniform float fadeFrom; // 0 for head, 1 for tail

varying vec2 vUv;

void main() {
  // Distance along laser (0 = head, 1 = tail)
  float dist = vUv.y;

  // Create sharp attack at head, exponential decay toward tail
  float alpha;
  if (fadeFrom < 0.5) {
    // Head fade: sharp at tip, fades back
    alpha = 1.0 - smoothstep(0.0, 0.3, dist);
  } else {
    // Tail fade: brighter at head, fades to tail
    alpha = exp(-dist * 3.0) * intensity;
  }

  // Core glow (brighter center)
  float core = 1.0 - abs(vUv.x - 0.5) * 2.0;
  core = pow(core, 2.0);

  gl_FragColor = vec4(color, alpha * core * intensity);
}
`.trim()
