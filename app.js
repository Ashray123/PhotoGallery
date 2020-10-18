var firebaseConfig = {
    apiKey: "AIzaSyB0IuUbF0JdUcyjeOcb65tPlo7D_-ivv9U",
    authDomain: "photogallery-9444a.firebaseapp.com",
    databaseURL: "https://photogallery-9444a.firebaseio.com",
    projectId: "photogallery-9444a",
    storageBucket: "photogallery-9444a.appspot.com",
    messagingSenderId: "98302581289",
    appId: "1:98302581289:web:92729c311531a7eb079a38",
    measurementId: "G-VN95K8YC27"

  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
    var db = firebase.firestore();
    var files= [];
    var imgName;
    var artistName ;
    var imgUrl;

    
        var finalHTML= document.querySelector('#container');
    
        var dataRef =  db.collection("photos");
        dataRef.get().then((snapshot) => {
            snapshot.docs.forEach(doc => {              
                        finalHTML.innerHTML+="<div class='main'><img class='viewImage' src='"+doc.data().imgUrl+"' /><p>"+doc.data().Name+"</p><p>"+doc.data().Artist+"</p></div>";
                console.log(doc.data());
            })
            }).catch(function(error) {
                console.log("Error getting document:", error); 
        });
    
    


function handleSubmit(){
   files =document.getElementById('Photo').files;
    imgName = document.getElementById('name').value;
    artistName = document.getElementById('artistName').value;
   var uploadTask = firebase.storage().ref('Images/'+imgName+'.jpg').put(files[0]);
   uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, function(snapshot){
       var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
       console.log('Upload is ' + progress + '% done');
   },
   function(error){
    alert('error in upload , try again!');
},
function(){
    // Upload completed successfully, now we can get the download URL
    uploadTask.snapshot.ref.getDownloadURL().then(function(url){
    imgUrl = url;
    handleData();
    }
   );
});
}
function handleData(){
    db.collection("photos").add({
        Name: imgName,
        Artist: artistName,
        imgUrl: imgUrl
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        alert('Image added Successfully');
        location.reload();
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
        
    });
}