function contentCheck(inputText) {
    console.log("::: Running contentCheck :::", inputText);

    if(inputText.length == 0) {
        alert("Empty text field, please enter a written English text!");
        return true
    }
}

export { contentCheck }
