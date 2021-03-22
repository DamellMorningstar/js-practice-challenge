
// write code here
/*********************** FUNCTIONS ********************/
function getTraveler(){
    fetch('http://localhost:3000/travelers/1')
        .then(response => response.json())
        .then(travelerObject => {
            renderTravelerInfo(travelerObject)
            travelerObject.animalSightings.forEach(sightingObject => renderAnimalSighting(sightingObject))
        })
    }
    function renderTravelerInfo(travelerObject){
        const img = document.querySelector('#profile > img')
        img.src = travelerObject.photo
        img.alt = travelerObject.name
        const h2 = document.querySelector('#profile > h2')
        h2.textContent = travelerObject.name
        const em = document.querySelector('#profile > em')
        em.textContent = travelerObject.nickname
        const p = document.querySelector('#profile > p')
        p.textContent = `${travelerObject.likes} likes`
    }
    function renderAnimalSighting(sightingObject){
        const li = document.createElement('li')
        li.dataset.id = sightingObject.id
        li.innerHTML = `
        <p>${sightingObject.description}</p>
        <img src=${sightingObject.photo} alt=${sightingObject.species}/>
        <a href=${sightingObject.link} target=‘_blank’>Here’s a video about the ${sightingObject.species} species!</a>
        <p class=‘likes-display’>${sightingObject.likes} Likes</p>
        <button class=“like-button” type=“button”>Like</button>
        <button class=“delete-button” type=“button”>Delete</button>
        <button class=“toggle-update-form-button” type=“button”>Toggle Update Form</button>
        <form class=“update-form” style=“display: none;“>
        <input type=“text” value=“${sightingObject.description}“/>
        <input type=“submit” value=“Update description”>
        </form>`
        const ul = document.querySelector('ul#animals')
        ul.append(li)
    }
     /*********************** EVENT LISTENERS ********************/
    const newAnimalSightingForm = document.querySelector('form#new-animal-sighting-form')
    newAnimalSightingForm.addEventListener('submit', e =>{
        e.preventDefault()
        const speciesInput = e.target.species.value
        const videoInput = e.target.video.value
        const photoInput = e.target.photo.value
        const descriptionInput = e.target.description.value
        fetch('http://localhost:3000/animalSightings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                species: speciesInput,
                photo: photoInput,
                link: videoInput,
                description: descriptionInput,
                likes: 0,
                travelerId: 1
            })
        })
            .then(response => response.json())
            .then(newSightingObject => renderAnimalSighting(newSightingObject))
    })
    const travelerLikeButton = document.querySelector('#profile > button')
    travelerLikeButton.addEventListener('click', e =>{
        console.log('clicked')
        const likesPtag = e.target.previousElementSibling
        const newLikes = parseInt(likesPtag.textContent) + 1
        fetch('http://localhost:3000/travelers/1', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ likes: newLikes })
        })
        .then(response => response.json())
        .then(updatedTravelerObject => {
            likesPtag.textContent = `${updatedTravelerObject.likes} likes`
        })
    })
     /********************** APP INIT ********************/
    getTraveler()