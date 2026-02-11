varying vec2 vUv;
varying float vElevation;

uniform float time;

void main() {
  vUv = uv;

  vec3 pos = position;

  // Primary wave - radial from center
  float dist = length(pos.xy);
  float wave1 = sin(dist * 2.0 - time * 0.8) * 0.15;

  // Secondary wave - directional
  float wave2 = sin(pos.x * 1.5 + pos.y * 1.5 + time * 0.5) * 0.08;

  pos.z += wave1 + wave2;
  vElevation = pos.z;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
