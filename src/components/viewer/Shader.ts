import {ShaderMaterial, Uniform, Vector3} from 'three';
import {PlaneMaterialRenderer} from './PlaneMaterialRenderer';

export interface IUniformLibrary {
    [key: string]: Uniform
}

export class Shader extends PlaneMaterialRenderer {

    protected uniforms: IUniformLibrary = {};

    protected defines = {
        TEST_DEFINE: true
    };

    constructor(
        protected fragmentShader: string,
        protected vertexShader: string,
        uniforms: IUniformLibrary = {}
    ) {
        super()
        this.uniforms = {
            iTime: new Uniform(0),
            iResolution: new Uniform(new Vector3()),
            ...uniforms
        };
        const material = new ShaderMaterial({
            fragmentShader: this.fragmentShader,
            vertexShader: this.vertexShader,
            uniforms: this.uniforms,
            defines: this.defines,
            transparent: true
        });
        this.init(material);
    }


    update(time: number, width: number, height: number) {
        this.uniforms.iResolution.value.set(width, height, 1);
        this.uniforms.iTime.value = time;
    }
}