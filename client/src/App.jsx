import { useState } from 'react';
import { classifyTicket } from './api';
import './styles.css';

export default function App() {
  const [channel, setChannel] = useState('email');
  const [severity, setSeverity] = useState('medium');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [resp, setResp] = useState(null);
  const [error, setError] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResp(null);
    try {
      const out = await classifyTicket({ channel, severity, summary });
      if (!out.ok) throw new Error(out.error || 'Unknown error');
      setResp(out.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const sample = (type) => {
    if (type === 'tech') {
      setChannel('email');
      setSeverity('high');
      setSummary('API /balance returns 500 error and server timeout during peak hours');
    } else {
      setChannel('chat');
      setSeverity('low');
      setSummary('User cannot login; OTP not received; UI button disabled on KYC page');
    }
  };

  return (
    <div className="wrap">
      <h1>VibeFI Ticket Classifier</h1>
      <p className="muted">Decides between <b>AI code remediation</b> or a <b>Vibe-coded workflow</b> and returns a checklist.</p>

      <div className="samples">
        <button onClick={() => sample('tech')}>Fill Tech Sample</button>
        <button onClick={() => sample('ops')}>Fill Ops Sample</button>
      </div>

      <form onSubmit={submit} className="card">
        <label>
          Channel
          <select value={channel} onChange={e => setChannel(e.target.value)}>
            <option value="email">email</option>
            <option value="chat">chat</option>
            <option value="phone">phone</option>
            <option value="web">web</option>
            <option value="other">other</option>
          </select>
        </label>

        <label>
          Severity
          <select value={severity} onChange={e => setSeverity(e.target.value)}>
            <option value="low">low</option>
            <option value="medium">medium</option>
            <option value="high">high</option>
            <option value="critical">critical</option>
          </select>
        </label>

        <label>
          Summary
          <textarea rows={4} value={summary} onChange={e => setSummary(e.target.value)} placeholder="Describe the ticket..."/>
        </label>

        <button disabled={loading}>{loading ? 'Classifying...' : 'Classify Ticket'}</button>
      </form>

      {error && <div className="error">❌ {error}</div>}

      {resp && (
        <div className="result card">
          <h2>Decision: <span className={resp.decision === 'ai_code_patch' ? 'pill tech' : 'pill ops'}>
            {resp.decision}
          </span></h2>
          <p><b>Reasoning:</b> {resp.reasoning}</p>
          <div>
            <b>Next actions:</b>
            <ul>
              {resp.next_actions.map((a, i) => <li key={i}>{a}</li>)}
            </ul>
          </div>
          {(resp.hits?.tech?.length || resp.hits?.ops?.length) && (
            <div className="hits">
              <div><b>Tech hits:</b> {resp.hits.tech.join(', ') || '—'}</div>
              <div><b>Ops hits:</b> {resp.hits.ops.join(', ') || '—'}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
