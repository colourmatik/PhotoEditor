window.onload = function() {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    const uploadBtn = document.getElementById('upload-btn');
    const imageUrlInput = document.getElementById('image-url');
    const loadUrlBtn = document.getElementById('load-url-btn');
    const infoPanel = document.getElementById('info-panel');
    
    let imgData = null;

    function updateInfoPanel(x, y) {
        const pixel = context.getImageData(x, y, 1, 1).data;
        const rgb = `${pixel[0]}, ${pixel[1]}, ${pixel[2]}`;
        const coordinates = `X: ${x}; Y: ${y}`;
        const imageDimensions = `${canvas.width} x ${canvas.height}`;
        infoPanel.innerHTML = `Размер:<br>${imageDimensions} px<br>RGB: ${rgb}<br>${coordinates}`;
    }

    canvas.addEventListener('mousemove', function(e) {
        const rect = canvas.getBoundingClientRect();
        const x = Math.floor(e.clientX - rect.left);
        const y = Math.floor(e.clientY - rect.top);
        updateInfoPanel(x, y);
    });

    uploadBtn.addEventListener('dragover', function(e) {
        e.preventDefault();
    });

    uploadBtn.addEventListener('drop', function(e) {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        loadImageFromFile(file);
    });

    uploadBtn.addEventListener('click', function() {
        document.getElementById('upload-file').click();
    });

    document.getElementById('upload-file').addEventListener('change', function(e) {
        const file = e.target.files[0];
        loadImageFromFile(file);
    });

    loadUrlBtn.addEventListener('click', function() {
        const url = imageUrlInput.value.trim();
        if (url) {
            loadImageFromURL(url);
        } else {
            alert('Введите URL изображения');
        }
    });

    function loadImageFromFile(file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const img = new Image();
            img.onload = function() {
                canvas.width = img.width;
                canvas.height = img.height;
                context.drawImage(img, 0, 0);
                imgData = context.getImageData(0, 0, canvas.width, canvas.height);
            }
            img.src = event.target.result;
        }
        reader.readAsDataURL(file);
    }

    function loadImageFromURL(url) {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img, 0, 0);
            imgData = context.getImageData(0, 0, canvas.width, canvas.height);
        }
        img.onerror = function() {
            alert('Не удалось загрузить изображение по указанному URL');
        }
        img.src = url;
    }
};
