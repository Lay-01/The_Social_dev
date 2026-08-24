import React, { useState, useEffect } from 'react';

export default function SecurityCaptcha({ onValidate }) {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [error, setError] = useState(false);

  const generateChallenge = () => {
    const n1 = Math.floor(Math.random() * 12) + 1;
    const n2 = Math.floor(Math.random() * 12) + 1;
    setNum1(n1);
    setNum2(n2);
    setUserAnswer('');
    setError(false);
    if (onValidate) onValidate(false);
  };

  useEffect(() => {
    generateChallenge();
  }, []);

  const handleChange = (e) => {
    const val = e.target.value;
    setUserAnswer(val);
    const expected = num1 + num2;
    const isValid = parseInt(val, 10) === expected;
    setError(val.length > 0 && !isValid);
    if (onValidate) onValidate(isValid);
  };

  return (
    <div style={{
      backgroundColor: '#f8fafc',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      padding: '0.875rem 1rem',
      marginBottom: '1.25rem'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          <i className="ri-shield-check-line" style={{ color: '#3b82f6' }}></i> Security Challenge (CAPTCHA)
        </span>
        <button
          type="button"
          onClick={generateChallenge}
          style={{ background: 'none', border: 'none', color: '#3b82f6', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.2rem' }}
          title="Refresh Challenge"
        >
          <i className="ri-refresh-line"></i> Refresh
        </button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{
          backgroundColor: '#222e3c',
          color: '#ffa260',
          padding: '0.4rem 0.8rem',
          borderRadius: '6px',
          fontWeight: 700,
          fontSize: '1rem',
          letterSpacing: '0.1em',
          userSelect: 'none'
        }}>
          {num1} + {num2} = ?
        </div>

        <input
          type="number"
          className="adminkit-input"
          style={{
            borderColor: error ? '#ef4444' : '#ced4da',
            maxWidth: '110px'
          }}
          placeholder="Answer"
          value={userAnswer}
          onChange={handleChange}
          required
        />
      </div>

      {error && (
        <div style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '0.35rem' }}>
          Incorrect answer. Please solve the math puzzle.
        </div>
      )}
    </div>
  );
}
