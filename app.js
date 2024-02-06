document.addEventListener('DOMContentLoaded', function () {
    const fileInput = document.getElementById('fileInput');
    const uploadButton = document.getElementById('uploadButton');
    const uploadStatus = document.getElementById('uploadStatus');
    const linkContainer = document.getElementById('linkContainer'); // Now correctly references the container
    const fileLink = document.getElementById('fileLink');
    const copyButton = document.getElementById('copyButton');

    uploadButton.onclick = async function() {
        if (!fileInput.files.length) {
            uploadStatus.textContent = 'Please select a file to upload.';
            return;
        }
        
        const file = fileInput.files[0];
        const formData = new FormData();
        formData.append("file", file);
        uploadStatus.textContent = 'Uploading...';
        
        try {
            const response = await fetch("http://localhost:3000/upload", {
                method: "POST",
                body: formData,
            });
            
            if (!response.ok) throw new Error('Upload failed');
            
            const data = await response.json();
            const url = `https://gateway.pinata.cloud/ipfs/${data.cid}`;
            
            fileLink.href = url;
            fileLink.textContent = 'View File';
            linkContainer.style.display = 'block'; // Correctly shows the container now
            
            uploadStatus.textContent = 'File uploaded successfully.';
        } catch (error) {
            console.error('Error uploading file:', error);
            uploadStatus.textContent = 'Upload failed. Please try again.';
        }
    };

    copyButton.onclick = function() {
        navigator.clipboard.writeText(fileLink.href).then(() => {
            alert('Link copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy:', err);
        });
    };
});
