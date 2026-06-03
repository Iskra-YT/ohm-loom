export const defaultSets = {
    "simple-led": {
        "elements": [
            { "type": "Battery", "id": 0, "x": 460, "y": 220, "voltage": 9 },
            { "type": "Resistor", "id": 1, "x": 660, "y": 220, "resistance": 470 },
            { "type": "LED", "id": 2, "x": 860, "y": 220 },
            { "type": "Ground", "id": 3, "x": 460, "y": 420 },
            { "type": "Joint", "id": 4, "x": 860, "y": 420 }
        ],
        "cables": [
            { "from": { "elementId": 0, "terminalIndex": 0 }, "to": { "elementId": 1, "terminalIndex": 0 } },
            { "from": { "elementId": 1, "terminalIndex": 1 }, "to": { "elementId": 2, "terminalIndex": 0 } },
            { "from": { "elementId": 2, "terminalIndex": 1 }, "to": { "elementId": 4, "terminalIndex": 0 } },
            { "from": { "elementId": 4, "terminalIndex": 0 }, "to": { "elementId": 3, "terminalIndex": 0 } },
            { "from": { "elementId": 3, "terminalIndex": 0 }, "to": { "elementId": 0, "terminalIndex": 1 } }
        ]
    },
    "parallel-leds": {
        "elements": [
            { "type": "Battery", "id": 0, "x": 460, "y": 320, "voltage": 12 },
            { "type": "Joint", "id": 1, "x": 560, "y": 320 },
            { "type": "Resistor", "id": 2, "x": 660, "y": 220, "resistance": 1000 },
            { "type": "Resistor", "id": 3, "x": 660, "y": 420, "resistance": 1000 },
            { "type": "LED", "id": 4, "x": 860, "y": 220 },
            { "type": "LED", "id": 5, "x": 860, "y": 420 },
            { "type": "Joint", "id": 6, "x": 960, "y": 220 },
            { "type": "Joint", "id": 7, "x": 960, "y": 420 },
            { "type": "Ground", "id": 8, "x": 460, "y": 520 }
        ],
        "cables": [
            { "from": { "elementId": 0, "terminalIndex": 0 }, "to": { "elementId": 1, "terminalIndex": 0 } },
            { "from": { "elementId": 1, "terminalIndex": 0 }, "to": { "elementId": 2, "terminalIndex": 0 } },
            { "from": { "elementId": 1, "terminalIndex": 0 }, "to": { "elementId": 3, "terminalIndex": 0 } },
            { "from": { "elementId": 2, "terminalIndex": 1 }, "to": { "elementId": 4, "terminalIndex": 0 } },
            { "from": { "elementId": 3, "terminalIndex": 1 }, "to": { "elementId": 5, "terminalIndex": 0 } },
            { "from": { "elementId": 4, "terminalIndex": 1 }, "to": { "elementId": 6, "terminalIndex": 0 } },
            { "from": { "elementId": 5, "terminalIndex": 1 }, "to": { "elementId": 7, "terminalIndex": 0 } },
            { "from": { "elementId": 6, "terminalIndex": 0 }, "to": { "elementId": 7, "terminalIndex": 0 } },
            { "from": { "elementId": 7, "terminalIndex": 0 }, "to": { "elementId": 8, "terminalIndex": 0 } },
            { "from": { "elementId": 8, "terminalIndex": 0 }, "to": { "elementId": 0, "terminalIndex": 1 } }
        ]
    },
    "rc-circuit": {
        "elements": [
            { "type": "Battery", "id": 0, "x": 460, "y": 270, "voltage": 10 },
            { "type": "Joint", "id": 1, "x": 460, "y": 170 },
            { "type": "Resistor", "id": 2, "x": 660, "y": 170, "resistance": 10000 },
            { "type": "PolarizedCapacitor", "id": 3, "x": 860, "y": 170, "capacitance": 0.0001 },
            { "type": "Joint", "id": 4, "x": 860, "y": 470 },
            { "type": "Ground", "id": 5, "x": 460, "y": 470 }
        ],
        "cables": [
            { "from": { "elementId": 0, "terminalIndex": 0 }, "to": { "elementId": 1, "terminalIndex": 0 } },
            { "from": { "elementId": 1, "terminalIndex": 0 }, "to": { "elementId": 2, "terminalIndex": 0 } },
            { "from": { "elementId": 2, "terminalIndex": 1 }, "to": { "elementId": 3, "terminalIndex": 0 } },
            { "from": { "elementId": 3, "terminalIndex": 1 }, "to": { "elementId": 4, "terminalIndex": 0 } },
            { "from": { "elementId": 4, "terminalIndex": 0 }, "to": { "elementId": 5, "terminalIndex": 0 } },
            { "from": { "elementId": 5, "terminalIndex": 0 }, "to": { "elementId": 0, "terminalIndex": 1 } }
        ]
    },
    "voltage-divider": {
        "elements": [
            { "type": "Battery", "id": 0, "x": 460, "y": 270, "voltage": 12 },
            { "type": "Joint", "id": 1, "x": 560, "y": 270 },
            { "type": "Resistor", "id": 2, "x": 660, "y": 220, "resistance": 1000 },
            { "type": "Resistor", "id": 3, "x": 660, "y": 370, "resistance": 1000 },
            { "type": "Joint", "id": 4, "x": 660, "y": 520 },
            { "type": "Ground", "id": 5, "x": 660, "y": 520 }
        ],
        "cables": [
            { "from": { "elementId": 0, "terminalIndex": 0 }, "to": { "elementId": 1, "terminalIndex": 0 } },
            { "from": { "elementId": 1, "terminalIndex": 0 }, "to": { "elementId": 2, "terminalIndex": 0 } },
            { "from": { "elementId": 2, "terminalIndex": 1 }, "to": { "elementId": 3, "terminalIndex": 0 } },
            { "from": { "elementId": 3, "terminalIndex": 1 }, "to": { "elementId": 4, "terminalIndex": 0 } },
            { "from": { "elementId": 4, "terminalIndex": 0 }, "to": { "elementId": 5, "terminalIndex": 0 } },
            { "from": { "elementId": 5, "terminalIndex": 0 }, "to": { "elementId": 0, "terminalIndex": 1 } }
        ]
    },
    "capacitor-test": {
        "elements": [
            { "type": "Battery", "id": 0, "x": 460, "y": 270, "voltage": 9 },
            { "type": "Joint", "id": 1, "x": 560, "y": 270 },
            { "type": "Capacitor", "id": 2, "x": 660, "y": 270, "capacitance": 0.0001 },
            { "type": "Resistor", "id": 3, "x": 660, "y": 420, "resistance": 1000 },
            { "type": "Ground", "id": 4, "x": 460, "y": 470 }
        ],
        "cables": [
            { "from": { "elementId": 0, "terminalIndex": 0 }, "to": { "elementId": 1, "terminalIndex": 0 } },
            { "from": { "elementId": 1, "terminalIndex": 0 }, "to": { "elementId": 2, "terminalIndex": 0 } },
            { "from": { "elementId": 2, "terminalIndex": 1 }, "to": { "elementId": 3, "terminalIndex": 0 } },
            { "from": { "elementId": 3, "terminalIndex": 1 }, "to": { "elementId": 4, "terminalIndex": 0 } },
            { "from": { "elementId": 4, "terminalIndex": 0 }, "to": { "elementId": 0, "terminalIndex": 1 } }
        ]
    }
};
