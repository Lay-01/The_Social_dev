export const TARGET_EMAIL = 'the.social.dev12@gmail.com';

export function openMailClient({ name = '', email = '', message = '' } = {}) {
  const subject = name ? `New Inquiry from ${name} - The_Social_Dev` : 'Inquiry - The_Social_Dev';
  
  let bodyLines = [];
  if (name) bodyLines.push(`Name: ${name}`);
  if (email) bodyLines.push(`Email: ${email}`);
  if (message) {
    bodyLines.push(`\nMessage:\n${message}`);
  } else {
    bodyLines.push('Hi The_Social_Dev Team,\n\nI would like to get in touch with your team regarding your services.');
  }

  const body = bodyLines.join('\n');
  const mailtoUrl = `mailto:${TARGET_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  
  const link = document.createElement('a');
  link.href = mailtoUrl;
  link.click();
}

export function copyEmailToClipboard() {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(TARGET_EMAIL);
  } else {
    const textArea = document.createElement('textarea');
    textArea.value = TARGET_EMAIL;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    return Promise.resolve();
  }
}
