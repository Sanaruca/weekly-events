let glovalMessenger = null;

function onMouseDown(event) {
  const { target: resizer } = event,
    { parentElement: subjectItem } = resizer,
    { parentElement: dragableContent } = subjectItem,
    weekDays = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];

  subjectItem.style.zIndex = -1;
  const indexOfWeekDay = weekDays.indexOf(dragableContent.dataset.ofWeekColumn),
    curetWeekDayColumn = tableColumns[indexOfWeekDay];
  handleEvents(curetWeekDayColumn);

  const subjectItemIndexOfcurentColumn = curetWeekDayColumn.findIndex(
    (dragableElement) => dragableElement.firstElementChild === subjectItem
  );

  console.log("subjectItemIndexOfcurentColumn", subjectItemIndexOfcurentColumn);

  window.addEventListener("mousemove", onWinMouseMove, false);
  window.addEventListener(
    "mouseup",
    () => {
      window.removeEventListener("mousemove", onWinMouseMove, false);
      subjectItem.style.removeProperty("z-index");
      handleEvents(curetWeekDayColumn, false);
    },
    { once: true }
  );

  function onWinMouseMove(event) {
    const { x, y, movementY } = event, // mouse Position
      subjectItemPosition = subjectItem.getBoundingClientRect();

    if (glovalMessenger) {
      const { target: tdElementMouseOver, isNew } = glovalMessenger;
      const tdElementMouseOverPosition =
        tdElementMouseOver.getBoundingClientRect();

      if (isNew) {
        let globalTargetIndex = curetWeekDayColumn.indexOf(glovalMessenger.target);
        subjectItem.style.height =
          tdElementMouseOverPosition.bottom - subjectItemPosition.y;
        //* adding the amount of "draggableContainers" that the "subjectItem" size occupies
        subjectItem.dataset.rowSpan = globalTargetIndex - subjectItemIndexOfcurentColumn+1;
        glovalMessenger.isNew = false;
      }
    }
  }
}

//////////////////////////////////

function handleEvents(elements, addEvent = true) {
  elements.forEach((td) => {
    if (addEvent) {
      td.addEventListener("mouseover", onTdMouseOver, false);
    } else {
      td.removeEventListener("mouseover", onTdMouseOver);
      glovalMessenger = null;
    }
  });
}

function onTdMouseOver({ target }) {
  // e.preventDefault();
  // console.log(target)
  // while (target.tagName != "TD") {
  //   target = target.parentElement
  // }
  glovalMessenger = { target, isNew: true };
}
