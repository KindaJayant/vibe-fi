import mongoose from 'mongoose';

const TicketDecisionSchema = new mongoose.Schema(
  {
    channel: { type: String, required: true, enum: ['email', 'chat', 'phone', 'web', 'other'], default: 'other' },
    severity: { type: String, required: true, enum: ['low', 'medium', 'high', 'critical'] },
    summary: { type: String, required: true },

    // classifier outputs
    decision: { type: String, enum: ['ai_code_patch', 'vibe_workflow'], required: true },
    reasoning: { type: String, required: true },
    next_actions: [{ type: String, required: true }],

    // optional: quick keyword hit map for auditability
    hits: {
      tech: [String],
      ops: [String]
    }
  },
  { timestamps: true }
);

export default mongoose.model('TicketDecision', TicketDecisionSchema);
