const removable = document.querySelector(".removable");

if (removable) {
  setTimeout(() => {
    console.log("hello");
    removable.remove();
  }, 2500);
}
