import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import type { Identifier } from "dnd-core";
import { FormLayoutComponentChildrenType } from "../types/FormTemplateTypes";
import { FormControlNames, FormItemTypes } from "../utils/formBuilderEntity";
import {
  Checkbox,
  Input,
  Radio,
  RadioGroup,
  Select,
  Textarea,
} from "@chakra-ui/react";

const selectedColor = "var(--primary)";
const nonSelectedColor = "rgba(0,0,0,0.1)";
const dateFormat = "yyyy, MMM dd";

const renderItem = (item: FormLayoutComponentChildrenType) => {
  switch (item.controlName) {
    case FormControlNames.INPUTTEXTFIELD:
      return (
        <>
          <Input
            type={item.dataType}
            // fullWidth={true}
            placeholder={item.placeholder}
            disabled
            variant="outlined"
          />
        </>
      );

    case FormControlNames.INPUTMULTILINE:
      return (
        <>
          <Textarea
            // type={item.dataType}
            // fullWidth={true}
            // multiline={true}
            // minRows={item.rows}
            placeholder={item.placeholder}
            disabled
            variant="outlined"
          />
        </>
      );

    case FormControlNames.CHECKBOX:
      return (
        <>
          <div className="m-t-20 p-l-0">
            <Checkbox isDisabled style={{ marginLeft: "0px" }} />
          </div>
        </>
      );

    case FormControlNames.RADIOGROUP:
      return (
        <>
          {/* <FormControl> */}
          {/* <FormLabel>{item.labelName + (item.required?" *":"")}</FormLabel> */}
          <RadioGroup name={item.controlName + item.id}>
            {item.items?.map((i) => (
              <Radio value={i.value} key={i.value}>
                {i.label}
              </Radio>
            ))}
          </RadioGroup>
          {/* </FormControl> */}
        </>
      );

    case FormControlNames.SELECTDROPDOWN:
      return (
        <>
          {/* <FormControl style={{ minWidth: "100%" }}> */}
          {/* <InputLabel>{item.labelName + (item.required?" *":"")}</InputLabel> */}
          <Select
            style={{ minWidth: "100%" }}
            variant="outlined"
            disabled
            value={item.items && item.items[0].value}
          >
            {item.items?.map((i) => (
              <option key={i.value} value={i.value}>
                {i.label}
              </option>
            ))}
          </Select>
          {/* </FormControl> */}
        </>
      );

    case FormControlNames.DATEFIELD:
      return (
        <>
          <Input
            type={item.dataType}
            // fullWidth={true}
            placeholder={item.placeholder}
            disabled
            variant="outlined"
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

  const [{ isDragging }, drag, preview] = useDrag({
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

  return (
    <>
      <div
        ref={ref}
        className=""
        onClick={() => selectControl(item)}
        style={{ ...wrapperStyle, opacity }}
      >
        <div className="p-8">
          <div className="d-flex align-items-center justify-content-between">
            <h5>{item.labelName + (item.required ? " *" : "")}</h5>
            <div className="control-actions">
              <span style={{ cursor: "grab" }}>
                <i className="fa fa-ellipsis-v"></i>
                <i className="fa fa-ellipsis-v"></i>
              </span>
              <span onClick={handleDeleteControl}>
                <i className="fa fa-trash"></i>
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
        {/* <div className='col-1 p-10' style={{cursor: 'grab', backgroundColor: colBackgroundcolor, color}}>
        <div className='m-l-10 m-t-10'><i className='fa fa-ellipsis-v'></i><i className='fa fa-ellipsis-v'></i></div>
      </div>
      <div className='col-11 p-10' style={{position: 'relative'}}>
        <div>
          {renderItem(item)}
        </div>
        <div className='control-actions' style={{backgroundColor:colBackgroundcolor, color}}>
          <span onClick={()=>selectControl(item)}><i className='fa fa-pen'></i></span>
          <span><i className='fa fa-arrow-up'></i></span>
          <span><i className='fa fa-arrow-down'></i></span>
          <span onClick={()=>deleteControl(item.id,containerId)}><i className='fa fa-trash'></i></span>
        </div>
      </div> */}
      </div>
    </>
  );
}

export default ControlViewComponent;
