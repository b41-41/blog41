'use client';

import { useEffect, useRef, useState } from 'react';
import { createNoise3D } from 'simplex-noise';


interface ColorfulCanvasProps {
	palette: number[][][];
	speed: number;
	scale: number;
	resolution: number;
	fadeInTime: number;
	animate: boolean;
}

const lerp = (x: number, x1: number, x2: number, y1: number, y2: number) => y1 + (x - x1) * ((y2 - y1) / (x2 - x1));

const getPixel = (noise: number, time: number, palette: number[][][]) => {
  const paletteEvolution = Math.sin(((time % 3600) / 10) * (Math.PI / 180));

  let rgb = [];

  for (let i = 0; i < 3; i++) {
    rgb.push(
      lerp(
        Math.abs(noise),
        0,
        1,
        lerp(paletteEvolution, -1, 1, palette[0][0][i], palette[1][0][i]),
        lerp(paletteEvolution, -1, 1, palette[0][1][i], palette[1][1][i])
      )
    );
  }
  return rgb;
};

const ColorfulCanvas = ({
	palette,
	speed,
	scale,
	resolution,
	fadeInTime,
	animate
}: ColorfulCanvasProps) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const tRef = useRef(0);
	const rafRef = useRef<number>(0);
	const simplex = useRef(createNoise3D());
  
	useEffect(() => {
	  const frame = () => {
		const framePalette: number[][][] = [
		  [[0, 0, 0], [0, 0, 0]],
		  [[0, 0, 0], [0, 0, 0]]
		];
  
		if (tRef.current <= fadeInTime) {
		  for (let i = 0; i < 2; i++) {
			for (let j = 0; j < 2; j++) {
			  for (let k = 0; k < 3; k++) {
				framePalette[i][j][k] = lerp(
				  tRef.current,
				  0,
				  fadeInTime,
				  0,
				  palette[i][j][k]
				);
			  }
			}
		  }
		} else {
		  framePalette[0] = [...palette[0]];
		  framePalette[1] = [...palette[1]];
		}
  
		const ctx = canvasRef.current?.getContext("2d");
		if (!ctx) return;
		
		const imageData = ctx.createImageData(resolution, resolution);
		if (!imageData) return;
  
		for (let x = 0; x < resolution; x++) {
		  for (let y = 0; y < resolution; y++) {
			const i = (x + y * resolution) * 4;
			const noise = simplex?.current(
			  x / scale,
			  y / scale,
			  tRef.current / (1000 / speed)
			);
			if (noise === undefined) continue;
			
			const pixel = getPixel(noise, tRef.current, framePalette);
			imageData.data[i] = pixel[0];
			imageData.data[i + 1] = pixel[1];
			imageData.data[i + 2] = pixel[2];
			imageData.data[i + 3] = 255;
		  }
		}
  
		ctx.putImageData(imageData, 0, 0);
		tRef.current++;
		rafRef.current = requestAnimationFrame(frame);
	  };
  
	  if (animate) {
		rafRef.current = requestAnimationFrame(frame);
	  } else {
		cancelAnimationFrame(rafRef.current);
	  }
  
	  return () => cancelAnimationFrame(rafRef.current);
	}, [simplex, palette, speed, scale, resolution, fadeInTime, animate]);

	const [dimensions, setDimensions] = useState([0, 0]);

	useEffect(() => {
	  const handleResize = () =>
		setDimensions([window.innerWidth, window.innerHeight]);
	  handleResize();
	  window.addEventListener("resize", handleResize);
	  return () => window.removeEventListener("resize", handleResize);
	}, []);

  
	return (
	  <canvas
		ref={canvasRef}
		className="fixed top-0 left-0 z-0 m-0 p-0"
		style={{
		  width: `${dimensions[0]}px`,
		  height: `${dimensions[1]}px`
		}}
		width={`${resolution}px`}
		height={`${resolution}px`}
	  />
	);
  };

export default ColorfulCanvas;