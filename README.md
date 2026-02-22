<p align="center">
  <img src="https://img.shields.io/badge/Memory-Palace-000000?style=for-the-badge&labelColor=1a1a2e&color=e94560&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0iTTEyIDJMNCAyMGwyMCAtOC0xMiAtMTAiLz48L3N2Zz4=" alt="Memory Palace" />
</p>

<h1 align="center">Memory Palace</h1>

<p align="center">
  <strong>Transform any idea into a structured, visual mind map or flowchart -- instantly.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-8.0-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Express-5.2-000000?style=flat-square&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.2-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="TailwindCSS" />
  <img src="https://img.shields.io/badge/Framer_Motion-12-FF0099?style=flat-square&logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/Node.js-20+-339933?style=flat-square&logo=node.js&logoColor=white" alt="Node.js" />
</p>

<p align="center">
  <a href="#features">Features</a> &bull;
  <a href="#architecture">Architecture</a> &bull;
  <a href="#user-flow">User Flow</a> &bull;
  <a href="#tech-stack">Tech Stack</a> &bull;
  <a href="#getting-started">Getting Started</a> &bull;
  <a href="#api-reference">API</a>
</p>

---

## Why I Built This

When I first watched Sherlock Holmes, the thing that fascinated me the most wasn't the deductions or the crime-solving -- it was the **Memory Palace**. The way Sherlock could walk through an imaginary architectural space inside his mind, placing memories in rooms and recalling them effortlessly by simply revisiting those rooms, felt like a superpower.

That stuck with me.

I realized that mind maps are, in a way, your own kind of Memory Palace. They let you take something impossibly complex -- a 50-page research paper, an entire semester of notes, a sprawling topic you're trying to learn -- and break it down into a spatial structure you can actually *navigate*. You're not just reading linearly anymore. You're walking through your knowledge.

So I built this. Upload any document, paste any text, or just type a topic -- and Memory Palace instantly decomposes it into a richly detailed, interactive mind map or a structured flowchart that you can zoom into, pan around, explore, and export. It's the closest thing I could build to giving everyone their own Sherlock-style Memory Palace.

---

## Features

| Feature | Description |
|:--------|:------------|
| **AI-Powered Mind Maps** | Paste any text, topic, or URL. Groq or Gemini AI breaks it down into an exhaustive, deeply nested hierarchical mind map. |
| **AI-Powered Flowcharts** | Toggle to Flowchart mode for a strict top-down process diagram with rectangular boxes and directional arrows. |
| **Document Upload** | Drag and drop PDFs, DOCX, or PPTX files directly. The backend extracts all text natively and feeds it to the AI. |
| **URL Parsing** | Paste any URL. Memory Palace scrapes the page content, strips boilerplate, and generates a mind map from the extracted text. |
| **Interactive Zoom & Pan** | Both mind maps (via Markmap) and flowcharts (via Mermaid + react-zoom-pan-pinch) support full mouse-wheel zoom and click-drag panning. |
| **SVG Export** | One-click export of your generated diagram as a crisp, infinitely scalable SVG vector file. |
| **Cinematic Landing Page** | A 240-frame scrollytelling animation sequence with scroll-synced narrative overlays and premium typography. |
| **Cloud & Local AI** | Toggle between cloud LLM providers (Groq, Gemini) or a local Ollama instance with a single click. |

---

## Architecture

```mermaid
graph TB
    subgraph Client["Frontend (React + Vite)"]
        LP["Landing Page<br/>240-Frame Scrollytelling"]
        MP["Mindmap Page"]
        MV["MarkmapViz<br/>(markmap-view)"]
        FV["MermaidViz<br/>(mermaid.js)"]
        EX["SVG Export"]
        MP --> MV
        MP --> FV
        MP --> EX
    end

    subgraph Server["Backend (Express + Node.js)"]
        API["API Router<br/>/api/mindmaps/generate"]
        IH["Input Handler"]
        LF["LLM Factory"]
        PF["Prompt Factory"]
        
        API --> IH
        API --> LF
        LF --> PF
    end

    subgraph Parsers["Document Parsers"]
        PDF["pdf-parse"]
        DOCX["mammoth"]
        PPTX["officeparser"]
        URL["cheerio + axios"]
    end

    subgraph LLMs["AI Providers"]
        GQ["Groq<br/>(Llama 3)"]
        GM["Google Gemini"]
        OL["Ollama<br/>(Local)"]
    end

    MP -->|"POST /api/mindmaps/generate"| API
    IH --> PDF
    IH --> DOCX
    IH --> PPTX
    IH --> URL
    LF --> GQ
    LF --> GM
    LF --> OL

    style Client fill:#1a1a2e,stroke:#e94560,color:#fff
    style Server fill:#16213e,stroke:#0f3460,color:#fff
    style Parsers fill:#0f3460,stroke:#533483,color:#fff
    style LLMs fill:#533483,stroke:#e94560,color:#fff
```

---

## User Flow

```mermaid
graph TD
    A["User Opens Memory Palace"] --> B["Cinematic Landing Page<br/>Scroll Through 240-Frame Animation"]
    B --> C["Click: Create My Memory Palace"]
    C --> D["Mindmap Generation Page"]
    
    D --> E{"Choose Input Method"}
    
    E -->|"Type Text"| F["Enter Topic / Paste Text"]
    E -->|"Paste URL"| G["Enter Any URL"]
    E -->|"Upload File"| H["Drag & Drop PDF / DOCX / PPTX"]
    
    F --> I{"Select Format"}
    G --> I
    H --> I
    
    I -->|"Mindmap"| J["AI Generates Hierarchical JSON"]
    I -->|"Flowchart"| K["AI Generates Process JSON"]
    
    J --> L["Render Interactive Markmap<br/>(Zoom / Pan / Collapse)"]
    K --> M["Render Mermaid Flowchart<br/>(Zoom / Pan / Rectangular Boxes)"]
    
    L --> N["Export as SVG"]
    M --> N
    
    N --> O["Download Vector File"]

    style A fill:#e94560,stroke:#1a1a2e,color:#fff
    style D fill:#0f3460,stroke:#533483,color:#fff
    style L fill:#16213e,stroke:#e94560,color:#fff
    style M fill:#16213e,stroke:#e94560,color:#fff
    style O fill:#533483,stroke:#e94560,color:#fff
```

---

## Tech Stack

### Frontend

| Technology | Purpose |
|:-----------|:--------|
| **React 19** | UI framework with hooks-based architecture |
| **TypeScript 5.9** | End-to-end type safety |
| **Vite 8** | Ultra-fast HMR dev server and bundler |
| **Tailwind CSS 4** | Utility-first styling engine |
| **Framer Motion 12** | Physics-based scroll animations and transitions |
| **Markmap** | Interactive, zoomable mind map rendering |
| **Mermaid.js** | Flowchart and process diagram rendering |
| **react-zoom-pan-pinch** | Touch and mouse zoom/pan for flowcharts |
| **Lucide React** | Premium icon library |

### Backend

| Technology | Purpose |
|:-----------|:--------|
| **Express 5** | HTTP server and API routing |
| **Groq SDK** | Lightning-fast Llama 3 inference |
| **Google Generative AI** | Gemini model integration |
| **Ollama** | Self-hosted local LLM support |
| **Multer** | Multipart file upload handling |
| **pdf-parse** | Native PDF text extraction |
| **Mammoth** | DOCX to raw text conversion |
| **Officeparser** | PPTX and other Office format parsing |
| **Cheerio** | Server-side HTML scraping for URL inputs |

---

## Getting Started

### Prerequisites

- **Node.js** >= 20
- **npm** >= 9
- A **Groq API Key** or **Google Gemini API Key** (at least one)

### 1. Clone the Repository

```bash
git clone https://github.com/codewithadvi/MemoryPalace.git
cd MemoryPalace
```

### 2. Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 3. Configure Environment Variables

Create a `.env` file inside the `backend/` directory:

```env
GROQ_API_KEY=your_groq_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here
```

> You only need one of the two keys. The system automatically selects the best available provider.

### 4. Start Development Servers

```bash
# Terminal 1 - Backend (Port 3000)
cd backend
npm run dev

# Terminal 2 - Frontend (Port 5173)
cd frontend
npm run dev
```

### 5. Open in Browser

Navigate to **[http://localhost:5173](http://localhost:5173)** and start building your Memory Palace.

---

## API Reference

### `POST /api/mindmaps/generate`

Generate a mind map or flowchart from text, URL, or uploaded document.

#### Request (JSON Body)

```json
{
  "input": "Quantum Computing",
  "type": "text",
  "forceLocal": false,
  "format": "mindmap"
}
```

| Field | Type | Description |
|:------|:-----|:------------|
| `input` | `string` | The text content, topic, or URL |
| `type` | `"text" \| "url"` | Whether the input is raw text or a URL to scrape |
| `forceLocal` | `boolean` | Force Ollama local inference instead of cloud |
| `format` | `"mindmap" \| "flowchart"` | Output visualization format |

#### Request (File Upload - multipart/form-data)

| Field | Type | Description |
|:------|:-----|:------------|
| `file` | `File` | PDF, DOCX, or PPTX document |
| `forceLocal` | `string` | `"true"` or `"false"` |
| `format` | `string` | `"mindmap"` or `"flowchart"` |

#### Response

```json
{
  "status": "success",
  "data": {
    "id": "root",
    "topic": "Quantum Computing",
    "children": [
      {
        "id": "1",
        "topic": "Qubits",
        "children": [
          { "id": "1.1", "topic": "Superposition" },
          { "id": "1.2", "topic": "Entanglement" }
        ]
      }
    ]
  }
}
```

---

<p align="center">
  <sub>Built with obsessive attention to detail by <a href="https://github.com/codewithadvi">@codewithadvi</a></sub>
</p>
