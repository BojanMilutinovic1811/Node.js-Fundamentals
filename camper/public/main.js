(function () {
  const removable = document.querySelector(".removable");

  if (removable) {
    setTimeout(() => {
      removable.remove();
    }, 2500);
  }
})()
