# jcircuit: Jupyter Circuit Designer
Uses QuCAT Circuit generator to create a Jupyter Notebook widget, using [AnyWidget](https://anywidget.dev/) and [esbuild](https://esbuild.github.io/).

## Conda Environment
You can create a conda environment with:
```bash
conda env create -y -f environment.yml
```
Activate the environment with:
```bash
conda activate jcircuit
```
The `jcircuit` environment has `npm` and `nodeenv`.

## npm Environment
You can create an npm environment with:
```bash
nodeenv node_env
# source node_env/bin/activate  # linux
# Windows is more complicated, but these 2 lines should work:
export NODE_VIRTUAL_ENV=${PWD}/node_env
export PATH=${NODE_VIRTUAL_ENV}/Scripts:${PATH}
```
Install the npm dependencies with:
```bash
npm install
```
## Build the Javascript module
You can build the Javascript module with:
```bash
npm run build
```
