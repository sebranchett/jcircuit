import {
    initializeCircuitApp,
    createStyles,
    createCircuitDOM } from '../node_modules/gui-circuit-generator/src/gui/common.js';

async function render({ model, el }) {
    // Inject styles first
    const style = createStyles();
    el.appendChild(style);

    // Create DOM structure
    const { stage, canvas, controls } = createCircuitDOM();
    el.appendChild(stage);

    // Initialize the circuit application
    await initializeCircuitApp(stage, canvas, controls);
}

export default { render };
