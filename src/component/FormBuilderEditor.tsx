import { FC, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TemplateType } from "../types/FormTemplateTypes";
import DropContainerComponent from "./DropContainerComponent";
import { FormControlList, FormItemTypes } from "../utils/formBuilderEntity";
import useFormBuilder from "../hooks/useFormBuilder";
import { useAppGlobalContext } from "../context";

interface FormBuilderEditorProps {
  template: TemplateType;
}
const FormBuilderEditor: FC<FormBuilderEditorProps> = (props) => {
  const { containerId } = useAppGlobalContext();
  const { formLayoutComponents, handleItemAdded } = useFormBuilder({
    template: props.template,
  });

  const [showElements, setShowElements] = useState<boolean>(false);

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        
        <div className="w-[50rem] mx-auto my-10">
          {formLayoutComponents.map((layout, ind) => {
            return (
              <DropContainerComponent
                key={layout.container.id}
                index={ind}
                layout={layout.container}
                // selectedControl={selectedControl}
                childrenComponents={layout.children}
                // deleteContainer={deleteContainer}
                // deleteControl={deleteControl}
                // selectControl={selectControl}
                accept={FormItemTypes.CONTROL}
                // moveControl={moveControl}
              />
            );
          })}
        </div>

        <div className="w-[50rem] mx-auto bg-[#F4F4F4] rounded-md shadow-sm">
          <h1 className="text-center p-3 font-bold">Add Element</h1>
          <div className="relative">
            <p className="text-center mt-2">
              <span
                className="border-2 shadow-lg bg-[#F4F4F4] rounded-full p-1 border-black text-black cursor-pointer"
                onClick={() => setShowElements((prev) => !prev)}
              >
                +
              </span>
            </p>
          </div>
        </div>

        <div className="w-[50rem] mx-auto mt-6">
          {showElements && containerId && (
            <>
              <div className="border p-4 rounded-md grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {FormControlList.map((el) => {
                  return (
                    <div
                      className="bg-[#F4F4F4] border rounded-md p-2 cursor-pointer hover:shadow-md"
                      onClick={() => handleItemAdded(el, containerId)}
                    >
                      <p className="text-center">{el.icon}</p>
                      <h1 className="text-center">{el.element}</h1>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

      </div>
    </DndProvider>
  );
};

export default FormBuilderEditor;
