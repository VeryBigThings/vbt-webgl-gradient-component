import React, {useEffect, useRef} from 'react';
import {LinearGradientShader} from './viewer/linear_gradient/LinearGradientShader';
import {Color, Vector2} from 'three';

export type VBTWebGLLinerGradientComponentState = {};
export type VBTWebGLLinerGradientComponentProps = {
    app: LinearGradientShader;
    className?: string;
    aspectRatio: number;

    startPosition: string, // [1.0,2.0]
    endPosition: string,// [1.0,2.0]


    angle: number,
    useAngle: boolean,

    stops: string, // JSON string of array of numbers
    colors: string, // JSON string of array of strings (colors like #fff)

};

export function VBTWebGLLinerGradientComponent(props: VBTWebGLLinerGradientComponentProps) {
    const targetElRef = useRef<HTMLDivElement>();

    // This effect has no dependencies because we want it to run only
    // once. Maybe we should re-run it whenever any of deps changes,
    // but I'm not sure what effect it could have on the state of the
    // inner App
    useEffect(() => {
        const targetEl = targetElRef.current;
        // props.app.setImagesURLs(props.imagesURLs);
        if (props.app) {
            if(targetEl){
                // @ts-ignore
                targetEl.appendChild(props.app.getDOMElement());
            }
        }
        return () => {
            if (targetEl && props.app) {
                while (targetEl.firstChild) {
                    targetEl.removeChild(targetEl.lastChild);
                }
            }
        };
    }, []); // eslint-disable-line

    // useEffect(() => {
    //   const { width, height } = targetElRef.current.getBoundingClientRect();
    //   props.app.updateRendererSize(width, height);
    // }, [props.app, windowSize]);


    useEffect(() => {
        const targetEl = targetElRef.current;
        if (targetEl) {
            while (targetEl.firstChild) {
                targetEl.removeChild(targetEl.lastChild);
            }
            if(props.app) {
                // @ts-ignore
                targetEl.appendChild(props.app.getDOMElement());
            }
        }
        if(props.app) {

        }
    }, [props.app]);

    useEffect(() => {
        if(props.app) props.app.aspectRatio = props.aspectRatio;
    }, [props.aspectRatio]);

    useEffect(() => {
        if(props.app) props.app.setStartPosition(new Vector2().fromArray(JSON.parse(props.startPosition)));
    }, [props.startPosition]);

    useEffect(() => {
        if(props.app) props.app.setEndPosition(new Vector2().fromArray(JSON.parse(props.endPosition)));
    }, [props.endPosition]);

    useEffect(() => {
        if(props.app) props.app.setAngle(props.angle, props.useAngle);
    }, [props.angle, props.useAngle]);

    useEffect(() => {
        if(props.app) props.app.setStops(JSON.parse(props.stops));
    }, [props.stops]);

    useEffect(() => {
        if(props.app) props.app.setColors(JSON.parse(props.colors).map((color: string) => new Color(color)));
    }, [props.colors]);


    // We use padding-top to keep the div responsive. Please check the ratio, I've come
    // to 12 / 16 by experimenting, but maybe some other ratio could work better
    return (
        <div
            style={{
                width: '100%',
                height: '100%',
            }}
            className={props.className}
            ref={targetElRef}
        >

        </div>
    );
}
