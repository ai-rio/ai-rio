/**
 * Laser vertex shader
 *
 * Passes UV coordinates and length to fragment shader
 * for gradient fade effects along the laser beam.
 */
export const laserVertexShader = `
varying vec2 vUv;
varying float vLength;

void main() {
  vUv = uv;
  vLength = position.y; // Store length for fragment shader

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`.trim()
