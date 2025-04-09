const name= document.querySelector("#courseName");
const category= document.querySelector("#courseCategory");
const price= document.querySelector("#coursePrice");
const description= document.querySelector("#courseDescription");
const capacity= document.querySelector("#courseCapacity");

const addcource =document.querySelector("#click");
const deleteallbtn=document.querySelector("#deleteBtn");
let courses=[];

if(localStorage.getItem("courses") !=null){
    courses= JSON.parse(localStorage.getItem("courses"));
    display();

}
addcource.addEventListener("click",(e)=>{
    e.preventDefault();
    const course={
        name:name.value,
        category:category.value,
        price:price.value,
        description:description.value,
        capacity:capacity.value


    }
    courses.push(course);
    localStorage.setItem("courses",JSON.stringify(courses));
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "new course added"
      });
      
    display();
});

function display(){
    const result= courses.map((course,index)=>{
        return `
        <tr>
        <td>${index}</td>
        <td>${course.name}</td>
        <td>${course.category}</td>
        <td>${course.price}</td>
        <td>${course.description}</td>
        <td>${course.capacity}</td>
        <td><a href='#' class ='btn btn-success'>update</a></td>
        <td><button onclick='deletecourse(${index})' class ='btn btn-danger'>delete</button></td>
        </tr>
        `
    }).join('');
    document.querySelector("#data").innerHTML=result;
}

function deletecourse(index){

    Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            courses.splice(index,1);
            localStorage.setItem("courses",JSON.stringify(courses));
            display();
        
          Swal.fire("Saved!", "", "success");
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
      
}
deleteallbtn.addEventListener('click',()=>{
    Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            courses=[];
            localStorage.setItem("courses",courses);
            display();
        
          Swal.fire("Saved!", "", "success");
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
})