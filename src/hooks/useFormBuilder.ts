import { useState } from "react";
import { useAppGlobalContext } from "../context";
import {
  FormLayoutComponentChildrenType,
  FormLayoutComponentContainerType,
  FormLayoutComponentsType,
  TemplateType,
} from "../types/FormTemplateTypes";
import { FormItemTypes, generateID } from "../utils/formBuilder.utils";

interface useFormBuilderProps {
  template: TemplateType;
}

const useFormBuilder = (props: useFormBuilderProps) => {
  const { containerId, setContainerId, setAllFormLayoutComponents } =
    useAppGlobalContext();

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

      newState.push(newStep);

      setFormLayoutComponents(newState);
      setAllFormLayoutComponents(newState);
    } else if (item.itemType === FormItemTypes.CONTROL) {
      const newState = formLayoutComponents.slice();

      const formContainerId = newState.findIndex(
        (f) => f.container.id === containerId
      );

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
      setAllFormLayoutComponents(newState);
    }
  };

  // Delete a container from the layout
  const deleteContainer = () => {
    if (!containerId) return;
    if (confirm("Are you sure you want to delete container?")) {
      const newState = formLayoutComponents.filter(
        (comp) => comp.container.id !== containerId
      );
      setFormLayoutComponents(newState);
    }
  };

  return {
    handleItemAdded,
    deleteContainer,
    formLayoutComponents,
  };
};

export default useFormBuilder;
