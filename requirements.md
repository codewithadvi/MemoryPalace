# Requirements Document: Memory Palace

## Introduction

Memory Palace is an AI-powered mindmap generator that transforms any input (topics, links, paragraphs, documents) into beautiful, comprehensive, and interactive mindmaps. The system prioritizes visual excellence with multiple customizable themes, flexible input handling, and powerful editing capabilities. It aims to be a one-stop solution for students, professionals, content creators, and anyone needing to organize and visualize knowledge.

## Glossary

- **Mindmap**: A hierarchical visual representation of concepts and their relationships, with a central topic branching into subtopics
- **Theme**: A predefined visual style including colors, fonts, and styling (e.g., Fun, Dark, Light, Pastel, Glowy, Neon)
- **Node**: An individual element in the mindmap representing a concept or topic
- **Branch**: A connection between a parent node and child nodes
- **Input Source**: Any form of user-provided content (topic string, URL, paragraph, document, file)
- **AI_Engine**: The system component responsible for extracting and organizing concepts using LLM APIs (Groq or Gemini)
- **Visualization_Engine**: The system component responsible for rendering the mindmap with visual styling
- **User**: Any person using Memory Palace to generate or edit mindmaps
- **Memory Palace**: A visual metaphor representing a journey through clouds leading to mindmap generation
- **Scroll Animation**: Smooth, engaging visual transitions triggered by user scrolling that guide the user through the interface
- **Cloud Aesthetic**: A soft, summery visual design featuring cloud imagery and pastel colors
- **Ollama**: A local LLM runtime for self-hosted language model inference
- **Cloud Version**: Deployment using free cloud APIs (Groq, Gemini) for LLM processing
- **Local Version**: Deployment using Ollama for self-hosted LLM processing without external API dependencies

## Requirements

### Requirement 1: Flexible Input Handling

**User Story:** As a user, I want to input content in multiple formats (topics, URLs, paragraphs, documents), so that I can generate mindmaps from any source of information.

#### Acceptance Criteria

1. WHEN a user provides a simple topic string, THE AI_Engine SHALL extract and organize related concepts into a hierarchical structure
2. WHEN a user provides a website URL, THE AI_Engine SHALL fetch and parse the content, then extract key concepts
3. WHEN a user provides a paragraph or multiple paragraphs of text, THE AI_Engine SHALL identify main ideas and supporting details
4. WHEN a user uploads a document file (PDF, TXT, DOCX), THE AI_Engine SHALL extract and process the content
5. WHEN input is provided, THE AI_Engine SHALL create a comprehensive breakdown covering every small detail and concept available
6. IF input processing fails, THEN THE System SHALL return a descriptive error message to the user

### Requirement 2: AI-Powered Concept Extraction and Organization

**User Story:** As a user, I want the system to intelligently extract and organize concepts from my input, so that I get a well-structured mindmap without manual effort.

#### Acceptance Criteria

1. WHEN content is processed, THE AI_Engine SHALL use Groq API as the primary LLM provider
2. WHEN Groq API is unavailable, THE AI_Engine SHALL fall back to Gemini API (free tier)
3. WHEN concepts are extracted, THE AI_Engine SHALL organize them hierarchically with a clear central topic
4. WHEN organizing concepts, THE AI_Engine SHALL ensure each branch represents a distinct category or theme
5. WHEN processing complex topics, THE AI_Engine SHALL create multiple levels of depth (at least 3-4 levels)
6. WHEN the AI generates a structure, THE System SHALL present it to the user for review and refinement

### Requirement 3: Interactive Mindmap Editing

**User Story:** As a user, I want to edit the generated mindmap structure, so that I can correct inaccuracies or customize it to my needs.

#### Acceptance Criteria

1. WHEN a mindmap is displayed, THE Visualization_Engine SHALL enable drag-and-drop functionality for all nodes
2. WHEN a user drags a node, THE System SHALL update the mindmap structure in real-time
3. WHEN a user right-clicks or uses a context menu on a node, THE System SHALL provide options to add, delete, or rename branches
4. WHEN a user adds a new branch, THE System SHALL allow them to enter custom text for the new node
5. WHEN a user deletes a branch, THE System SHALL remove the node and all its children from the mindmap
6. WHEN a user renames a node, THE System SHALL update the text immediately in the visualization
7. WHEN editing occurs, THE System SHALL maintain the hierarchical structure integrity

### Requirement 4: Visual Customization and Theming

**User Story:** As a user, I want to customize the appearance of my mindmap with different themes and styling options, so that it matches my aesthetic preferences and use case.

#### Acceptance Criteria

1. WHEN a mindmap is created, THE System SHALL provide multiple predefined themes with fun names (Fun, Dark, Light, Pastel, Glowy, Neon, and others)
2. WHEN a user selects a theme, THE Visualization_Engine SHALL apply the theme's color palette, fonts, and styling to the entire mindmap
3. WHEN a user is in edit mode, THE System SHALL allow changing individual node colors
4. WHEN a user is in edit mode, THE System SHALL allow adding icons to individual nodes
5. WHEN a user is in edit mode, THE System SHALL allow changing fonts for the entire mindmap or individual nodes
6. WHEN themes are applied, THE System SHALL ensure readability and visual hierarchy are maintained
7. WHERE a user wants a custom theme, THE System SHALL allow saving custom color and font combinations

### Requirement 5: Website Aesthetic and User Experience

**User Story:** As a user, I want the entire Memory Palace website to have a cohesive, summery, vibrant aesthetic, so that using it is enjoyable and different from existing tools.

#### Acceptance Criteria

1. WHEN the website loads, THE UI SHALL display a summery, vibrant design with pastel colors as the primary palette
2. WHEN users interact with the website, THE UI SHALL feel fun, engaging, and different from existing mindmap tools
3. WHEN the website is viewed, THE UI SHALL maintain consistent branding and visual language across all pages
4. WHEN users navigate the site, THE UI SHALL provide smooth transitions and animations that enhance the experience
5. WHEN the website is used, THE UI SHALL be intuitive and require minimal learning curve
6. WHEN content is displayed, THE UI SHALL prioritize visual clarity and organization

### Requirement 6: Mindmap Visualization and Rendering

**User Story:** As a user, I want my mindmap to be rendered beautifully with excellent visual quality, so that it's easy to read and understand at a glance.

#### Acceptance Criteria

1. WHEN a mindmap is generated, THE Visualization_Engine SHALL render it using a high-quality free library (D3.js, Cytoscape, or equivalent)
2. WHEN nodes are displayed, THE Visualization_Engine SHALL position them hierarchically with clear visual separation
3. WHEN branches are displayed, THE Visualization_Engine SHALL use lines or connectors that are visually appealing and easy to follow
4. WHEN the mindmap is rendered, THE System SHALL automatically adjust layout to prevent node overlap
5. WHEN the mindmap is zoomed or panned, THE Visualization_Engine SHALL maintain rendering quality and responsiveness
6. WHEN themes are applied, THE Visualization_Engine SHALL render with consistent styling across all visual elements

### Requirement 7: Export and Sharing Capabilities

**User Story:** As a user, I want to export my mindmap in multiple formats and share it with others, so that I can use it across different platforms and collaborate.

#### Acceptance Criteria

1. WHEN a user requests export, THE System SHALL provide options to export as PNG image
2. WHEN a user requests export, THE System SHALL provide options to export as SVG vector format
3. WHEN a user requests export, THE System SHALL provide options to export as PDF document
4. WHEN a user requests export, THE System SHALL provide options to export as JSON data
5. WHEN a user exports, THE System SHALL maintain all styling, colors, and layout in the exported file
6. WHEN a user wants to share, THE System SHALL generate a shareable link that preserves the mindmap state
7. WHEN a shareable link is accessed, THE System SHALL display the mindmap in read-only mode with full visual fidelity

### Requirement 8: Performance and Reliability

**User Story:** As a user, I want Memory Palace to be fast and reliable, so that I can generate and edit mindmaps without frustration.

#### Acceptance Criteria

1. WHEN a user submits input, THE System SHALL begin processing within 2 seconds
2. WHEN AI processing is occurring, THE System SHALL display progress feedback to the user
3. WHEN a mindmap is generated, THE System SHALL complete generation within 30 seconds for typical inputs
4. WHEN a user edits the mindmap, THE System SHALL update the visualization within 500ms
5. WHEN the system encounters an error, THE System SHALL gracefully handle it and provide recovery options
6. WHEN the system is under load, THE System SHALL maintain responsiveness for core features

### Requirement 9: Differentiation and Unique Features

**User Story:** As a user, I want Memory Palace to offer unique features that set it apart from existing mindmap tools, so that I choose it over competitors.

#### Acceptance Criteria

1. WHEN comparing to existing tools, THE System SHALL offer superior visual design and theming options
2. WHEN comparing to existing tools, THE System SHALL support more flexible input types (URLs, documents, etc.)
3. WHEN comparing to existing tools, THE System SHALL provide a more intuitive and fun user experience
4. WHEN a user generates a mindmap, THE System SHALL include fun, engaging elements that enhance the experience
5. WHEN users interact with the system, THE System SHALL feel modern, vibrant, and different from competitors
6. WHERE the system offers unique features, THE System SHALL clearly communicate these advantages to users

### Requirement 10: Memory Palace Scroll Animation and Cloud Aesthetic

**User Story:** As a user, I want to experience an engaging, visually stunning interface with scroll animations and a memory palace theme, so that generating mindmaps feels like a magical journey.

#### Acceptance Criteria

1. WHEN the user scrolls through the landing page, THE UI SHALL display smooth scroll animations featuring clouds and sky imagery
2. WHEN the user scrolls, THE Animation_Engine SHALL progressively reveal the "make a mindmap on any topic" button as they scroll through the cloud landscape
3. WHEN the page loads, THE UI SHALL display a huge, immersive memory palace visual in the clouds
4. WHEN the user interacts with the interface, THE UI SHALL use amazing fonts with a soft, summery feel throughout
5. WHEN scroll animations are triggered, THE UI SHALL maintain smooth 60fps performance without stuttering
6. WHEN the user reaches the call-to-action, THE UI SHALL highlight the "make a mindmap" button with engaging visual effects
7. WHEN the page is viewed on different screen sizes, THE UI SHALL adapt scroll animations and cloud visuals responsively

### Requirement 11: Multi-Version Deployment Architecture

**User Story:** As a developer/user, I want Memory Palace to support both cloud-based and local deployment options, so that I can choose the deployment model that best fits my needs.

#### Acceptance Criteria

1. WHEN deploying Memory Palace, THE System SHALL support a Cloud Version using free APIs (Groq and Gemini)
2. WHEN deploying Memory Palace, THE System SHALL support a Local Version using Ollama for self-hosted LLM inference
3. WHEN the Cloud Version is deployed, THE AI_Engine SHALL use Groq API as primary provider with Gemini as fallback
4. WHEN the Local Version is deployed, THE AI_Engine SHALL use Ollama for all LLM processing without external API calls
5. WHEN the Local Version is deployed, THE System SHALL require Ollama to be installed and running on the host machine
6. WHEN either version is deployed, THE System SHALL maintain identical feature parity for mindmap generation and editing
7. WHEN either version is deployed, THE System SHALL maintain identical UI/UX and visual design
8. WHEN the Local Version processes requests, THE System SHALL handle Ollama connection failures gracefully with descriptive error messages
9. WHEN the Cloud Version processes requests, THE System SHALL handle API rate limiting and fallback scenarios appropriately

### Requirement 12: Beautiful and Differentiated Visual Design

**User Story:** As a user, I want Memory Palace to be one of the best-looking mindmap generators with a distinctive, beautiful aesthetic, so that I enjoy using it and recommend it to others.

#### Acceptance Criteria

1. WHEN the website is viewed, THE UI SHALL feature a cohesive soft summery aesthetic with carefully chosen color palettes
2. WHEN the website is viewed, THE UI SHALL use premium, well-designed fonts that enhance readability and visual appeal
3. WHEN mindmaps are generated, THE Visualization_Engine SHALL render them with exceptional visual quality and polish
4. WHEN themes are applied, THE System SHALL ensure each theme is beautifully designed and visually distinct
5. WHEN users interact with the system, THE UI SHALL provide smooth, delightful animations and transitions
6. WHEN comparing to existing tools, THE System SHALL be immediately recognizable as a premium, well-crafted product
7. WHEN the website is used, THE UI SHALL maintain visual consistency and professional polish across all pages and components

