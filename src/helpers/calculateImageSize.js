export function calculateImageSize({ photo, width, widthVW }) {
    // let calculatedWidth;
    // let calculatedHeight;

    // if (!photo) {
    //     return { width: 0, height: 0 };
    // }

    // const realWidth = photo.width;
    // const realHeight = photo.height;
    // const aspectRatio = photo.width / photo.height;

    // const height = width / aspectRatio;

    // calculatedWidth = (width / window.innerWidth) * 100;
    // calculatedHeight = (height / window.innerHeight) * 100;

    const aspectRatio = photo.width / photo.height;
    let widthPX = (width * window.screen.width) / 100;
    let heightPX = widthPX / aspectRatio;

    let heightVH = widthVW / aspectRatio;

    return {
        // calculatedWidth,
        // calculatedHeight,
        // realHeight,
        // realWidth,
        // height,
        width,
        widthPX,
        heightPX,
        heightVH,
    };
}
