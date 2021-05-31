const dragableTimeContainers = document.querySelectorAll(
    ".dragable-content.time-td"
  ),
  dragableTimeObjs = [];
  
// table subjects
const dragableSubjectContainers = document.querySelectorAll(
    ".dragable-content.subject-td"
  ),
  dragableSubjectObjs = [];

dragableTimeContainers.forEach((element) => {
  dragableTimeObjs.push(
    Sortable.create(element, {
      group: {
        name: "subjects",
      },
      // events:
      onMove: function ({ to, dragged: item }) {
        if (to.childElementCount) return false;
      },
      onAdd: function ({ item, to }) {
        to.rowSpan = item.dataset.rowSpan;
        const resizer = item.firstElementChild;

        if (resizer.classList.contains("hidden")) {
          resizer.classList.remove("hidden");

          resizer.addEventListener("mousedown", onMouseDown);

          resizer.addEventListener("mouseover", toggleSortable);
          resizer.addEventListener("mouseout", toggleSortable);
        }

        ////////////////////
        function toggleSortable({ target }) {
          const { parentElement: subjectItem } = target,
            { parentElement: dragableContent } = subjectItem;

          const index = dragableTimeObjs.findIndex(
              ({ el }) => el === dragableContent
            ),
            sortableObj = dragableTimeObjs[index];
          sortableObj.options.disabled = !sortableObj.options.disabled;
        }
        ////////////////////
      },
    })
  );
});

// table subjects
dragableSubjectContainers.forEach((element) => {
  dragableSubjectObjs.push(
    Sortable.create(element, {
      group: {
        name: "subjects",
        pull: "clone",
        put: false,
      },
      onMove: function (event) {
        const { to } = event;
        if (to.childElementCount) return false;
      },
    })
  );
});
