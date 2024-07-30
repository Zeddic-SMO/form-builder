import { useState } from "react";
import {
  FormLayoutComponentChildrenType,
  FormLayoutComponentContainerType,
  FormLayoutComponentsType,
  TemplateType,
} from "../types/FormTemplateTypes";
import { FormItemTypes, generateID } from "../utils/formBuilderEntity";
import { useAppGlobalContext } from "../context";

interface useFormBuilderProps {
  template: TemplateType;
}

const useFormBuilder = (props: useFormBuilderProps) => {
  const { setContainerId } = useAppGlobalContext();
  const [formLayoutComponents, setFormLayoutComponents] = useState<
    FormLayoutComponentsType[]
  >(props.template.formLayoutComponents);

  // Handles a Container or a Component added on the form builder
  const handleItemAdded = (
    item: FormLayoutComponentChildrenType | FormLayoutComponentContainerType,
    containerId?: string
  ) => {
    if (item.itemType === FormItemTypes.CONTAINER) {
      const newState = formLayoutComponents.slice();

      const newStep = {
        container: {
          ...(item as FormLayoutComponentContainerType),
          id: generateID(),
        },
        children: [],
      };
      const containerId = newStep.container.id;
      setContainerId(containerId);
      console.log(containerId, "iiii");

      newState.push(newStep);

      setFormLayoutComponents(newState);
    } else if (item.itemType === FormItemTypes.CONTROL) {
      const newState = formLayoutComponents.slice();
      console.log(newState, "state");

      const formContainerId = newState.findIndex(
        (f) => f.container.id === containerId
      );

      console.log(formContainerId, "id");

      const formContainer = { ...newState[formContainerId] };

      const obj = {
        ...(item as FormLayoutComponentChildrenType),
        id: generateID(),
        containerId: containerId,
      };

      // Create a deep copy of items.
      const childItem = item as FormLayoutComponentChildrenType;
      if (childItem.items) {
        obj.items = JSON.parse(JSON.stringify(childItem.items));
      }

      const newChildren = formContainer.children.slice();

      newChildren.push(obj as FormLayoutComponentChildrenType);
      formContainer.children = newChildren;
      newState[formContainerId] = formContainer;
      setFormLayoutComponents(newState);
    }
  };

  return {
    handleItemAdded,
    formLayoutComponents,
  };
};

export default useFormBuilder;
