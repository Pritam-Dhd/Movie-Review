// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Importing necessary libraries
import { 
    Firestore,
    getFirestore,
    query,
    collection,
    addDoc,
    onSnapshot,
    doc,
    updateDoc,
    deleteDoc
 } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvZ14XSkLijHkV4qu8pdGwZRjkdnwLAmk",
  authDomain: "project-c8cc6.firebaseapp.com",
  projectId: "project-c8cc6",
  storageBucket: "project-c8cc6.appspot.com",
  messagingSenderId: "309631616973",
  appId: "1:309631616973:web:483c327d33c82fd8ed6684"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Retriving database
const db = getFirestore(app);
const q = query(collection(db, "movie_reviews"));
let docId;
// Adding event listener to edit button
document.addEventListener('click', (e) => {
    if (e.target && e.target.id == 'Edit') {
        docId = e.target.parentElement.parentElement.getAttribute('data-id');
        let movieName = e.target.parentElement.parentElement.childNodes[1].innerText;
        let rating = e.target.parentElement.parentElement.childNodes[3].innerText;
        let directorName = e.target.parentElement.parentElement.childNodes[5].innerText;
        let releaseDate = e.target.parentElement.parentElement.childNodes[7].innerText;
        document.getElementById('movie_name').value = movieName;
        document.getElementById('rating').value = rating;
        document.getElementById('director_name').value = directorName;
        document.getElementById('release_date').value = releaseDate;
    }
});

// Add data or edit data to firestore
document.querySelector('#btn').addEventListener('click',(e)=>{
    e.preventDefault();
    let movie_name = document.getElementById('movie_name').value;
    let rating = document.getElementById('rating').value;
    let director_name = document.getElementById('director_name').value;
    let release_date = document.getElementById('release_date').value;
    if (docId) {
        // Updating the document in the collection
        updateDoc(doc(q, docId), {
            movie_name: movie_name,
            rating: rating,
            director_name: director_name,
            release_date: release_date
        });
    } else {
        addDoc(q, {
            movie_name: movie_name,
            rating: rating,
            director_name: director_name,
            release_date: release_date
        });
    }
    document.querySelector('form').reset();
})

// Retriving realtime data from firestore
const unsubscribe = onSnapshot(q, (querySnapshot) => {
    let data="";
    // Reading documents one by one
    querySnapshot.forEach((doc) => {
        // displaying data in table
        data+=
        `<tr data-id="${doc.id}">
            <td>${doc.data().movie_name}</td>
            <td>${doc.data().rating}</td>
            <td>${doc.data().director_name}</td>
            <td>${doc.data().release_date}</td>
            <td class="text-center"><a class='btn btn-info btn-xs' id='Edit' href="#"><span class="glyphicon glyphicon-edit"></span> Edit</a> <a href="#" class="btn btn-danger btn-xs" id='Delete'><span class="glyphicon glyphicon-remove"></span> Del</a></td>
        </tr>`;
    });
    // adding data to the table
    document.getElementById("movie").innerHTML=data;
     // initialize DataTables after adding data to the table
    $('#Table').DataTable();
});
// Adding event listener to delete button
document.addEventListener('click', (e) => {
    if (e.target && e.target.id == 'Delete') {
      // Getting the document id from the table row
      const docId = e.target.parentElement.parentElement.getAttribute('data-id');
      // Deleting the document from the collection
      deleteDoc(doc(q, docId));
    }
  });
  
