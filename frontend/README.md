# VectorShift Frontend Technical Assessment

A modern, feature-rich pipeline editor built with React and React Flow, featuring node abstraction, dynamic text processing, and backend integration for DAG analysis.

![Pipeline Editor](https://img.shields.io/badge/React-18.x-blue) ![React Flow](https://img.shields.io/badge/React%20Flow-11.x-purple) ![Status](https://img.shields.io/badge/Status-Complete-success)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Architecture](#architecture)
- [Node Types](#node-types)
- [Usage Guide](#usage-guide)
- [Testing](#testing)
- [Project Structure](#project-structure)

---

## 🎯 Overview

This project is a complete implementation of the VectorShift Frontend Technical Assessment, featuring a visual pipeline editor where users can:

- Create and connect various node types to build data processing pipelines
- Dynamically resize text nodes based on content
- Parse variables in text nodes to create dynamic input handles
- Submit pipelines to a backend for DAG (Directed Acyclic Graph) analysis
- View results in a professional, custom-styled modal

**All 4 parts of the assessment have been completed:**
1. ✅ Node Abstraction with 5 new custom nodes
2. ✅ Modern dark-theme styling
3. ✅ Text Node with auto-resize and variable detection
4. ✅ Backend integration with DAG analysis

---

## ✨ Features

### 🧩 Node Abstraction
- **BaseNode Component**: Reusable abstraction for all node types
- **9 Node Types**: Input, Output, LLM, Text, API, Database, Transform, Note, Integration
- **Consistent Styling**: All nodes inherit dark theme and layout from BaseNode
- **Easy Extensibility**: Create new nodes by simply defining handles and content

### 🎨 Modern UI/UX
- **Dark Theme**: Professional dark mode aesthetic throughout
- **Smooth Animations**: Hover effects, transitions, and modal animations
- **Responsive Layout**: Full-screen canvas with toolbar and controls
- **Custom Components**: Styled MiniMap and Controls matching the theme

### 🔤 Smart Text Node
- **Auto-Resize**: Width (240px-600px) and height adjust dynamically as you type
- **Variable Detection**: Type `{{ variableName }}` to create input handles automatically
- **Validation**: Only valid JavaScript variable names create handles
- **Duplicate Prevention**: Multiple instances of the same variable create only one handle

### 🔗 Backend Integration
- **Pipeline Submission**: Send nodes and edges to FastAPI backend
- **DAG Analysis**: Backend calculates node count, edge count, and DAG status
- **Custom Modal**: Professional results display with color-coded status
- **Error Handling**: Graceful error messages for connection issues

### 🎛️ Additional Features
- **Node Deletion**: Select and press Delete key to remove nodes
- **Drag & Drop**: Intuitive node placement from toolbar
- **Edge Connections**: Animated, smooth-step edges with arrows
- **Grid Snapping**: 20px grid for precise alignment

---

## 🛠️ Tech Stack

**Frontend:**
- React 18.x
- React Flow 11.x (visual node editor)
- Zustand (state management)
- CSS3 (custom dark theme)

**Backend:**
- Python 3.x
- FastAPI (REST API)
- NetworkX (graph analysis)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 14+ and npm
- Python 3.8+

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/KaranJangid8656/VectorShift-Frontend-Assessment.git
   cd VectorShift-Frontend-Assessment
   ```

2. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd ../backend
   pip install fastapi uvicorn networkx
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   uvicorn main:app --reload
   ```
   Backend will run on `http://127.0.0.1:8000`

2. **Start the frontend development server** (in a new terminal)
   ```bash
   cd frontend
   npm start
   ```
   Frontend will open at `http://localhost:3000`

---

## 🏗️ Architecture

### Component Hierarchy

```
App
├── PipelineToolbar (9 draggable node buttons)
├── PipelineUI (React Flow canvas)
│   ├── BaseNode (abstraction)
│   │   ├── InputNode
│   │   ├── OutputNode
│   │   ├── LLMNode
│   │   ├── TextNode
│   │   ├── ApiNode
│   │   ├── DatabaseNode
│   │   ├── TransformationNode
│   │   ├── NoteNode
│   │   └── IntegrationNode
│   ├── Background
│   ├── Controls
│   └── MiniMap
└── SubmitButton (with custom modal)
```

### State Management

**Zustand Store** (`store.js`):
- `nodes`: Array of all nodes on canvas
- `edges`: Array of all connections
- `getNodeID`: Generate unique IDs
- `addNode`: Add new node to canvas
- `onNodesChange`: Handle node updates/deletions
- `onEdgesChange`: Handle edge updates/deletions
- `onConnect`: Create new edge connections
- `updateNodeField`: Update node data

---

## 📦 Node Types

| Node | Inputs | Outputs | Description |
|------|--------|---------|-------------|
| **Input** | 0 | 1 | Data source with configurable name and type |
| **Output** | 1 | 0 | Data destination with configurable name and type |
| **LLM** | 2 (system, prompt) | 1 (response) | Language model processing |
| **Text** | Dynamic | 1 | Text input with variable parsing |
| **API** | 1 | 1 | API call node |
| **Database** | 1 (query) | 1 (result) | Database operation |
| **Transform** | 1 | 1 | Data transformation |
| **Note** | 0 | 0 | Documentation/annotation |
| **Integration** | 0 | 1 (trigger) | External integration trigger |

---

## 📖 Usage Guide

### Creating a Pipeline

1. **Add Nodes**: Drag node types from the toolbar to the canvas
2. **Configure Nodes**: Click on nodes to edit their properties
3. **Connect Nodes**: Drag from an output handle to an input handle
4. **Submit**: Click "Submit Pipeline" to analyze the graph

### Using the Text Node

1. **Auto-Resize**: Type text and watch the node expand
2. **Create Variables**: Type `{{ variableName }}` to create input handles
3. **Valid Names**: Use JavaScript naming rules (letters, numbers, `_`, `$`)
4. **Examples**:
   - `{{ username }}` ✅ Creates handle
   - `{{ user_email_123 }}` ✅ Creates handle
   - `{{ 123invalid }}` ❌ No handle
   - `{{ spaces in name }}` ❌ No handle

### Deleting Nodes

1. Click on a node to select it
2. Press the **Delete** key (not Backspace)
3. Node and connected edges will be removed

### Viewing Results

After submitting a pipeline, a modal displays:
- **Number of Nodes**: Total nodes in the pipeline
- **Number of Edges**: Total connections
- **Is DAG**: Whether the graph is acyclic (✓ Yes / ✗ No)

---

## 🧪 Testing

All features have been systematically tested and verified:

### Tested Features
- ✅ All 9 node types (drag, drop, configure)
- ✅ Text node auto-resize (width & height)
- ✅ Variable detection and handle creation
- ✅ Invalid variable rejection
- ✅ Backend integration (3 scenarios)
- ✅ Custom modal display
- ✅ Node deletion
- ✅ Edge connections
- ✅ Dark theme consistency

### Test Scenarios
1. **Linear DAG**: Input → LLM → Output (3 nodes, 2 edges)
2. **Empty Pipeline**: No nodes (0 nodes, 0 edges)
3. **Branching DAG**: Input → LLM → Output1 + Output2 (4 nodes, 3 edges)

---

## 📁 Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── nodes/
│   │   ├── BaseNode.js          # Reusable node abstraction
│   │   ├── inputNode.js         # Input node component
│   │   ├── outputNode.js        # Output node component
│   │   ├── llmNode.js           # LLM node component
│   │   ├── textNode.js          # Text node with auto-resize
│   │   ├── apiNode.js           # API node component
│   │   ├── databaseNode.js      # Database node component
│   │   ├── transformationNode.js # Transform node component
│   │   ├── noteNode.js          # Note node component
│   │   └── integrationNode.js   # Integration node component
│   ├── App.js                   # Root component
│   ├── index.css                # Global styles & dark theme
│   ├── store.js                 # Zustand state management
│   ├── ui.js                    # React Flow canvas
│   ├── toolbar.js               # Node palette
│   ├── submit.js                # Submit button & modal
│   ├── draggableNode.js         # Draggable toolbar items
│   └── index.js                 # Entry point
└── package.json

backend/
├── main.py                      # FastAPI server with DAG analysis
└── requirements.txt
```

---

## 🎨 Design Decisions

### Why BaseNode?
- **DRY Principle**: Eliminates code duplication across 9 node types
- **Consistency**: Ensures uniform styling and behavior
- **Maintainability**: Changes to node structure only need to be made once
- **Scalability**: New nodes can be created in minutes

### Why Dark Theme?
- **Modern Aesthetic**: Professional appearance
- **Reduced Eye Strain**: Better for extended use
- **Visual Hierarchy**: Colors stand out more effectively
- **Industry Standard**: Common in developer tools

### Why Custom Modal?
- **Better UX**: More control over appearance and behavior
- **Consistency**: Matches application theme
- **Accessibility**: Easier to close and interact with
- **Professional**: Smooth animations and transitions

---

## 🔧 Development

### Available Scripts

- `npm start` - Run development server
- `npm test` - Run test suite
- `npm run build` - Build for production
- `npm run eject` - Eject from Create React App

### Code Style
- ES6+ JavaScript
- Functional React components with Hooks
- CSS custom properties for theming
- Semantic HTML structure

---

## 📝 Assessment Completion

### Part 1: Node Abstraction ✅
- Created `BaseNode.js` for reusable node structure
- Refactored 4 original nodes to use BaseNode
- Added 5 new custom nodes demonstrating flexibility

### Part 2: Styling ✅
- Implemented modern dark theme
- Styled all UI components consistently
- Added hover effects and animations
- Ensured MiniMap and Controls match theme

### Part 3: Text Node Logic ✅
- Auto-resize width (240px-600px) and height
- Variable detection with regex: `/\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g`
- Dynamic handle creation for each unique variable
- Output handle always present

### Part 4: Backend Integration ✅
- Frontend sends nodes/edges to `/pipelines/parse`
- Backend calculates graph statistics using NetworkX
- Custom modal displays results professionally
- Handles errors gracefully

---

## 🙏 Acknowledgments

- **VectorShift** for the assessment opportunity
- **React Flow** for the excellent node editor library
- **Zustand** for simple state management

---

## 📧 Contact

**Karan Jangid**
- GitHub: [@KaranJangid8656](https://github.com/KaranJangid8656)
- Repository: [VectorShift-Frontend-Assessment](https://github.com/KaranJangid8656/VectorShift-Frontend-Assessment)

---

**Built with ❤️ for VectorShift**
