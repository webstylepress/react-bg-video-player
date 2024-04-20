/* eslint-disable react/prop-types */
import { useRef, useEffect, useState } from 'react';
import './VideoBg.css';
function VideoBg({
	videoFile,
	videoFileOgg,
	videoFileWebm,
	videoPoster,
	darken = true,
	fullScreen = true,
	autoPlay = true,
	loop = true,
	muted = true,
	overlay = true,
	OverlayTopOffset = 0,
	caption = '',
	description = '',
	AriaLabel,
}) {
	const videoRef = useRef(null);
	const [isIntersecting, setIntersecting] = useState(false);
	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIntersecting(true);
					observer.unobserve(entry.target);
				} else {
					setIntersecting(false);
				}
			},
			{
				rootMargin: '50px',
				threshold: 0.01,
			},
		);
		const currentElement = videoRef.current;
		if (currentElement) {
			observer.observe(currentElement);
		}
		return () => {
			if (currentElement) {
				observer.unobserve(currentElement);
			}
		};
	}, []);
	return (
		<div
			className={`
				videobg-container 
				${fullScreen ? 'full-screen' : ''} 
				${darken ? 'darken' : ''}
			`}
			ref={videoRef}>
			{overlay && (
				<div
					className='overlay'
					style={
						OverlayTopOffset !== 0 ? { paddingTop: OverlayTopOffset } : {}
					}>
					{caption && <h1>{caption}</h1>}
					{description && <p>{description}</p>}
				</div>
			)}
			{isIntersecting && (
				<video
					{...(AriaLabel ? { 'aria-label': AriaLabel } : {})}
					autoPlay={autoPlay}
					loop={loop}
					muted={muted}
					poster={videoPoster}
					className='video-element'>
					<source src={videoFile} type='video/mp4' />
					{videoFileWebm && <source src={videoFileWebm} type='video/webm' />}
					{videoFileOgg && <source src={videoFileOgg} type='video/ogg' />}
					Your browser does not support the video tag.
				</video>
			)}
		</div>
	);
}

export default VideoBg;
