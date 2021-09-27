# vbt-webgl-gradient-component

### How to run repo:

```
npm i
npm run start
```


### How to install the  component
```bash
$ npm install @verybigthings/vbt-webgl-gradient-component
```

### Check file App.tsx to see an example how to use the component.
Component needs next props as an input:
```typescript
type VBTWebGLLinerGradientComponentProps = {
    app: LinearGradientShader; // Instance of an app
    className?: string;
    aspectRatio: number; // Aspect ratio for the canvas, if 0 -- canvas fits all parent size

    startPosition: string, // [0.0, 0.0] // Linear Gradient option of the start position in coordinates 0..1, 0..1
    endPosition: string,// [1.0,1.0] // Linear Gradient option of the end position in coordinates 0..1, 0..1

    opacity: number, // Opacity of this canvas (Not HTML, but is used in WebGL shader)

    angle: number, // Angle of gradient rotation of gradient
    useAngle: boolean, // Should angle be used from angle parameter, if false -- angle calculated from position options

    stops: string, // JSON string of array of numbers
    colors: string, // JSON string of array of strings (colors like #fff)
};
```
You can also destroy (dispose all GPU memory data of single instance) just calling: 
```typescript
const app = new LinearGradientShader();
app.destroy();
```
To control the size of the viewer, just change CSS style of div, that surrounds `VBTWebGLLinerGradientComponent`:
```typescript jsx
<div style={{
    width: "400px",
    height: "400px",
    position: "absolute",
    top: "60px",
    left: "60px",
}}>
    <VBTWebGLLinerGradientComponent
        app={this.state.app}
        aspectRatio={0.66}
        startPosition={'[0.0,0.0]'}
        endPosition={'[0.8,0.8]'}
        opacity={1}
        angle={1.1344}
        useAngle={true}
        stops={'[0.13, 0.33, 0.66, 0.99]'}
        colors={'["#EB3860", "#E82D5A", "#E43B3B", "#FFC224"]'}
    />
</div>
```


## Example of transforming gradient from SVG to component options

```svg
<svg width="100%" height="100%" class="gradiant" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="yellow-orange-pink-gradient-background-effect" gradientTransform="rotate(65)">
      <stop offset="13%" stop-color="#EB3860" stop-opacity="0">
        <animate attributeName="stop-opacity" values="0; 0.1; 0.25; 0.4; 0.6; 0.85; 0.90; 0.93; 1; 0.9; 0.75; 0.5; 0.25; 0" dur="8s" repeatCount="indefinite">
        </animate>
      </stop>
      <stop offset="33%" stop-color="#E82D5A" stop-opacity="0">
        <animate attributeName="stop-opacity" values="0; 0.1; 0.25; 0.4; 0.6; 0.85; 0.90; 0.93; 1; 0.9; 0.75; 0.5; 0.25; 0" dur="8s" repeatCount="indefinite">
        </animate>
      </stop>
      <stop offset="66%" stop-color="#E43B3B" stop-opacity="0">
        <animate attributeName="stop-opacity" values="0; 0.1; 0.25; 0.4; 0.6; 0.85; 0.90; 0.93; 1; 0.9; 0.75; 0.5; 0.25; 0" dur="8s" repeatCount="indefinite">
        </animate>
      </stop>
      <stop offset="99%" stop-color="#FFC224" stop-opacity="0">
        <animate attributeName="stop-opacity" values="0; 0.1; 0.25; 0.4; 0.6; 0.85; 0.90; 0.93; 1; 0.9; 0.75; 0.5; 0.25; 0" dur="8s" repeatCount="indefinite">
        </animate>
      </stop>
    </linearGradient>
  </defs>
  <g>
    <rect x="0" y="0" width="100%" height="100%" fill="url('#yellow-orange-pink-gradient-background-effect')" />
  </g>
</svg>
```

* Here use positions as default:
```
startPosition={'[0.0,0.0]'}
endPosition={'[0.8,0.8]'}
```
* Angle take from svg code `gradientTransform="rotate(65)"`, transform to radians: `65 / 180 * 3.1415926`
```
angle={1.1344}
useAngle={true}
```
* Stop offsets can be took from `offset` param from svg (In this example 13%, 33%, 64%, 99%)
```
stops={'[0.13, 0.33, 0.66, 0.99]'}
```
* Colors for every stop you can find in `stop-color` options from svg.
```
colors={'["#EB3860", "#E82D5A", "#E43B3B", "#FFC224"]'}
```
* To animate opacity you can set opacity value every frame (or using setInterval)
```
opacity={1}
```