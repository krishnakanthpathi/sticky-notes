const NotesContainer = document.querySelector('.portfolio-container');
const AddNotebtn = document.querySelector('.addNote');
// const btn_add = document.querySelector('.btn-keka');

getNotes().forEach(note => {
    const noteElement = createNoteElement(note.id ,note.content);
    NotesContainer.appendChild(noteElement);
    // NotesContainer.insertBefore(noteElement,btn_add);

});
AddNotebtn.addEventListener("click", () => AddNotes());
function getNotes(){
    return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
}
// window.location.reload();
// window.location.href ="#portfolio";

function saveNotes(notes){
    localStorage.setItem("stickynotes-notes",JSON.stringify(notes));

}
function createNoteElement(id,content){
    const element = document.createElement("textarea");
    const divElement = document.createElement("div");
    divElement.setAttribute("class","col-lg-4 col-md-6 portfolio-item form-outline");
    divElement.appendChild(element);
    element.setAttribute("rows", "9");
    element.setAttribute("cols", "30");
    element.setAttribute("spellcheck", "false")
    element.classList.add(".textarea")
    element.style = "resize : none"
    element.value = content ;
    element.placeholder = "Empty sticky notes";
    element.addEventListener('change', () => {

        updateNotes(id,element.value);

    });
    element.addEventListener("dblclick",()=>{
        const doDelete = confirm("are want to delete this note");
        if (doDelete == true) {
            deleteNote(id,element);
            
        }
    })
    return divElement;// divElement.insertBefore(element) ;
}
function AddNotes(){
    const existingNotes = getNotes();
    const noteObject  ={
        id: Math.floor(Math.random() * 100000),
        content: ""
    };
    window.location.reload();
    window.location.href ="#portfolio";
    const notesElement = createNoteElement(noteObject.id,noteObject.content);
    NotesContainer.appendChild(notesElement);
    // NotesContainer.insertBefore(notesElement,btn_add);
    existingNotes.push(noteObject);
    saveNotes(existingNotes);


}
function updateNotes(id,newContent){
    const notes = getNotes();
    const targetNote = notes.filter(note => note.id == id)[0];
    targetNote.content = newContent;
    saveNotes(notes);
}
function deleteNote(id,element){
const notes = getNotes().filter(note => note.id != id) ;
saveNotes(notes);
window.location.reload();
window.location.href ="#portfolio";
NotesContainer.removeChild(element);

}