import { CircuitUIFactory } from '../node_modules/gui-circuit-generator/src/gui/components/CircuitUIFactory.js';
import { CircuitAppManager } from '../node_modules/gui-circuit-generator/src/gui/components/CircuitAppManager.js';

function render({ model, el }) {
    // Apply standard styles
    CircuitUIFactory.applyStandardStyles();

    // Create the complete circuit interface
    const ui = CircuitUIFactory.createCircuitInterface(el, {
        canvas: {
            style: { border: "1px solid black" } // Widget-specific styling
        }
    });

    // Initialize the circuit application
    const appManager = new CircuitAppManager({
        model: model
    });

    // Initialize the application
    appManager.initialize(ui.controls, ui.canvas);
}

export default { render };
