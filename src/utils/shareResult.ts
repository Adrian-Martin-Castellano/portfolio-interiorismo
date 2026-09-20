interface ShareData {
  title: string;
  text: string;
  url?: string;
}

export const shareQuizResult = async (data: ShareData): Promise<void> => {
  const shareUrl = data.url || window.location.origin;

  if (navigator.share) {
    try {
      await navigator.share({
        title: data.title,
        text: data.text,
        url: shareUrl,
      });
      return;
    } catch (error) {
      if ((error as Error).name === 'AbortError') {
        return;
      }
    }
  }

  const whatsappText = encodeURIComponent(`${data.text}\n\n${shareUrl}`);
  const whatsappUrl = `https://api.whatsapp.com/send?text=${whatsappText}`;
  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
};

export const copyResultToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      return successful;
    }
  } catch (err) {
    console.error('Error al copiar al portapapeles:', err);
    return false;
  }
};