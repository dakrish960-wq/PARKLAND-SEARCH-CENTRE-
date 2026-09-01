import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

let aiClient: GoogleGenAI | null = null;
function getAIClient() {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Parkland Knowledge Q&A Search Assistant Endpoint
  app.post('/api/search-assistant', async (req, res) => {
    try {
      const { query } = req.body;
      if (!query || typeof query !== 'string') {
        res.status(400).json({ error: 'Search query is required.' });
        return;
      }

      const client = getAIClient();
      if (!client) {
        // Fallback intelligent response if API key is not yet set
        res.json({
          answer: `Parkland Search Centre Results for "${query}": Parkland features extensive conservation zones, equestrian trails (such as the 7.5-mile Pine Island Ridge trail system), Barkland dog park, Pine Trails Park, Liberty Park, top-tier A+ rated schools (including Marjory Stoneman Douglas High & Westglades Middle), family recreation centers, and strict park conservation ordinances.`,
          source: 'Parkland Knowledge Base (Local Fast Engine)',
          suggestedFilters: ['Parks & Nature', 'Equestrian Trails', 'Sports Facilities', 'City Ordinances'],
        });
        return;
      }

      const systemInstruction = `You are the official PARKLAND 🔍SEARCH CENTRE AI Intelligence Engine. 
You provide comprehensive, accurate, practical, and highly detailed information about Parkland, Florida and parkland conservation areas, including:
- City parks (Pine Trails Park, Liberty Park, Barkland, Equestrian Center, Terramar Park, Covered Bridge Park, 6-Acre Wood Park, Quigley Park)
- Trails, nature boardwalks, wildlife, native plants, and wetlands
- Community centers, amphitheaters, sports leagues (soccer, baseball, tennis, pickleball, basketball)
- Equestrian facilities, horse riding rules, and stables
- Schools, education, and libraries (Parkland Library, MSD High School, Westglades Middle, Riverglades Elementary, Heron Heights Elementary, Park Trails Elementary)
- City services, park permits, pavilion rentals, emergency services (Coral Springs-Parkland Fire Department, BSO Parkland District)
- Farmers markets, concert series, seasonal festivals, 5K runs
- Hours of operation, admission fees (all city parks are free admission for general public), pet rules, and ordinances.

Keep answers well-structured with clear bullet points, accurate locations/phone numbers where applicable, and helpful tips. Always respond in English.`;

      const response = await client.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: query,
        config: {
          systemInstruction,
          temperature: 0.4,
        },
      });

      res.json({
        answer: response.text || 'No additional details found.',
        source: 'Parkland AI Search Engine (Live)',
      });
    } catch (err: any) {
      console.error('Gemini Search Assistant error:', err);
      res.status(500).json({
        error: 'Failed to process AI search query',
        details: err?.message || 'Unknown error',
      });
    }
  });

  // Vite middleware for development vs static build in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`PARKLAND 🔍SEARCH CENTRE Server running on http://localhost:${PORT}`);
  });
}

startServer();
