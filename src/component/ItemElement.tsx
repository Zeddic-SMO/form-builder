const ItemElement = ({
  item,
  index,
  surveryFormValues,
  handleElementChange,
  handleCheckboxChange,
}: any) => {
  switch (item.dataType) {
    case "text":
      return (
        <div key={index} className="flex flex-col gap-2">
          <label>{item.labelName}</label>
          <input
            className="border p-2 outline-none rounded-md"
            type="text"
            name={item.controlName}
            value={surveryFormValues[item.controlName] || ""}
            onChange={(e) =>
              handleElementChange(item.controlName, e.target.value)
            }
          />
        </div>
      );

    case "textarea":
      return (
        <div key={index} className="flex flex-col gap-2">
          <label>{item.labelName}</label>
          <textarea
            className="border p-2 rounded-md"
            name={item.controlName}
            value={surveryFormValues[item.controlName] || ""}
            onChange={(e) =>
              handleElementChange(item.controlName, e.target.value)
            }
          />
        </div>
      );

    case "radio":
      return (
        <div key={index} className="flex flex-col gap-2">
          <label>{item.labelName}</label>
          {item.items &&
            item.items.map((option: any, optIndex: any) => {
              return (
                <div key={optIndex} className="flex gap-2">
                  <input
                    type="radio"
                    name={item.controlName}
                    value={option.value}
                    id={option.value}
                    checked={surveryFormValues[item.controlName] === option}
                    onChange={(e) =>
                      handleElementChange(item.controlName, e.target.value)
                    }
                  />
                  <label htmlFor={option.value}>{option.label}</label>
                </div>
              );
            })}
        </div>
      );

    case "select":
      return (
        <div key={index} className="flex flex-col gap-2">
          <label>{item.labelName}</label>

          <div className="flex gap-2">
            <select
              className="border w-full p-2 rounded-md outline-none"
              name={item.controlName}
              value={surveryFormValues[item.controlName] || ""}
              onChange={(e) =>
                handleElementChange(item.controlName, e.target.value)
              }
            >
              <option value="">Select an option</option>
              {item.items.map((option: any, optIndex: any) => (
                <option key={optIndex} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      );

    case "checkbox":
      return (
        <div key={index} className="flex flex-col gap-2">
          <label>{item.labelName}</label>
          {item.items.map((option: any, optIndex: any) => (
            <div key={optIndex} className="flex items-center gap-2">
              <input
                type="checkbox"
                name={item.controlName}
                value={option.value}
                checked={(surveryFormValues[item.controlName] || []).includes(
                  option.value
                )}
                onChange={(e) =>
                  handleCheckboxChange(
                    item.controlName,
                    option.value,
                    e.target.checked
                  )
                }
              />
              <label>{option.label}</label>
            </div>
          ))}
        </div>
      );

    case "date":
      return (
        <div key={index} className="flex flex-col gap-2">
          <label>{item.labelName}</label>
          <input
            className="border p-2 rounded-md"
            type="date"
            name={item.controlName}
            value={surveryFormValues[item.controlName] || ""}
            onChange={(e) =>
              handleElementChange(item.controlName, e.target.value)
            }
          />
        </div>
      );

    case "time":
      return (
        <div key={index} className="flex flex-col gap-2">
          <label>{item.labelName}</label>
          <input
            className="border p-2 rounded-md"
            type="time"
            name={item.controlName}
            value={surveryFormValues[item.controlName] || ""}
            onChange={(e) =>
              handleElementChange(item.controlName, e.target.value)
            }
          />
        </div>
      );

    default:
      return null;
  }
};

export default ItemElement;
