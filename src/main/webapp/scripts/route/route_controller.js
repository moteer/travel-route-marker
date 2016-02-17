function displayControllFor(multiPolyLine) {


    var descriptionTextBox = document.getElementById("descriptionTextBox");
    descriptionTextBox.style.visibility = "visible";
    descriptionTextBox.value = getContentFor(multiPolyLine).description;

    var image = document.getElementById("image");
    image.style.visibility = "visible";

}
