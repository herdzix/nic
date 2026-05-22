// Selector płci
var selector = document.querySelector(".selector_box");
selector.addEventListener('click', () => {
    selector.classList.toggle("selector_open");
});

var sex = "m";
document.querySelectorAll(".selector_option").forEach((option) => {
    option.addEventListener('click', () => {
        sex = option.id;
        document.querySelector(".selected_text").innerHTML = option.innerHTML;
    });
});

// Pola daty
document.querySelectorAll(".date_input").forEach((element) => {
    element.addEventListener('click', () => {
        document.querySelector(".date").classList.remove("error_shown");
    });
});

// Upload zdjęcia przez Uploadcare
var upload = document.querySelector(".upload");
var imageInput = document.createElement("input");
imageInput.type = "file";
imageInput.accept = ".jpeg,.png,.gif,.jpg";

upload.addEventListener('click', () => {
    imageInput.click();
    upload.classList.remove("error_shown");
});

imageInput.addEventListener('change', () => {
    upload.classList.remove("upload_loaded");
    upload.classList.add("upload_loading");
    upload.removeAttribute("selected");

    var file = imageInput.files[0];
    var data = new FormData();
    data.append("UPLOADCARE_PUB_KEY", "b4bf47da551cf88c9725"); // Twój publiczny klucz
    data.append("file", file);

    fetch("https://upload.uploadcare.com/base/", {
        method: "POST",
        body: data
    })
    .then(res => {
        if (!res.ok) throw new Error("HTTP error " + res.status);
        return res.json();
    })
    .then(response => {
        var fileId = response.file;
        var url = "https://ucarecdn.com/" + fileId + "/";
        upload.setAttribute("selected", url);
        upload.que
