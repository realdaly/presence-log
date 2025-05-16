export default function areFieldsFilled(...fields){
    return fields.every(field => field !== null && field !== "" && field !== undefined);
}  