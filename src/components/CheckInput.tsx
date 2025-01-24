function CheckInput(text : string | undefined) {
    if(text==undefined || text.includes("'") || text == "" || text==" " || text.includes("delete") || text.includes("insert")){
        return false;
    }
    return true;
}
export default CheckInput;