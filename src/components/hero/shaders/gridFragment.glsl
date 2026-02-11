uniform vec3 color;
varying vec2 vUv;
varying float vElevation;

void main() {
  // Distance fade at edges
  float distFromCenter = length(vUv - 0.5) * 2.0;
  float alpha = (1.0 - smoothstep(0.3, 1.0, distFromCenter)) * 0.12;

  // Elevation brightness
  float brightness = 0.5 + vElevation * 0.5;

  gl_FragColor = vec4(color * brightness, alpha);
}
