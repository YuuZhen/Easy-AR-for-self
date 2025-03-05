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

// 添加保存QR码图片的功能
function saveQRCode(elementId, filename = 'qrcode') {
  try {
    const qrCanvas = document.querySelector(`#${elementId} canvas`);
    if (!qrCanvas) {
      throw new Error('未找到QR码画布元素');
    }
    
    // 创建一个临时链接用于下载
    const link = document.createElement('a');
    link.download = `${filename}.png`;
    link.href = qrCanvas.toDataURL('image/png');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    console.log('QR码保存成功');
  } catch (error) {
    console.error('QR码保存失败:', error);
  }
}

// 绑定保存按钮点击事件
function bindSaveButton(buttonId, qrCodeElementId, filename) {
  const saveButton = document.getElementById(buttonId);
  if (saveButton) {
    saveButton.addEventListener('click', () => {
      saveQRCode(qrCodeElementId, filename);
    });
  }
}
