
export function getImageUrl(imagePath: string | null | undefined): string | null {

    if (!imagePath) {
        return null;
    }

    if (imagePath.startsWith('http')) {
        return imagePath;
    }
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
    const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;

    return `${API_URL}/${cleanPath}`;
}