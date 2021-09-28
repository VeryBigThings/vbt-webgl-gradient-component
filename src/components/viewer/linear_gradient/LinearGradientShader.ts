import {Shader} from '../Shader';
import {Color, Uniform, Vector2} from 'three';

export class LinearGradientShader extends Shader {
    private speed: number;
    private minValue: number;
    private maxValue: number;
    constructor() {
        super(
            require('./fragment.glsl'),
            require('./vertex.glsl'),
            {
                startPosition: new Uniform(new Vector2(0, 0)),
                endPosition: new Uniform(new Vector2(1, 1)),
                opacity: new Uniform(1),
                angle: new Uniform(0),
                useAngle: new Uniform(true),
                numberOfStops: new Uniform(1),
                stops: new Uniform([
                    0, 0, 0, 0,
                    0, 0, 0, 0,
                    0, 0, 0, 0,
                    0, 0, 0, 0,
                    0, 0, 0, 0,
                    0, 0, 0, 0,
                    0, 0, 0, 0,
                    0, 0, 0, 0]),
                colors: new Uniform([
                    new Color(), new Color(), new Color(), new Color(),
                    new Color(), new Color(), new Color(), new Color(),
                    new Color(), new Color(), new Color(), new Color(),
                    new Color(), new Color(), new Color(), new Color(),
                    new Color(), new Color(), new Color(), new Color(),
                    new Color(), new Color(), new Color(), new Color(),
                    new Color(), new Color(), new Color(), new Color(),
                    new Color(), new Color(), new Color(), new Color(),
                ]),
            });


        console.log('LinearGradientShader', this)
    }

    update(time: number, width: number, height: number) {
        super.update(time, width, height);

        if(this.speed) {
            const secondsNow = Date.now() / 1000;

            const sin = (1 + Math.sin(secondsNow * this.speed) ) / 2;
            const val = this.minValue + (this.maxValue - this.minValue) * sin;
            this.setOpacity(val)
        }
    }

    setStartPosition(startPosition: Vector2) {
        this.uniforms.startPosition.value.copy(startPosition);
    }

    setEndPosition(endPosition: Vector2) {
        this.uniforms.endPosition.value.copy(endPosition);
    }
    setOpacity(opacity: number) {
        this.uniforms.opacity.value = opacity;
    }

    setAngle(angle: number, useAngle?: boolean) {
        this.uniforms.angle.value = angle;
        if (useAngle === true || useAngle === false) {
            this.uniforms.useAngle.value = useAngle;
        }
    }

    setStops(stops: Array<number>) {
        this.uniforms.numberOfStops.value = stops.length;
        if (stops.length < 32) {
            for (; stops.length < 32;) {
                stops.push(0);
            }
        }
        this.uniforms.stops.value = stops;
    }

    setColors(colors: Array<Color>) {
        if (colors.length < 32) {
            for (; colors.length < 32;) {
                colors.push(new Color());
            }
        }
        this.uniforms.colors.value = colors;
    }

    setOpacityAnimation(speed: number, minValue: number, maxValue: number) {
        this.speed = speed;
        this.minValue = minValue;
        this.maxValue = maxValue;

    }
}