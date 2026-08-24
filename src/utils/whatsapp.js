export const WHATSAPP_NUMBER = '9714911778';

/**
 * Formats client contact form inputs into a structured WhatsApp text message
 * and redirects directly to WhatsApp click-to-chat.
 */
export function openWhatsAppChat({ name, email, phone, service, message }) {
  const formattedMessage = 
`Hi The_Social_Dev! 👋

*New Project Inquiry from Website:*
• *Name:* ${name || 'N/A'}
• *Email:* ${email || 'N/A'}
${phone ? `• *Phone:* ${phone}\n` : ''}${service ? `• *Service Required:* ${service}\n` : ''}
*Project Brief / Details:*
${message || 'N/A'}`;

  const encodedText = encodeURIComponent(formattedMessage);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`;
  
  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
}
