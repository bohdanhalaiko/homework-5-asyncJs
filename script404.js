const submit = document.querySelector('input[type="submit"]');
const allPosts = document.getElementById('all-post');
const singlePost = document.getElementById('single-post');
const numberId = document.getElementById('number-id');
const output = document.querySelector('.output');

let url = `https://jsonplaceholder.typicode.com/posts/`;
let id = false;

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
    if (!id) {
        numberId.value = '';
    } else if (numberId.value === ''){
        return print();
    }
    fetch(url + numberId.value)
        .then(response => {
            if (response.status !== 200) return; // return undefined => data
            return response.json();
        })
        .then(data => print(data));
});

function print(data) {
    if (!data) { // if data === undefined
        output.innerHTML = '<h3>Nothing found, or an invalid ID</h3>';
        return numberId.value = '';
    }
    if (!Array.isArray(data)) data = [data]; // if (data !== 'Array') data => [data]
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
