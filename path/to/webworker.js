// worker.js
self.onmessage = function(event) {
  // Nhận URL hình ảnh từ main thread
  const imageUrl = event.data;

  // Tạo một image element để tải hình ảnh
  const img = new Image();

  img.onload = function() {
    // Khi hình ảnh được tải thành công, vẽ lên canvas
    const canvas = new OffscreenCanvas(400, 300); // Tạo canvas offscreen
    const context = canvas.getContext('2d');

    canvas.width = img.width;
    canvas.height = img.height;

    context.drawImage(img, 0, 0);

    // Gửi canvas đã vẽ về main thread
    self.postMessage(canvas, [canvas]);
  };

  img.src = imageUrl;
};
