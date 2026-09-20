interface ShareData {
  title: string;
  text: string;
  url?: string;
}

export const shareQuizResult = async (data: ShareData): Promise<void> => {
  const shareUrl = data.url || window.location.origin;

  // 1. Si el navegador soporta Web Share API (Móviles y PCs con Windows 10/11 o macOS Safari)
  if (navigator.share) {
    try {
      await navigator.share({
        title: data.title,
        text: data.text,
        url: shareUrl,
      });
      return;
    } catch (error) {
      // Si el usuario cancela la ventana de compartir, salimos limpiamente sin hacer nada
      if ((error as Error).name === 'AbortError') {
        return;
      }
    }
  }

  // 2. Fallback para PCs / Navegadores sin Web Share API: Abrir WhatsApp Web
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