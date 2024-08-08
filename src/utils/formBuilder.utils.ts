export const generateID = () => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

export const FormItemTypes = {
  CONTROL: "control",
  CONTAINER: "container",
};

export const FormControlNames = {
  STEPCONTAINER: "step-container",
  INPUTTEXTFIELD: "text",
  INPUTMULTILINE: "textarea",
  CHECKBOX: "checkbox",
  RADIOGROUP: "radio",
  SELECTDROPDOWN: "select",
  DATEFIELD: "date",
  TIMEFIELD: "time",
};

export const FormTextDataTypes = {
  TEXT: "text",
  TEXTAREA: "textarea",
  RADIO: "radio",
  SELECT: "select",
  CHECKBOX: "checkbox",
  DATE: "date",
  TIME: "time",
};

export const FormContainerList = [
  {
    id: "",
    controlName: FormControlNames.STEPCONTAINER,
    displayText: "Workflow Step",
    itemType: FormItemTypes.CONTAINER,
    icon: "🏚️",
    heading: "Container Heading",
    subHeading: "Container SubHeading",
  },
];

export const FormControlList = [
  {
    id: generateID(),
    controlName: FormControlNames.INPUTTEXTFIELD,
    displayText: "Text",
    placeholder: "Placeholder for Text Field",
    description: "Some Description about the field",
    labelName: "Label for Short Answer",
    itemType: FormItemTypes.CONTROL,
    dataType: FormTextDataTypes.TEXT,
    icon: "📝",
    required: false,
    containerId: "",
    element: "Short Answer",
  },
  {
    id: generateID(),
    controlName: FormControlNames.INPUTMULTILINE,
    displayText: "Open Ended",
    description: "Some Description about the field",
    placeholder: "Please write your notes here.",
    labelName: "Label of Open Ended",
    rows: 4,
    itemType: FormItemTypes.CONTROL,
    dataType: FormTextDataTypes.TEXTAREA,
    icon: "📖",
    required: false,
    containerId: "",
    element: "Open Ended",
  },
  {
    id: generateID(),
    controlName: FormControlNames.RADIOGROUP,
    displayText: "Radio",
    description: "Some Description about the field",
    labelName: "Label for Radio",
    itemType: FormItemTypes.CONTROL,
    dataType: FormTextDataTypes.RADIO,
    icon: "🔘",
    required: false,
    items: [
      {
        id: generateID(),
        value: "Button__-1",
        label: "Button 1",
      },
      {
        id: generateID(),
        value: "Button__-2",
        label: "Button 2",
      },
    ],
    containerId: "",
    element: "Radio",
  },
  {
    id: generateID(),
    controlName: FormControlNames.SELECTDROPDOWN,
    displayText: "Dropdown",
    description: "Some Description about the field",
    labelName: "Label for Dropdown",
    itemType: FormItemTypes.CONTROL,
    dataType: FormTextDataTypes.SELECT,
    icon: "⬇️",
    required: false,
    items: [
      {
        id: generateID(),
        value: "Option 1",
        label: "Option 1",
      },
      {
        id: generateID(),
        value: "Option 2",
        label: "Option 2",
      },
      {
        id: generateID(),
        value: "Option 3",
        label: "Option 3",
      },
    ],
    containerId: "",
    element: "Dropdown",
  },
  {
    id: generateID(),
    controlName: FormControlNames.CHECKBOX,
    displayText: "Checkbox",
    description: "Some Description about the field",
    labelName: "Label for Checkbox",
    placeholder: "Place Holder Text",
    itemType: FormItemTypes.CONTROL,
    dataType: FormTextDataTypes.CHECKBOX,
    icon: "✔️",
    required: false,
    items: [
      {
        id: generateID(),
        value: "Option A",
        label: "Option A",
      },
      {
        id: generateID(),
        value: "Option B",
        label: "Option B",
      },
      {
        id: generateID(),
        value: "Option C",
        label: "Option C",
      },
      {
        id: generateID(),
        value: "Option D",
        label: "Option D",
      },
    ],
    containerId: "",
    element: "Checkbox",
  },
  {
    id: generateID(),
    controlName: FormControlNames.DATEFIELD,
    displayText: "Date",
    description: "Some Description about the field",
    labelName: "Label for Date",
    itemType: FormItemTypes.CONTROL,
    dataType: FormTextDataTypes.DATE,
    icon: "📅",
    required: false,
    containerId: "",
    element: "Date",
  },
  {
    id: generateID(),
    controlName: FormControlNames.TIMEFIELD,
    displayText: "Time",
    description: "Some Description about the field",
    labelName: "Label for Time",
    itemType: FormItemTypes.CONTROL,
    dataType: FormTextDataTypes.TIME,
    icon: "⌚",
    required: false,
    containerId: "",
    element: "Time",
  },
];
