import { Router } from 'express';
import { z } from 'zod';
import TicketDecision from '../models/TicketDecision.js';
import { classify } from '../classifier.js';

const router = Router();

const TicketSchema = z.object({
  channel: z.string().optional().default('other'),
  severity: z.enum(['low','medium','high','critical']),
  summary: z.string().min(5)
});

router.post('/classify', async (req, res) => {
  try {
    const parsed = TicketSchema.parse(req.body);
    const result = classify(parsed);

    const record = await TicketDecision.create({
      ...parsed,
      ...result
    });

    res.json({
      ok: true,
      data: {
        id: record._id,
        decision: record.decision,
        reasoning: record.reasoning,
        next_actions: record.next_actions,
        hits: record.hits
      }
    });
  } catch (e) {
    if (e?.issues) {
      return res.status(400).json({ ok: false, error: 'Invalid input', details: e.issues });
    }
    console.error(e);
    res.status(500).json({ ok: false, error: 'Server error' });
  }
});

export default router;
