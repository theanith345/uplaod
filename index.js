let fileInput = document.getElementById("file");
let previewImage = document.getElementById("previewFile");
let btnUpload = document.getElementById("btnUpload");
let loading = document.getElementById("loading"); 
let selectedFile;

fileInput.addEventListener("change", (event) => {
    selectedFile = event.target.files[0];

    if (!selectedFile) return;

    let reader = new FileReader();
    reader.onload = function (e) {
        previewImage.src = e.target.result;
    };

    reader.readAsDataURL(selectedFile);
     
});

btnUpload.addEventListener("click", async()=>{
   if(!selectedFile){
    alert("Plaese SelescteFile");
    return;
   }

   const formData = new FormData();
   formData.append("file",selectedFile);
   formData.append("upload_preset","DUMAMEYY");
   formData.append("cloud_name" ,"do67lwu3m");
   
    try {
              loading.classList.remove("hidden");
              loading.classList.add("flex");

    const response = await fetch(
        "https://api.cloudinary.com/v1_1/do67lwu3m/image/upload",
        {
            method: "POST",
            body: formData,
        }
    );

    const data = await response.json();
    console.log("Image uploaded :" + data.secure_url);

} catch (Error) {
    console.log("Error:", Error);
} finally {
    loading.classList.remove("flex");
    loading.classList.add("hidden");
}

});