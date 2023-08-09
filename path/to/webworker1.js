self.onmessage = async (event) => {
    if (event.data.type === 'loadImage') {
        const imageUrl = event.data.imageUrl;
        const imageData = await loadImageData(imageUrl);
        self.postMessage({ type: 'imageData', imageData: imageData }, [imageData.data.buffer]);
    }
};

function loadImageData(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = () => {
            const canvas = new OffscreenCanvas(img.width, img.height);
            const context = canvas.getContext('2d');
            context.drawImage(img, 0, 0);
            resolve(context.getImageData(0, 0, img.width, img.height));
        };
        img.onerror = (error) => {
            reject(error);
        };
        img.src = url;
    });
}
