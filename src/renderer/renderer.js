window.addEventListener("load", () => {
  addImagesEvent();
  searchImagesEvent();
});

function addImagesEvent() {
  const thumbs = document.querySelectorAll("li.list-group-item");
  for (let index = 0; index < thumbs.length; index++) {
    thumbs[index].addEventListener("click", function () {
      changeImage(this);
    });
  }
}

function changeImage(node) {
  if (node) {
    document.querySelector("li.selected").classList.remove("selected");
    node.classList.add("selected");
    document.getElementById("image-displayed").src = node.querySelector("img").src;
  } else {
    document.getElementById("image-displayed").src = "";
  }
}

function searchImagesEvent() {
  const searchBox = document.getElementById("search-box");

  searchBox.addEventListener("keyup", function () {
    const regexp = new RegExp(this.value, "gi");

    const thumbs = document.querySelectorAll("li.list-group-item img");

    if (this.value.length > 0) {
      for (const thumb of thumbs) {
        window.electronAPI.fileName(thumb.src).then((fileSrc) => {
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
        console.log(image);
        image.classList.remove("hidden");
      }
    }
  });
}

function selectFirstImage() {
  const image = document.querySelector("li.first-image");
  changeImage(image);
}
