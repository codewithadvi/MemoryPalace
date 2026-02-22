import { Router } from 'express';
import { InputHandler } from '../services/input/InputHandler.js';
import { LLMFactory } from '../services/llm/LLMFactory.js';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

const router = Router();
const inputHandler = new InputHandler();

// Ensure uploads dir
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}
const upload = multer({ dest: 'uploads/' });

router.post('/generate', upload.single('file'), async (req, res) => {
    try {
        const { input, type, forceLocal, format } = req.body;

        let parsedContent = '';

        if (req.file) {
            // Document mode via file upload
            parsedContent = await inputHandler.parseDocument(req.file.path, req.file.mimetype, req.file.originalname);
        } else {
            // Text or URL (fallback from client if 'type' flag still sent manually)
            parsedContent = await inputHandler.parseInput(input || '', type || 'text');
        }

        // Generate Concepts
        const isLocal = forceLocal === 'true' || forceLocal === true;
        const provider = await LLMFactory.getBestProvider(isLocal);
        const mapFormat = format === 'flowchart' ? 'flowchart' : 'mindmap';

        const mindmapJson = await provider.generateConcepts(parsedContent, mapFormat);

        try {
            res.json({ status: 'success', data: JSON.parse(mindmapJson) });
        } catch (e) {
            console.error("LLM JSON Parsing error:", mindmapJson);
            res.status(500).json({ status: 'error', message: "AI returned invalid JSON." });
        }
    } catch (error: any) {
        console.error("API error", error);
        res.status(500).json({ status: 'error', message: error.message });
    }
});

export default router;
