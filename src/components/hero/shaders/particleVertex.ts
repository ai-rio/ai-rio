/**
 * Particle vertex shader
 *
 * Animates particles with velocity-based movement and pulse effects.
 * - Particles wrap around the scene bounds (+/- 5 units)
 * - Size pulses with sine wave based on phase
 * - Alpha pulses from 0.3 to 0.7
 */
export const particleVertexShader = `
attribute float size;
attribute float phase;
attribute vec3 velocity;
attribute vec3 color;

varying float vAlpha;
varying vec3 vColor;

uniform float time;

void main() {
  vec3 pos = position;

  // Apply velocity
  pos += velocity * time;

  // Wrap around
  pos = mod(pos + 5.0, 10.0) - 5.0;

  // Pulse size
  float pulse = sin(time * 2.0 + phase) * 0.5 + 0.5;

  // Project to screen space for size scaling
  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  // Scale size: base 80-200px, modulated by pulse and distance
  gl_PointSize = size * 4000.0 * (0.5 + pulse * 0.5) / -mvPosition.z;

  // Pulse alpha
  vAlpha = 0.3 + pulse * 0.5;

  // Pass color to fragment
  vColor = color;

  gl_Position = projectionMatrix * mvPosition;
}
`.trim()
