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
  document.querySelector("li.selected").classList.remove("selected");
  node.classList.add("selected");
  document.getElementById("image-displayed").src =
    node.querySelector("img").src;
}

function searchImagesEvent() {
  const searchBox = document.getElementById("search-box");

  searchBox.addEventListener("keyup", function () {
    const regexp = new RegExp(this.value, "gi");

    const thumbs = document.querySelectorAll("li.list-group-item img");

    if (this.value.length > 0) {
      for (let index = 0; index < thumbs.length; index++) {
        window.electronAPI.fileName(thumbs[index].src).then((fileSrc) => {
          if (fileSrc.match(regexp)) {
            thumbs[index].parentNode.classList.remove("hidden");
            thumbs[index].parentNode.classList.add("first-image");
            selectFirstImage()
          } else {
            thumbs[index].parentNode.classList.add("hidden");
            thumbs[index].parentNode.classList.remove("first-image");
          }
        });
      }
    }
  });
}

function selectFirstImage() {
  const image = document.querySelector("li.first-image");
  changeImage(image);
}
