const submit = document.querySelector('input[type="submit"]');
const allPosts = document.getElementById('all-post');
const singlePost = document.getElementById('single-post');
const numberId = document.getElementById('number-id');
const output = document.querySelector('.output');

let dataPosts;
let id = false;

fetch(`https://jsonplaceholder.typicode.com/posts/`)
    .then(response => response.json())
    .then(data => dataPosts = data);

allPosts.addEventListener('click', () => { // Get all posts
    if (allPosts.checked) {
        numberId.style.display = 'none';
        id = false;
    }
});

singlePost.addEventListener('click', () => { // Get a single post
    if (singlePost.checked) {
        numberId.style.display = 'inline-block';
        id = true;
    }
});

submit.addEventListener('click', () => { // submit
    let data = [...dataPosts];
    if (id) {
        data = data.filter(el => el.id === +numberId.value);
        if (!data.length) {
            output.innerHTML = '<h3>Nothing found, or an invalid ID</h3>';
            return numberId.value = '';
        }
    }
    print(data)
}); 

function print(data) {
    let result = ''
    data.forEach(el => {
        result +=
            `<div id="${el.id}" style="border: 1px solid black">
            <h3>Id: ${el.id}</h3>
            <p>User: ${el.userId}</p>
            <p>Title: ${el.title}</p>
            <p>Body: ${el.body}</p>
        </div>`;
    });
    output.innerHTML = result;
}