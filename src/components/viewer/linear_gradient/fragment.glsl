uniform float iTime;
uniform vec3 iResolution;

uniform vec2 startPosition;
uniform vec2 endPosition;
uniform float angle;
uniform bool useAngle;
uniform int numberOfStops;
uniform float stops[32];
uniform vec3 colors[32];

varying vec2 vUv;


void main(){
    vec2 uv = vUv;
    uv.y = (uv.y - 1.0) * -1.0;

    float alpha;
    if (useAngle) {
        alpha = angle;
    }
    else {
        float alpha = atan(
        endPosition.y - startPosition.y,
        endPosition.x - startPosition.x
        );// this is the angle of the gradient in rad
    }

    float cos_alpha = cos(-alpha);
    float sin_alpha = sin(-alpha);

    float gradient_startpos_rotated_x = startPosition.x * cos_alpha - startPosition.y * sin_alpha;
    float gradient_endpos_rotated_x = endPosition.x * cos_alpha - endPosition.y * sin_alpha;
    float len = gradient_endpos_rotated_x - gradient_startpos_rotated_x;
    float x_loc_rotated = uv.x * cos(-alpha) - uv.y * sin_alpha;

    if (numberOfStops == 1) {
        gl_FragColor = vec4(colors[0], 1.0);
    } else if (numberOfStops > 1) {
        gl_FragColor = mix(vec4(colors[0], 1.0), vec4(colors[1], 1.0), smoothstep(
        gradient_startpos_rotated_x + stops[0] * len,
        gradient_startpos_rotated_x + stops[1] * len,
        x_loc_rotated
        ));
        for (int i = 1; i < 32 - 1; i++) {
            if (i < numberOfStops - 1) {
                gl_FragColor = mix(gl_FragColor, vec4(colors[i + 1], 1.0), smoothstep(
                gradient_startpos_rotated_x + stops[i] * len,
                gradient_startpos_rotated_x + stops[i + 1] * len,
                x_loc_rotated
                ));
            } else { break; }
        }
    }
    gl_FragColor = gl_FragColor;
}