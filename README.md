# OhmLoom

OhmLoom is an interactive, web-based electronic circuit simulator designed for education and experimentation. It allows users to design, simulate, and analyze basic electronic circuits in a visual workspace.

## Features

- **Interactive Workspace:** Drag and drop components to build your circuit.
- **Orthogonal Wiring:** Connect components with cables. Hold `Shift` for orthogonal (straight) wires.
- **Circuit Simulation:** Real-time simulation using Modified Nodal Analysis (MNA).
- **Core Components:**
  - **Power Sources:** Batteries (adjustable voltage) and Ground.
  - **Passive Components:** Resistors (adjustable resistance) and LEDs.
- **Component Safety:** LEDs can burn out if they receive too much current, providing a realistic learning experience.
- **Live Analysis:** View current (mA) and power (W) for individual components.
- **Customizable Settings:** Adjust parameters like voltage, resistance, and LED forward voltage directly from the UI.
- **Automatic Joints:** Wires can be connected to other wires via automatically created joints.

## Getting Started

### Prerequisites

You only need a modern web browser to run OhmLoom.

### Running Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/Iskra-YT/ohm-loom.git
   ```
2. Open `index.html` in your favorite web browser.

## How to Use

1. **Adding Components:** Click on a component in the toolbox (left panel) to add it to the workspace.
2. **Moving:** Click and drag components to reposition them.
3. **Wiring:** Click on a component's terminal (small circular connection point) and then click on another terminal to connect them.
4. **Deleting:** Right-click on a component or cable to delete it. Alternatively, use the "Delete" button in the toolbox to clear the entire workspace.
5. **Simulation:** Click the "Play" (arrow) button to run the simulation and calculate circuit values.
6. **Adjusting Settings:** Select a component to see its specific settings in the side panel.

## Project Structure

- `index.html`: Main entry point and UI structure.
- `css/`: Stylesheets for the application.
- `js/`:
  - `app.js`: Main application logic, event handling, and rendering loop.
  - `toolbox.js`: Handles toolbox interactions and component placement.
  - `elements/`: Definitions for electronic components (Battery, Resistor, LED, etc.).
  - `draw/`: Rendering logic for the canvas.
  - `symulation/`: Circuit solver implementation using MNA.

## Technologies Used

- **HTML5 Canvas:** For high-performance circuit rendering.
- **JavaScript (ES6+):** Modular code structure.
- **Vanilla CSS:** Modern styling without external frameworks.
- **Material Symbols:** For intuitive UI icons.

## License

This project is licensed under the [LICENSE](LICENSE) file found in the root directory.
