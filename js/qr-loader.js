function loadQRCodeLibrary() {
  return new Promise((resolve, reject) => {
    if (window.QRCode) {
      resolve(window.QRCode);
      return;
    }
    
    const script = document.createElement('script');
    script.src = '/js/qrcode.min.js';
    script.onload = () => resolve(window.QRCode);
    script.onerror = () => reject(new Error('QR码库加载失败'));
    document.head.appendChild(script);
  });
}

// 使用示例
async function createQRCode(elementId, text) {
  try {
    await loadQRCodeLibrary();
    new QRCode(document.getElementById(elementId), text);
    console.log('QR码生成成功');
  } catch (error) {
    console.error('QR码生成失败:', error);
  }
}