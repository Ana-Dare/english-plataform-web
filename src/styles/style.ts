import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
*, *::before, *::after {
	box-sizing: border-box;
}

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}

/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}

html {
	font-size: 16px;
	-webkit-text-size-adjust: 100%;
	text-size-adjust: 100%;
	scroll-behavior: smooth;
}

body {
	line-height: 1.5;
	font-family: "Rubik", sans-serif;
	font-size: 1rem;
	color: #1F2B45;
	background-color: #f7f7f8;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	overflow-x: hidden;
}

h1, h2, h3, h4, h5, h6 {
	font-family: "Rubik", sans-serif;
	line-height: 1.3;
	overflow-wrap: break-word;
	text-wrap: balance;
}

h1 {
	font-size: clamp(1.5rem, 2vw + 1rem, 2.25rem);
	line-height: 1.25;
}

h2 {
	font-size: clamp(1.25rem, 1.5vw + 0.95rem, 1.75rem);
	line-height: 1.3;
}

h3 {
	font-size: clamp(1.125rem, 1vw + 0.875rem, 1.5rem);
	line-height: 1.35;
}

p {
	line-height: 1.5;
	overflow-wrap: break-word;
}

button, input, select, textarea {
	font-family: "Rubik", sans-serif;
	font-size: 1rem;
	line-height: 1.5;
}

img, picture, video, canvas, svg {
	max-width: 100%;
}

ol, ul {
	list-style: none;
}

blockquote, q {
	quotes: none;
}

blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}

table {
	border-collapse: collapse;
	border-spacing: 0;
}
`;

export default GlobalStyle;
