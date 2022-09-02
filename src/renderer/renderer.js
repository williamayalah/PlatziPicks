window.addEventListener("load", () => {
  openDirectoryEvent();
  addImagesEvent();
  searchImagesEvent();
  selectEvent();
});

function addImagesEvent() {
  const thumbs = document.querySelectorAll("li.list-group-item");
  for (let index = 0; index < thumbs.length; index++) {
    thumbs[index].addEventListener("click", function () {
      changeImage(this);
    });
  }
}

function searchImagesEvent() {
  const searchBox = document.getElementById("search-box");

  searchBox.addEventListener("keyup", function () {
    const regexp = new RegExp(this.value, "gi");

    const thumbs = document.querySelectorAll("li.list-group-item img");

    if (this.value.length > 0) {
      for (const thumb of thumbs) {
        window.electronAPI.getFileName(thumb.src).then((fileSrc) => {
          if (fileSrc.match(regexp)) {
            thumb.parentNode.classList.remove("hidden");
            thumb.parentNode.classList.add("first-image");
          } else {
            thumb.parentNode.classList.add("hidden");
            thumb.parentNode.classList.remove("first-image");
          }
          selectFirstImage();
        });
      }
    } else {
      const hiddenImages = document.querySelectorAll("li.hidden");
      for (const image of hiddenImages) {
        image.classList.remove("hidden");
      }
    }
  });
}

function selectEvent() {
  const select = document.getElementById("filters");

  select.addEventListener("change", function () {
    applyFilter(this.value, document.getElementById("image-displayed"));
  });
}

function changeImage(node) {
  if (node) {
    document.querySelector("li.selected").classList.remove("selected");
    node.classList.add("selected");
    document.getElementById("image-displayed").src =
      node.querySelector("img").src;
  } else {
    document.getElementById("image-displayed").src = "";
  }
}

function selectFirstImage() {
  const image = document.querySelector("li.first-image");
  changeImage(image);
}

function applyFilter(filter, currentImage) {
  let imgObj = new Image();
  imgObj.src = currentImage.src;

  filterous
    .importImage(imgObj, {})
    .applyInstaFilter(filter)
    .renderHtml(currentImage);
}

function openDirectoryEvent() {
  const openDirectory = document.getElementById("open-directory");

  openDirectory.addEventListener("click", function () {
    window.electronAPI.openDirectory()
  });
}
