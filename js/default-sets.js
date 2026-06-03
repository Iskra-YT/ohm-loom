export const defaultSets = {
    "simple-led": {
        "elements": [
            { "type": "Battery", "id": 0, "x": 100, "y": 100, "voltage": 9 },
            { "type": "Resistor", "id": 1, "x": 250, "y": 100, "resistance": 470 },
            { "type": "LED", "id": 2, "x": 400, "y": 100 },
            { "type": "Ground", "id": 3, "x": 100, "y": 300 }
        ],
        "cables": [
            { "from": { "elementId": 0, "terminalIndex": 0 }, "to": { "elementId": 1, "terminalIndex": 0 } },
            { "from": { "elementId": 1, "terminalIndex": 1 }, "to": { "elementId": 2, "terminalIndex": 0 } },
            { "from": { "elementId": 2, "terminalIndex": 1 }, "to": { "elementId": 3, "terminalIndex": 0 } },
            { "from": { "elementId": 3, "terminalIndex": 0 }, "to": { "elementId": 0, "terminalIndex": 1 } }
        ]
    },
    "voltage-divider": {
        "elements": [
            { "type": "Battery", "id": 0, "x": 100, "y": 150, "voltage": 12 },
            { "type": "Resistor", "id": 1, "x": 300, "y": 100, "resistance": 1000 },
            { "type": "Resistor", "id": 2, "x": 300, "y": 250, "resistance": 1000 },
            { "type": "Ground", "id": 3, "x": 300, "y": 400 }
        ],
        "cables": [
            { "from": { "elementId": 0, "terminalIndex": 0 }, "to": { "elementId": 1, "terminalIndex": 0 } },
            { "from": { "elementId": 1, "terminalIndex": 1 }, "to": { "elementId": 2, "terminalIndex": 0 } },
            { "from": { "elementId": 2, "terminalIndex": 1 }, "to": { "elementId": 3, "terminalIndex": 0 } },
            { "from": { "elementId": 3, "terminalIndex": 0 }, "to": { "elementId": 0, "terminalIndex": 1 } }
        ]
    },
    "capacitor-test": {
        "elements": [
            { "type": "Battery", "id": 0, "x": 100, "y": 150, "voltage": 9 },
            { "type": "Capacitor", "id": 1, "x": 300, "y": 150, "capacitance": 0.0001 },
            { "type": "Resistor", "id": 2, "x": 300, "y": 300, "resistance": 1000 },
            { "type": "Ground", "id": 3, "x": 100, "y": 350 }
        ],
        "cables": [
            { "from": { "elementId": 0, "terminalIndex": 0 }, "to": { "elementId": 1, "terminalIndex": 0 } },
            { "from": { "elementId": 1, "terminalIndex": 1 }, "to": { "elementId": 2, "terminalIndex": 0 } },
            { "from": { "elementId": 2, "terminalIndex": 1 }, "to": { "elementId": 3, "terminalIndex": 0 } },
            { "from": { "elementId": 3, "terminalIndex": 0 }, "to": { "elementId": 0, "terminalIndex": 1 } }
        ]
    }
};
