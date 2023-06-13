const locations = ['🏢', '🏨', '🏦', '🏣', '🏰', '🏭', '🏫', '🏬', '🏥', '🏟️', '🏪']
let people = [
  {
    name: 'Jim',
    emoji: '🤴',
    isHunter: false,
    location: '',
  },
  {
    name: 'Bill',
    emoji: '🕵️',
    isHunter: false,
    location: '',
  },
  {
    name: 'Marie',
    emoji: '👩‍🍳',
    isHunter: false,
    location: '',
  },
  {
    name: 'Mykeal',
    emoji: '💂',
    isHunter: false,
    location: '',
  },
  {
    name: 'Phil',
    emoji: '🧜‍♂️',
    isHunter: false,
    location: '',
  },
  {
    name: 'Wilson',
    emoji: '🏐',
    isHunter: false,
    location: '',
  },
  {
    name: 'Wendy',
    emoji: '👩‍⚕️',
    isHunter: false,
    location: '',
  },
  {
    name: 'Robert',
    emoji: '👷',
    isHunter: false,
    location: '',
  },
  {
    name: 'Mary',
    emoji: '👩‍⚖️',
    isHunter: false,
    location: '',
  }
]

let hours = 8

const peopleElm = document.getElementById('people')

function drawTown() {
  const app = document.getElementById('app')
  // THEY SHOULD NOT TEMPLATE THEY SHOULD HARD CODE THIS TO HTML
  locations.forEach(l =>
    app.innerHTML += `
  <div class="col-4 mb-1">
  <div class="location p-2">
    <button class="btn btn-outline-danger" onclick="vampireAttack('${l}')">attack ${l}</button>
    <div id="${l}"></div>
    </div>
  </div>
    `
  )
}

function drawPeople() {
  locations.forEach(location => {
    let atLocation = people.filter(p => p.location == location)
    let peopleEmojis = atLocation.map(p => p.emoji)
    document.getElementById(location).innerText = peopleEmojis
  })
}

function drawHours() {
  document.getElementById('hours').innerText = 'hours left ' + hours
}

function selectHunter() {
  let rand = Math.floor(Math.random() * people.length)
  people[rand].isHunter = true
}

function vampireAttack(location) {
  console.log('attacking')
  let underAttack = people.filter(p => p.location == location) // finds the people at that location
  let vampireHunter = people.find(p => p.isHunter) // finds the hunter
  let allVampsNow = people.filter(p => !p.isHunter).every(p => p.emoji == '🦇') // checks to see if everyone who isn't the hunter is a bat

  if (vampireHunter.location == location && !allVampsNow) { // if the hunter is here and it everyone is not yet a bat you loose
    console.error('you have been slain by the vampire hunter', vampireHunter.emoji + vampireHunter.name)
  } else {
    underAttack.map(p => p.emoji = '🦇')
  }
  //checks for win
  if (people.every(p => p.emoji == '🦇')) {
    window.alert('All Vamps Now!')
  }
  // after every attack move the people, see if the hunter is at one of the locations and re-draw the people
  movePeople()
  drawPeople()
  checkForHunter()

  // checks for game over
  if (hours == 0) {
    window.alert('Game over, the Sun has risen 🌄')
  }
  hours--
  drawHours()
}

function movePeople() {
  people.forEach(person => {
    person.location = randomLocation()
  })
}

function checkForHunter() {
  let vampireHunter = people.find(p => p.isHunter)
  let batsAtLocation = people.filter(p => p.location == vampireHunter.location && p.emoji == '🦇')
  console.log('bats', batsAtLocation)
  if (batsAtLocation.length) {
    window.alert('The hunter has been spotted by a 🦇')
  }
}

function randomLocation() {
  return locations[Math.floor(Math.random() * locations.length)]
}

drawTown() // do not have them do this one

// things to start the game
drawHours()
selectHunter()
movePeople()
drawPeople()