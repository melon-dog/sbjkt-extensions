const esbuild = require('esbuild');

esbuild.build({
	entryPoints: ['./src/sbjkt-extension.ts'],
	bundle: true,
	outfile: './dist/sbjkt-extension.js',
	platform: 'browser',
	target: 'es2015',
	minify: true,
}).catch(() => process.exit(1));