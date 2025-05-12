#!/bin/bash

#esbuild --bundle --format=esm --outdir=demo_widget/static src/gui/widget.js --asset-names=assets/[name] --loader:.png=dataurl
esbuild --bundle --format=esm --outdir=dist src/widget.js

cp src/widget.html dist/widget.html
cp -r node_modules/gui-circuit-generator/assets dist/assets
