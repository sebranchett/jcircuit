import { Circuit } from '../node_modules/gui-circuit-generator/src/domain/aggregates/Circuit.js';
import { CircuitService } from '../node_modules/gui-circuit-generator/src/application/CircuitService.js';
import { GUIAdapter } from '../node_modules/gui-circuit-generator/src/gui/adapters/GUIAdapter.js';
import { ElementRegistry, rendererFactory, GUICommandRegistry  }   from '../node_modules/gui-circuit-generator/src/config/settings.js'; // Assuming ElementRegistry is configured in settings.js
// import document from 'document'; // Assuming document is a global object


function render({ model, el }) {
    let resistorButton = document.createElement("button");
    resistorButton.id = "addResistor";
    resistorButton.textContent = "Add Resistor";
    let wireButton = document.createElement("button");
    wireButton.id = "addWire";
    wireButton.textContent = "Add Wire";
    let exportButton = document.createElement("button");
    exportButton.id = "export";
    exportButton.textContent = "Export circuit";
    let canvas = document.createElement("canvas");
    canvas.id = 'circuitCanvas';
    canvas.width = 800;
    canvas.height = 600;
    canvas.style.border = '1px solid black';

    let controlsContainer = document.createElement("div");
    controlsContainer.className = "controls";
    controlsContainer.appendChild(resistorButton);
    controlsContainer.appendChild(wireButton);
    controlsContainer.appendChild(exportButton);

    el.appendChild(controlsContainer);
    el.appendChild(canvas);

    // Set up the circuit and services
    const circuit = new Circuit();
    const circuitService = new CircuitService(circuit, ElementRegistry);


    console.log('ElementRegistry:', ElementRegistry);
    console.log('rendererFactory:', rendererFactory);
    console.log('GUICommandRegistry:', GUICommandRegistry);

    // We already have the canvas created above
    console.log('Canvas:', canvas);

    // Create and initialize the GUI Adapter
    const guiAdapter = new GUIAdapter(controlsContainer, canvas, circuitService, ElementRegistry, rendererFactory, GUICommandRegistry);
    guiAdapter.initialize();

    // Export button event handler
    
    model.set("exportTrigger", 0);
    exportButton.addEventListener('click', () => {
        model.set("circuitElements", circuitService.getElements());
        model.set("exportTrigger", model.get("exportTrigger") + 1);
        model.save_changes();
    });

}

export default { render };
