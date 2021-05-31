glovalMessenger = null;

// document.body.addEventListener("")
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
      ///////////////////////////////////
      dragableTimeContainers.forEach(({ parentElement }) => {
        parentElement.removeEventListener("mouseover", onTrMouseOver);
      });
      glovalMessenger = null;
      organisateTableRow(tableRow, dragableContent.rowSpan)
    },
    { once: true }
  );

  function onWinMouseMove(event) {
    const { x, y, movementY } = event, // mouse Position
      // sizeByMouse = y - subjectItemPosition.top, // elemnt heigth,
      dragableElement = subjectItem.parentElement;

    const subjectItemPosition = subjectItem.getBoundingClientRect();
    // parentElement.style.height = sizeByMouse+"px"

    // console.log(dragableElement.parentElement.parentElement.children)//tbody
    // console.log(dragableElement)

    ////////////////////////////////////
    dragableTimeContainers.forEach(({ parentElement }) => {
      if (parentElement != dragableElement.parentElement)
        parentElement.addEventListener("mouseover", onTrMouseOver);
    });

    // console.log(subjectItemPosition.bottom, subjectItem.offsetHeight, y);
    let movementYoverItem = y - subjectItemPosition.bottom;
    let middItemHeigth = Math.round(
      subjectItem.offsetHeight / dragableElement.rowSpan
    );

    if (glovalMessenger) {
      // maybe this is not necessary
      const { /*target,*/ isNew, count } = glovalMessenger;

      // to add span
      if (isNew && movementY > 0) {
        glovalMessenger.isNew = !isNew;
        dragableElement.rowSpan++;
      }
    }
    // to subtract span
    if (-middItemHeigth > movementYoverItem) {
      dragableElement.rowSpan--;
    }
  }
}

//////////////////////////////////

function onTrMouseOver({ target }) {
  // console.log(target);
  glovalMessenger = { target, isNew: true };
}
