export default function handleBoundedNumInput(e, setValue, maxValue){
    const isAllowedKey =
      (e.key >= "0" && e.key <= "9") ||
      e.key === "Backspace" ||
      (e.ctrlKey && e.key === "a") ||
      e.key === "Enter" ||
      (e.ctrlKey && e.key === "r") ||
      e.key === "Tab";
  
    if (!isAllowedKey) {
      e.preventDefault();
      return;
    }
  
    // Wait for DOM to update input value first
    setTimeout(() => {
      const inputValue = e.target.value ?? "";
  
      if (inputValue === "") {
        setValue("");
        return;
      }
  
      const parsed = parseInt(inputValue, 10);
      if (!isNaN(parsed) && parsed <= maxValue) {
        setValue(inputValue);
      } else {
        setValue("");
        e.target.value = "";
      }
    }, 0);
}  