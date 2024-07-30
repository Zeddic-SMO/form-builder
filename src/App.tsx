import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import "./App.css";
import FormBuilder from "./pages/FormBuilder";
import { store } from "./redux/store";
import { GlobalContextProvider } from "./context";

function App() {
  // const [step, setStep] = useState(1);
  // const [input, setInput] = useState("");
  // const [surveyId, setSurveyId] = useState("");

  // const handleInputChange = (e: any) => setInput(e.target.value);

  // const isError = input === "";

  // const submitHandler = () => {
  //   const id = generateID();
  //   setSurveyId(id);
  //   addNewSurvey(id, input);
  //   setStep(step + 1);
  // };

  // const surveyTemplate = (id: string) => {
  //   return allSurveryFormsTemplate.find((s) => s.id === id);
  // };

  // const elements = [
  //   {
  //     id: "01",
  //     icon: <span>✅</span>,
  //     name: "Multiple Choice",
  //   },
  //   {
  //     id: "02",
  //     icon: <span>📖</span>,
  //     name: "Multiple Choice",
  //   },
  //   {
  //     id: "03",
  //     icon: <span>⭐</span>,
  //     name: "Multiple Choice",
  //   },
  //   {
  //     id: "04",
  //     icon: <span>✔️</span>,
  //     name: "Checkbox",
  //   },
  //   {
  //     id: "05",
  //     icon: <span>⬇️</span>,
  //     name: "Dropdown",
  //   },
  //   {
  //     id: "06",
  //     icon: <span>📅</span>,
  //     name: "Date",
  //   },
  //   {
  //     id: "07",
  //     icon: <span>⌚</span>,
  //     name: "Time",
  //   },
  // ];

  return (
    <Provider store={store}>
      <ChakraProvider>
        <GlobalContextProvider>
          {/* <DndProvider backend={HTML5Backend}>
          <div className="border-b-2 border-black flex items-center justify-between px-4">
            <span
              className={`border-2 border-black m-2 p-2 rounded-md font-bold cursor-pointer ${
                step === 1 && "disabled-btn"
              }`}
              onClick={() => setStep(step - 1)}
            >
              ⬅️ Back
            </span>

            <span
              className="border-2 m-2 p-2 rounded-md font-bold cursor-pointer border-black"
              onClick={() => setStep(step + 1)}
            >
              Next ➡️
            </span>
          </div>

          {step === 1 && (
            <div className="mt-[3rem] w-[50rem] mx-auto">
              <FormControl isInvalid={isError}>
                <FormLabel>Name of Survey</FormLabel>
                <Input type="text" value={input} onChange={handleInputChange} />
                {!isError ? (
                  <FormHelperText>
                    Enter the your survey form title
                  </FormHelperText>
                ) : (
                  <FormErrorMessage>
                    Survey Form Name is Required.
                  </FormErrorMessage>
                )}
              </FormControl>

              <div className="flex justify-end my-[2rem]">
                <Button
                  onClick={submitHandler}
                  className="cursor-pointer"
                  colorScheme="blue"
                >
                  {" "}
                  Save
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <FormBuilder
              surveyId={surveyId}
              elements={elements}
              surveyTemplate={surveyTemplate}
            />
          )}
        </DndProvider> */}
          <FormBuilder />
        </GlobalContextProvider>
      </ChakraProvider>
    </Provider>
  );
}

export default App;
