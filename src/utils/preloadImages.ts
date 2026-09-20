export const preloadImages = (imageUrls: string[]) => {
  imageUrls.forEach((url) => {
    if (!url) return;
    const img = new Image();
    img.src = url;
  });
};