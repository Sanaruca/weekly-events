glovalMessenger = null;

function onMouseDown(event) {
  const { target: resizer } = event,
    { parentElement: subjectItem } = resizer,
    { parentElement: dragableContent } = subjectItem,
    { parentElement: tableRow } = dragableContent;

  window.addEventListener("mousemove", onWinMouseMove);
  window.addEventListener(
    "mouseup",
    () => {
      window.removeEventListener("mousemove", onWinMouseMove);
    },
    { once: true }
  );

  function onWinMouseMove(event) {
    const { x, y, movementY } = event, // mouse Position
      dragableElement = subjectItem.parentElement;
    const subjectItemPosition = subjectItem.getBoundingClientRect();

  }
}

//////////////////////////////////

function onTrMouseOver({ target }) {
  glovalMessenger = { target, isNew: true };
}
