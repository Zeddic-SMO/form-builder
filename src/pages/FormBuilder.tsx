import { useEffect } from "react";
import FormBuilderEditor from "../component/FormBuilderEditor";
import { useAppGlobalContext } from "../context";
import {
  FormControlNames,
  FormItemTypes,
  generateID,
} from "../utils/formBuilderEntity";

const FormBuilder = () => {
  const template = null;
  const { setContainerId } = useAppGlobalContext();

  const defaultForm = {
    id: "0",
    formName: "",
    createdAt: 0,
    creator: "",
    formLayoutComponents: [
      {
        container: {
          id: generateID(),
          controlName: FormControlNames.STEPCONTAINER,
          displayText: "Workflow Step",
          itemType: FormItemTypes.CONTAINER,
          icon: "➕",
          heading: "Section Title",
          subHeading: "Description (If any)",
          element: "New Step",
        },
        children: [],
      },
    ],
    lastPublishedAt: 0,
    publishHistory: [],
    publishStatus: "draft",
    updatedAt: 0,
  };

  useEffect(() => {
    if (!template) {
      setContainerId(defaultForm.formLayoutComponents[0].container.id);
    }
  }, [template]);

  return (
    <>
      <h1 className="text-center font-bold underline">
        CircleHQ Survey Form Builder
      </h1>
      {/* {template ? ( */}
      <FormBuilderEditor template={template ? template : defaultForm} />
      {/* ) : null} */}
    </>
  );
};

export default FormBuilder;
