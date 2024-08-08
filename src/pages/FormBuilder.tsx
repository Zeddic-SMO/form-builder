import {
  Button,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import FormBuilderEditor from "../component/FormBuilderEditor";
import ItemElement from "../component/ItemElement";
import { useAppGlobalContext } from "../context";
import {
  FormControlNames,
  FormItemTypes,
  generateID,
} from "../utils/formBuilder.utils";

const FormBuilder = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const template = null;
  const {
    setContainerId,
    allFormLayoutComponents: formLayoutComponents,
    handleSaveForm,
    surveryFormValues,
    handleElementChange,
    handleCheckboxChange,
  } = useAppGlobalContext();

  const [section, setSection] = useState(0);

  const component = formLayoutComponents && formLayoutComponents[section];

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

  const nextPrevIndex = (val: number) => {
    setSection((prev) => prev + val);
  };

  return (
    <>
      <div className="flex justify-evenly h-[60px] items-center border-b-2 sticky top-0 z-50 bg-white">
        <h1>CircleHQ</h1>
        <h1 className="text-center">CircleHQ Survey Form Builder</h1>
        <div className="flex  gap-4">
          <Button onClick={onOpen}>Preview</Button>
          <Button colorScheme="blue" onClick={handleSaveForm}>
            Save
          </Button>
        </div>
      </div>

      <FormBuilderEditor template={template ? template : defaultForm} />

      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={"md"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Survery Form Preview</DrawerHeader>
          <div className="p-6 overflow-y-auto">
            {formLayoutComponents && formLayoutComponents.length > 0 ? (
              <>
                <div>
                  <div className="main-form">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();

                        const objectString = JSON.stringify(
                          surveryFormValues,
                          null,
                          2
                        );
                        alert(objectString);
                      }}
                      style={{ minWidth: "100%" }}
                    >
                      <div className="text-center font-bold border-b p-2">
                        Section {section + 1}
                      </div>

                      <div className="my-4">
                        <h4 className="font-bold text-[18px]">
                          {component && component.container.heading}
                        </h4>
                        <p className="text-[14px]">
                          {component && component.container.subHeading}
                        </p>
                      </div>

                      {component &&
                        component.children.map((child, idx) => (
                          <div key={child.id} className="my-4">
                            <ItemElement
                              key={child.id}
                              item={child}
                              index={idx}
                              surveryFormValues={surveryFormValues}
                              handleElementChange={handleElementChange}
                              handleCheckboxChange={handleCheckboxChange}
                            />
                          </div>
                        ))}

                      <div className="flex justify-end">
                        {section !== 0 && (
                          <input
                            type="button"
                            className="border-2 py-2 px-4 rounded-lg mr-4"
                            value="Back"
                            onClick={() => {
                              nextPrevIndex(-1);
                            }}
                          />
                        )}
                        {section < formLayoutComponents.length - 1 && (
                          <input
                            type="button"
                            className="border-2 py-2 px-4 rounded-lg mr-4"
                            value="Next"
                            onClick={() => {
                              nextPrevIndex(1);
                            }}
                          />
                        )}
                        {section + 1 === formLayoutComponents.length && (
                          <input
                            type="submit"
                            className="border-2 py-2 px-4 rounded-lg mr-4 bg-blue-500 text-white"
                            value="Submit"
                          />
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="w-[50rem] mx-auto my-10 border p-4">
                  <p>You need to add elements to preview.</p>
                </div>
              </>
            )}
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default FormBuilder;
