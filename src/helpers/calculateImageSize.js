export function calculateImageSize({ photo, width }) {
    let calculatedWidth;
    let calculatedHeight;

    if (!photo) {
        return { width: 0, height: 0 };
    }

    const realWidth = photo.width;
    const realHeight = photo.height;
    const aspectRatio = photo.width / photo.height;

    const height = width / aspectRatio;

    calculatedWidth = (width / window.innerWidth) * 100;
    calculatedHeight = (height / window.innerHeight) * 100;
    return {
        calculatedWidth,
        calculatedHeight,
        realHeight,
        realWidth,
    };
}
