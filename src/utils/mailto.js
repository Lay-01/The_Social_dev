export const TARGET_EMAIL = 'the.social.dev12@gmail.com';

export function getGmailComposeUrl({ name = '', email = '', phone = '', service = '', message = '' } = {}, recipient = TARGET_EMAIL) {
  const targetEmail = recipient || TARGET_EMAIL;
  const subject = name ? `New Inquiry from ${name} - The_Social_Dev` : 'New Project Inquiry - The_Social_Dev';

  const bodyLines = [
    `Hi The_Social_Dev Team,`,
    ``,
    `Here are my contact & project details:`,
    `----------------------------------------`,
    `• Client Name : ${name || 'Not provided'}`,
    `• Client Email: ${email || 'Not provided'}`,
    `• Phone Number: ${phone || 'Not provided'}`,
    `• Service     : ${service || 'General Inquiry'}`,
    `----------------------------------------`,
    ``,
    `Project Brief / Message:`,
    `${message || 'I would like to discuss a new project with your team.'}`,
    ``,
    `----------------------------------------`,
    `Sent from website contact form to ${targetEmail}`
  ];

  const body = bodyLines.join('\n');
  
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${targetEmail}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const mailtoUrl = `mailto:${targetEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return { subject, body, gmailUrl, mailtoUrl };
}

export function openMailClient(params = {}, recipient = TARGET_EMAIL) {
  const { gmailUrl, mailtoUrl } = getGmailComposeUrl(params, recipient);
  
  const openedWindow = window.open(gmailUrl, '_blank', 'noopener,noreferrer');
  
  if (!openedWindow || openedWindow.closed || typeof openedWindow.closed === 'undefined') {
    window.location.href = mailtoUrl;
  }

  return { gmailUrl, mailtoUrl };
}

export function copyEmailToClipboard(emailToCopy = TARGET_EMAIL) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(emailToCopy);
  } else {
    const textArea = document.createElement('textarea');
    textArea.value = emailToCopy;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    return Promise.resolve();
  }
}
