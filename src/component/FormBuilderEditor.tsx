import { FC, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import useFormBuilder from "../hooks/useFormBuilder";
import { TemplateType } from "../types/FormTemplateTypes";
import { FormItemTypes } from "../utils/formBuilder.utils";
import DropContainerComponent from "./DropContainerComponent";
import { useAppGlobalContext } from "../context";

interface FormBuilderEditorProps {
  template: TemplateType;
}
const FormBuilderEditor: FC<FormBuilderEditorProps> = (props) => {
  const { formLayoutComponents, handleItemAdded, deleteContainer } =
    useFormBuilder({
      template: props.template,
    });

  const { allFormLayoutComponents, setAllFormLayoutComponents } =
    useAppGlobalContext();

  useEffect(() => {
    setAllFormLayoutComponents(formLayoutComponents);
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <div className="w-[50rem] mx-auto my-10">
          {allFormLayoutComponents &&
            allFormLayoutComponents.map((layout, ind) => {
              return (
                <DropContainerComponent
                  key={layout && layout.container.id}
                  index={ind}
                  layout={layout && layout.container}
                  handleItemAdded={handleItemAdded}
                  // selectedControl={selectedControl}
                  childrenComponents={layout && layout.children}
                  deleteContainer={deleteContainer}
                  // deleteControl={deleteControl}
                  // selectControl={selectControl}
                  accept={FormItemTypes.CONTROL}
                  // moveControl={moveControl}
                />
              );
            })}
        </div>
      </div>
    </DndProvider>
  );
};

export default FormBuilderEditor;
