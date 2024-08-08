import { FunctionComponent } from "react";
import { useDrop } from "react-dnd";
import { useAppGlobalContext } from "../context";
import {
  FormLayoutComponentChildrenType,
  FormLayoutComponentContainerType,
} from "../types/FormTemplateTypes";
import {
  FormContainerList,
  FormControlList,
  FormItemTypes,
} from "../utils/formBuilder.utils";
import ControlViewComponent from "./ControlViewComponent";

interface DropContainerComponentProps {
  accept: string;
  name?: string;
  index?: number;
  handleItemAdded?: (
    item: FormLayoutComponentChildrenType | FormLayoutComponentContainerType,
    containerId?: string
  ) => void;
  layout?: FormLayoutComponentChildrenType | FormLayoutComponentContainerType;
  selectedControl?:
    | null
    | FormLayoutComponentChildrenType
    | FormLayoutComponentContainerType;
  childrenComponents?: FormLayoutComponentChildrenType[];
  deleteContainer?: () => void;
  deleteControl?: (controlId: string, containerId: string) => void;
  selectControl?: (
    layout:
      | FormLayoutComponentChildrenType
      | FormLayoutComponentContainerType
      | undefined
  ) => void;
  moveControl?: (
    item: FormLayoutComponentChildrenType,
    dragIndex: number,
    hoverIndex: number,
    containerId: string
  ) => void;
}

const DropContainerComponent: FunctionComponent<DropContainerComponentProps> = (
  props
) => {
  const {
    accept,
    layout,
    childrenComponents,
    index,
    deleteContainer,
    deleteControl,
    selectControl,
    selectedControl,
    handleItemAdded,
    moveControl,
  } = props;

  const { containerId, setContainerId } = useAppGlobalContext();
  const defaultElement = FormControlList[0];
  const newSection = FormContainerList[0];

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: accept,
    drop: () => layout,
    collect: (monitor: any) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const isActive = canDrop && isOver;
  let backgroundColor =
    accept && accept === FormItemTypes.CONTROL ? "rgba(0,0,0,0)" : "#F4F4F4";

  let borderColor = "rgba(0,0,0,0.1)";
  const borderBase = "1px solid";
  let border;
  if (isActive) {
    backgroundColor = "rgba(46,212,182,0.4)";
  } else if (canDrop) {
    backgroundColor = "rgba(255,178,15,0.7)";
  }

  if (accept === FormItemTypes.CONTROL) {
    border = borderBase + " " + borderColor;
  }

  // Change border Color
  if (
    selectedControl &&
    selectedControl.itemType === layout?.itemType &&
    selectedControl.id === layout.id
  ) {
    borderColor = "rgb(255, 193, 7)";
    border = borderBase + " " + borderColor;
  }

  return (
    <>
      <div className="my-4 flex">
        <div
          className="w-[95%]"
          ref={drop}
          style={{ backgroundColor, borderRadius: "9px", border }}
        >
          {accept === FormItemTypes.CONTROL ? (
            <>
              <div onClick={() => layout && setContainerId(layout?.id)}>
                <div
                  onClick={() => {
                    if (selectControl) {
                      selectControl(layout);
                    }
                  }}
                  className="flex justify-between py-3 mb-4"
                  style={{
                    borderBottom: "1px solid rgba(0,0,0,0.1)",
                    cursor: "pointer",
                  }}
                >
                  <h5 className="px-4 font-bold">
                    Section {(index as number) + 1}
                  </h5>
                  <div
                    className="flex gap-4 mr-4"
                    style={{ fontSize: "1.1rem" }}
                  >
                    <span style={{ cursor: "grab" }}>📝</span>
                    <span onClick={deleteContainer}>🗑️</span>
                  </div>
                </div>
                <h4 className=" font-bold text-[1.4rem] px-[0.8rem]">
                  {(layout as FormLayoutComponentContainerType)?.heading}
                </h4>
                <p className="text-[1rem] px-[0.8rem]">
                  {(layout as FormLayoutComponentContainerType)?.subHeading}
                </p>
              </div>

              <div
                className="d-flex flex-column justify-content-center align-items-center"
                style={{ minHeight: "10vh", position: "relative" }}
              >
                {
                  <>
                    {childrenComponents?.map((component, ind) => {
                      return (
                        <ControlViewComponent
                          key={component.id}
                          item={component}
                          deleteControl={(controlId, containerId) => {
                            if (deleteControl) {
                              deleteControl(controlId, containerId);
                            }
                          }}
                          selectControl={(layout) => {
                            if (selectControl) {
                              selectControl(layout);
                            }
                          }}
                          selectedControl={selectedControl}
                          containerId={layout?.id as string}
                          index={ind}
                          moveControl={(
                            item,
                            dragIndex,
                            hoverIndex,
                            containerId
                          ) => {
                            if (moveControl) {
                              moveControl(
                                item,
                                dragIndex,
                                hoverIndex,
                                containerId
                              );
                            }
                          }}
                        />
                      );
                    })}
                  </>
                }
              </div>
            </>
          ) : null}
        </div>

        {layout?.id === containerId && handleItemAdded && (
          <div className="border rounded-md shadow-sm ml-1 w-[4%] bg-[#F4F4F4] flex flex-col gap-[10px] justify-end">
            <div
              className="bg-white rounded-lg flex justify-center items-center py-2 cursor-pointer hover:shadow-md"
              onClick={() => handleItemAdded(defaultElement, containerId)}
            >
              ➕
            </div>
            <div
              className="bg-white rounded-lg flex justify-center items-center py-2 cursor-pointer hover:shadow-md"
              onClick={() => handleItemAdded(newSection)}
            >
              ➖
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DropContainerComponent;
