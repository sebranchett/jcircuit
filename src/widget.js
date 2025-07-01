import { Circuit } from '../node_modules/gui-circuit-generator/src/domain/aggregates/Circuit.js';
import { CircuitService } from '../node_modules/gui-circuit-generator/src/application/CircuitService.js';
import { GUIAdapter } from '../node_modules/gui-circuit-generator/src/gui/adapters/GUIAdapter.js';

import {
  ElementRegistry,
  rendererFactory,
  GUICommandRegistry,
  setupCommands
} from "../node_modules/gui-circuit-generator/src/config/settings.js";


function render({ model, el }) {
    // Create control buttons using a helper function to reduce repetition
    function createButton(id, text) {
        const btn = document.createElement("button");
        btn.id = id;
        btn.textContent = text;
        return btn;
    }

    const resistorButton = createButton("addResistor", "Add Resistor");
    const wireButton = createButton("addWire", "Add Wire");
    const exportButton = createButton("export", "Export circuit");

    // Create and configure the canvas
    const canvas = document.createElement("canvas");
    canvas.id = "circuitCanvas";
    canvas.width = 800;
    canvas.height = 600;
    canvas.style.border = "1px solid black";

    // Create controls container and append buttons
    const controls = document.createElement("div");
    controls.className = "controls";
    controls.append(resistorButton, wireButton, exportButton);

    el.appendChild(controls);
    el.appendChild(canvas);

    // Set up the circuit and services
    const circuit = new Circuit();
    const circuitService = new CircuitService(circuit, ElementRegistry);

    const guiAdapter = new GUIAdapter(controls, canvas, circuitService, ElementRegistry, rendererFactory, GUICommandRegistry);

    // Wait for commands to be set up
    setupCommands(circuitService, guiAdapter.circuitRenderer).then(() => {
        guiAdapter.initialize();
    });

    // Export button event handler
    
    model.set("exportTrigger", 0);
    exportButton.addEventListener('click', () => {
        model.set("circuitElements", circuitService.getElements());
        model.set("exportTrigger", model.get("exportTrigger") + 1);
        model.save_changes();
    });

}

export default { render };
