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

    for (let index = 0; index < thumbs.length; index++) {
      if (this.value.length > 0) {
        window.electronAPI.fileName(thumbs[index].src).then((fileSrc) => {
          if (fileSrc.match(regexp)) {
            thumbs[index].parentNode.classList.remove("hidden");
          } else {
            thumbs[index].parentNode.classList.add("hidden");
          }
        });
      }
    }
  });
}
