// Lightweight, auditable heuristic classifier for the challenge.
// You can tweak keywords/weights easily without touching the rest of the app.

const TECH_KEYWORDS = [
  'error','crash','stack','traceback','api','exception','server','500','timeout','latency',
  'null pointer','segfault','deployment','rollback','hotfix','patch','service down','prod'
];

const OPS_KEYWORDS = [
  'login','kyc','payment','upi','card','onboarding','password','otp','ui','button',
  'form','kyc pending','verification','email not received','profile','address','kyc failed'
];

export function classify(ticket) {
  const summary = (ticket.summary || '').toLowerCase();
  const severity = (ticket.severity || '').toLowerCase();

  const techHits = TECH_KEYWORDS.filter(k => summary.includes(k));
  const opsHits  = OPS_KEYWORDS.filter(k => summary.includes(k));

  // Scoring
  let scoreTech = techHits.length;
  let scoreOps  = opsHits.length;

  // severity weight
  if (severity === 'critical') scoreTech += 2;
  if (severity === 'high') scoreTech += 1;
  if (severity === 'low') scoreOps += 0.5;

  // decision
  let decision, reasoning, nextActions;

  if (scoreTech > scoreOps) {
    decision = 'ai_code_patch';
    reasoning = `Technical indicators (${techHits.join(', ') || 'none'}) with severity "${severity}" favor code remediation.`;
    nextActions = [
      'Collect logs/trace (request ID, user ID, timestamp)',
      'Run error reproduction in staging',
      'Draft AI-assisted patch (scoped diff) + unit test',
      'Open PR; run CI; get code review',
      'Deploy canary; monitor metrics/alerts'
    ];
  } else {
    decision = 'vibe_workflow';
    reasoning = `Operational indicators (${opsHits.join(', ') || 'none'}) with severity "${severity}" favor a Vibe-coded workflow.`;
    nextActions = [
      'Select appropriate Vibe troubleshooting module',
      'Run scripted steps (cache clear, token reset, KYC recheck)',
      'Verify user path end-to-end',
      'Record resolution note & link runbook',
      'Close ticket with customer comms'
    ];
  }

  return {
    decision,
    reasoning,
    next_actions: nextActions,
    hits: { tech: techHits, ops: opsHits }
  };
}
