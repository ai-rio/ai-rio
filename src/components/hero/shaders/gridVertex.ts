/**
 * Grid vertex shader
 *
 * Creates sinusoidal wave deformation on the grid mesh.
 * - Primary wave: radial from center, 0.8 time multiplier, amplitude +/-0.3
 * - Secondary wave: directional, 0.5 time multiplier, amplitude +/-0.15
 */
export const gridVertexShader = `
uniform float time;
varying vec2 vUv;
varying float vElevation;

void main() {
  vUv = uv;

  vec3 pos = position;

  // Primary wave - radial from center
  float dist = length(pos.xz);
  float wave1 = sin(dist * 2.0 - time * 0.8) * 0.3;

  // Secondary wave - directional
  float wave2 = sin(pos.x * 1.5 + pos.z * 1.5 + time * 0.5) * 0.15;

  pos.y += wave1 + wave2;
  vElevation = pos.y;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`.trim()
