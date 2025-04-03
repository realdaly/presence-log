export default function handleNumInput(e, setValue){
    const isAllowedKey = (e.key >= "0" && e.key <= "9") || e.key === "Backspace" || (e.ctrlKey && e.key === "a") || e.key === "Enter" || (e.ctrlKey && e.key === "r") || e.key === "Tab"
    
    if(!isAllowedKey) {
        e.preventDefault()
    } else{
        setValue(e.target.value ?? "")
    }
}