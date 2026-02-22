import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

export class InputHandler {
    async parseInput(input: string, type: 'text' | 'url'): Promise<string> {
        if (type === 'url') return await this.parseHtmlFromUrl(input);
        return input;
    }

    private async parseHtmlFromUrl(url: string): Promise<string> {
        try {
            const response = await axios.get(url);
            const $ = cheerio.load(response.data);
            $('script, style, nav, footer, header').remove();
            const text = $('body').text().replace(/\s+/g, ' ').trim();
            return text.substring(0, 50000);
        } catch (e) {
            throw new Error(`Failed to parse URL: ${url}`);
        }
    }

    async parseDocument(filePath: string, mimeType: string, filename: string): Promise<string> {
        try {
            let text = "";
            const lowerMime = mimeType?.toLowerCase() || '';
            const lowerName = filename?.toLowerCase() || '';

            if (lowerMime.includes('pdf') || lowerName.endsWith('.pdf')) {
                const pdfParse = require('pdf-parse');
                const dataBuffer = fs.readFileSync(filePath);

                // pdf-parse@1.1.1 directly exports the parsing function
                const data = await pdfParse(dataBuffer);
                text = data.text;
            }
            else if (lowerMime.includes('wordprocessingml') || lowerName.endsWith('.docx')) {
                const mammothPkg = require('mammoth');
                const mammoth = typeof mammothPkg === 'function' ? mammothPkg : (mammothPkg.default || mammothPkg);
                const result = await mammoth.extractRawText({ path: filePath });
                text = result.value;
            }
            else {
                // pptx, docx, etc fallback via officeparser
                const officeParserPkg = require('officeparser');
                const officeParser = typeof officeParserPkg === 'function' ? officeParserPkg : (officeParserPkg.default || officeParserPkg);
                text = await officeParser.parseOfficeAsync(filePath);
            }

            // Cleanup temp file uploaded by multer
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }

            return text.substring(0, 50000); // 50k character limit for safe LLM processing
        } catch (e: any) {
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
            throw new Error(`Failed to parse document: ${e.message}`);
        }
    }
}
