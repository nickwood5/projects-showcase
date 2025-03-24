// ************************ Drag and drop ***************** //
let dropArea = document.getElementById("drop-area");
var numPosters = 0;

;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, preventDefaults, false);
  document.body.addEventListener(eventName, preventDefaults, false);
});

// Highlight drop area when item is dragged over it
;['dragenter', 'dragover'].forEach(eventName => {
  dropArea.addEventListener(eventName, highlight, false);
});

// Unhighlight drop area
;['dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, unhighlight, false);
});

// Handle dropped files
dropArea.addEventListener('drop', handleDrop, false);

function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

function highlight(e) {
  dropArea.classList.add('highlight');
}

function unhighlight(e) {
  dropArea.classList.remove('highlight');
}

function handleDrop(e) {
  var dt = e.dataTransfer;
  var files = dt.files;
  handleFiles(files);
}

function handleFiles(files) {
  files = [...files];
  files.forEach(file => previewFile(file));
}

function previewFile(file) {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  
  reader.onloadend = function() {
    numPosters += 1;
    let container = document.createElement('div'); // use a semantic element like 'div'
    
    let img = document.createElement('img');
    img.src = reader.result;
    img.style = "width:182px;height:268px";
    
    let textbox = document.createElement('p'); // using <p> for text display
    textbox.style = "color:gray";
    textbox.textContent = "Loading model prediction...";
    textbox.id = numPosters.toString();
    
    container.appendChild(img);
    container.appendChild(textbox);
    
    document.getElementById('gallery').prepend(container);
    
    // Pass the current poster ID to update the correct textbox later
    uploadFile(file, numPosters);
  }
}

function uploadFile(file, posterId) {
  const url = 'https://personal-site-oi5a.onrender.com/api/movie_poster_classifier/classify/';
  const formData = new FormData();
  formData.append('image', file);

  fetch(url, {
    method: 'POST',
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    },
    body: formData
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      return response.json();
    })
    .then(result => {
      let text;
      if (result.error) {
        text = "Unsupported file extension";
      } else {
        let predictions = result.predicted_genres;
        if (predictions.length === 0) {
          text = "Unknown genre";
        } else {
          // Create a comma-separated list of predictions and replace underscores with slashes
          text = predictions.join(', ').replace(/_/g, '/');
        }
      }
      let textbox = document.getElementById(posterId.toString());
      if (textbox) {
        textbox.textContent = text;
        textbox.style.color = "black";
      }
    })
    .catch(error => {
      console.error('Error message:', error);
      let textbox = document.getElementById(posterId.toString());
      if (textbox) {
        textbox.textContent = "Error loading prediction";
        textbox.style.color = "red";
      }
    });
}
