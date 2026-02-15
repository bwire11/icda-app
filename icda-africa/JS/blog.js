fetch('data/blogposts.json')
.then(response => response.json())
.then(posts => {
    const container = document.getElementById("blogContainer");

    posts.forEach(post => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("card", "fade-in");

        blogCard.innerHTML = `
            <img src="${post.image}" alt="">
            <h3>${post.title}</h3>
            <small>${post.date}</small>
            <p>${post.excerpt}</p>
        `;

        container.appendChild(blogCard);
    });
});
