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

export const copyResultToClipboard = async (text: string, url?: string): Promise<boolean> => {
  const shareUrl = url || window.location.origin;
  const fullText = `${text}\n${shareUrl}`;

  try {
    await navigator.clipboard.writeText(fullText);
    return true;
  } catch (err) {
    console.error('Error al copiar al portapapeles:', err);
    return false;
  }
};