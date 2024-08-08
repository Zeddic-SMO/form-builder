import type { Identifier } from "dnd-core";
import React, { ChangeEvent, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useAppGlobalContext } from "../context";
import { FormLayoutComponentChildrenType } from "../types/FormTemplateTypes";
import {
  FormControlList,
  FormControlNames,
  FormItemTypes,
} from "../utils/formBuilder.utils";

const selectedColor = "var(--primary)";
const nonSelectedColor = "rgba(0,0,0,0.1)";

const renderItem = (item: FormLayoutComponentChildrenType) => {
  switch (item.controlName) {
    case FormControlNames.INPUTTEXTFIELD:
      return (
        <>
          <input
            disabled
            className="w-full border p-2 rounded-md outline-none"
            type={item.dataType}
            placeholder={item.placeholder}
            name={item.controlName}
          />
        </>
      );

    case FormControlNames.INPUTMULTILINE:
      return (
        <>
          <textarea
            disabled
            className="w-full border p-2 rounded-md outline-none"
            placeholder={item.placeholder}
            name={item.controlName}
          ></textarea>
        </>
      );

    case FormControlNames.CHECKBOX:
      return (
        <>
          <div className="">
            {item.items &&
              item.items.map((option: any, optIndex: any) => (
                <div key={optIndex} className="flex items-center gap-2">
                  <input
                  disabled
                    type="checkbox"
                    name={item.controlName}
                    value={option.value}
                  />
                  <label>{option.label}</label>
                </div>
              ))}
          </div>
        </>
      );

    case FormControlNames.RADIOGROUP:
      return (
        <>
          <div>
            {item.items?.map((option, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="radio"
                  id={option.label}
                  name={item.controlName}
                  value={option.value}
                  disabled
                />
                <label htmlFor={option.label}>{option.label}</label>
              </div>
            ))}
          </div>
        </>
      );

    case FormControlNames.SELECTDROPDOWN:
      return (
        <>
          <div className="flex flex-col w-full border p-2 rounded-md outline-none">
            {item.items?.map((i) => (
              <option key={i.value} value={i.value}>
                {i.label}
              </option>
            ))}
          </div>
        </>
      );

    case FormControlNames.DATEFIELD:
      return (
        <>
          <input
            className="w-full flex border p-2 rounded-md outline-none"
            type={item.dataType}
            placeholder={item.placeholder}
            disabled
          />
        </>
      );

    case FormControlNames.TIMEFIELD:
      return (
        <>
          <input
            className="w-full flex border p-2 rounded-md outline-none"
            type={item.dataType}
            placeholder={item.placeholder}
            disabled
          />
        </>
      );
  }
};

interface ControlViewComponentProps {
  item: any;
  deleteControl: (itemId: string, containerId: string) => void;
  containerId: string;
  selectControl: (item: FormLayoutComponentChildrenType) => void;
  selectedControl: any;
  index: number;
  moveControl: (
    item: FormLayoutComponentChildrenType,
    dragIndex: number,
    hoverIndex: number,
    containerId: string
  ) => void;
}

function ControlViewComponent(props: ControlViewComponentProps) {
  const {
    item,
    deleteControl,
    containerId,
    selectControl,
    selectedControl,
    index,
    moveControl,
  } = props;

  const {
    elementId,
    setElementId,
    allFormLayoutComponents,
    setAllFormLayoutComponents,
    containerId: container_id,
  } = useAppGlobalContext();

  let colBackgroundcolor = nonSelectedColor;
  let color = "";
  let wrapperStyle = {
    border: "1px solid " + nonSelectedColor,
    borderRadius: "9px",
    margin: "20px",
    backgroundColor: "white",
    cursor: "pointer",
    boxShadow: "0 9px 90px #efefef",
  };

  // Check if its the same type and id to change color.
  if (
    selectedControl &&
    item.id === selectedControl.id &&
    item.type === selectedControl.type
  ) {
    wrapperStyle.border = "2px solid " + selectedColor;
    colBackgroundcolor = selectedColor;
    color = "white";
  }

  const handleDeleteControl: React.MouseEventHandler<HTMLSpanElement> = (
    event
  ) => {
    deleteControl(item.id, containerId);
    if (event.stopPropagation) event.stopPropagation();
  };

  // Drag & Sort Code for functionality

  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<
    FormLayoutComponentChildrenType,
    void,
    { handlerId: Identifier | null }
  >({
    accept: FormItemTypes.CONTROL,
    collect(monitor: any) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: FormLayoutComponentChildrenType, monitor: any) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex && dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex && dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveControl(item, dragIndex as number, hoverIndex, containerId);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: FormItemTypes.CONTROL,
    item: () => {
      return { ...item, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  const handleChangeElement = (value: string) => {
    const newChildObject = FormControlList.find((el) => el.element === value);

    if (elementId && container_id) {
      console.log(container_id, "containerId");
      console.log(elementId, "elementId");
      console.log(allFormLayoutComponents, "all forms");

      if (allFormLayoutComponents) {
        const newFormEl = allFormLayoutComponents.map((container) => {
          if (container.container.id === container_id) {
            // Find the index of the child to replace
            const childIndex = container.children.findIndex(
              (child) => child.id === elementId
            );

            if (childIndex !== -1) {
              // Replace the child object
              // @ts-ignore
              container.children[childIndex] = {
                ...newChildObject,
                containerId: container_id,
              }; // Ensure containerId is maintained

              return container;
            }
          }
        });

        // @ts-ignore
        newFormEl && setAllFormLayoutComponents(newFormEl);
      }
    }
  };

  return (
    <>
      <div
        ref={ref}
        className=""
        onClick={() => selectControl(item)}
        style={{ ...wrapperStyle, opacity }}
      >
        <div className="p-8">
          <div className="flex items-center justify-between">
            <h5>{item.labelName + (item.required ? " *" : "")}</h5>
            <div className="flex items-center gap-2">
              <select
                name=""
                id=""
                className="border rounded-md p-2"
                onClick={() => setElementId(item.id)}
                onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                  const value = event.target.value;
                  handleChangeElement(value);
                }}
              >
                {FormControlList.map((el) => {
                  return (
                    <option key={el.id} value={el.element}>
                      {el.element}
                    </option>
                  );
                })}
              </select>
              <span
                className="p-2 border border-red-400 rounded-md"
                onClick={handleDeleteControl}
              >
                🗑️
              </span>
            </div>
          </div>
          {item.description !== "" ? (
            <>
              <div className="mt-2">
                <p>{item.description}</p>
              </div>
            </>
          ) : null}
          <div className="mt-3">{renderItem(item)}</div>
        </div>
      </div>
    </>
  );
}

export default ControlViewComponent;
