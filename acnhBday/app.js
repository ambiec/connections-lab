console.log("Loading...");
let inputMonth;

//Make sure page has loaded
window.addEventListener('load', () => {
    console.log("Page has loaded");

    //request data after loading
    fetch("villagers.json")
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        //access data
        .then(data => {
            acnhData = data;

            //#Source chatgpt
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    const element = data[key];
                    const fileName = element['file-name'];

                    console.log(fileName);
                }
            }
        })

        .catch(function (error) {
            console.log(error);
        });

    /////////////////
    // DATE PICKER //
    /////////////////

    //#Source chatgpt 
    // Get a reference to the select element for months
    const monthSelect = document.getElementById('month');

    // Generate options for months (1 to 12)
    for (let i = 1; i <= 12; i++) {
        const option = document.createElement('option');
        option.value = i.toString().padStart(2, '0'); // Add leading zero for single-digit months
        option.text = option.value; // Use the same text as the value
        monthSelect.appendChild(option);
    }

    // Get a reference to the select element for dates
    const daySelect = document.getElementById('day');

    // Generate options for days 1 to 31
    for (let i = 1; i <= 31; i++) {
        const option = document.createElement('option');
        option.value = i.toString().padStart(2, '0'); // Add leading zero for single-digit days
        option.text = option.value; // Use the same text as the value
        daySelect.appendChild(option);
    }

    //#Source https://www.educative.io/answers/how-to-get-the-selected-value-of-the-dropdown-list-in-javascript
    // monthSelect.onchange = (ev) =>{
    //   console.log("Selected value is: " + monthSelect.value);
    // }
    // daySelect.onchange = (ev) =>{
    //     console.log("Selected value is: " + daySelect.value);
    //   }

    // Reference button

    const submitButton = document.getElementById('submitButton');

    // Click event listener
    submitButton.addEventListener('click', () => {
        // selected month and day values
        const selectedMonth = monthSelect.value;
        const selectedDay = daySelect.value;

        // Combine them and format as "mm/dd"
        const formattedBirthday = `${parseInt(selectedDay)}/${parseInt(selectedMonth)}`;

        // Now, formattedBirthday contains the desired "mm/dd" format
        console.log(formattedBirthday);

        inputMonth = parseInt(selectedMonth);

        //////////////////
        //CHECK BIRTHDAY//
        //////////////////

        // Assuming your JSON data is stored in the 'data' variable
        const inputDate = formattedBirthday; // Replace with the input date

        for (const villagerKey in acnhData) { //acnhData already defined as data
            if (acnhData.hasOwnProperty(villagerKey)) {
                const villager = acnhData[villagerKey];
                const villagerBday = villager.birthday;
                const name = villager.name['name-USen'];
                // const pic = villager.image_uri; doesnt work hahahhaahha
                const personality = villager.personality.toLowerCase();
                const species = villager.species.toLowerCase();
                const hobby = villager.hobby.toLowerCase();
                const gender = villager.gender;
                const saying = villager.saying;

                let pronoun;
                if (gender === 'Male') {
                    pronoun = 'His';
                } else {
                    pronoun = 'Her';
                }


                //does villagerBday match the inputed date?
                if (villagerBday === inputDate) {
                    console.log(`${villager.name['name-USen']}'s birthday matches the input date (${inputDate})`);

                    //if so, check if intro has been created already
                    let intro = document.querySelector(".intro");
                    let description = document.querySelector(".description")

                    //if not, create elements for the villager data
                    if (!intro) {
                        // console.log("no intro");
                        let intro = document.createElement("p");
                        let introText = `Meet your birthday twin, <span class="highlight">${name}</span>!`; //add json name, span?
                        intro.innerHTML = introText;

                        let villagerContainer = document.getElementById('villagerContainer');
                        villagerContainer.appendChild(intro);
                        intro.setAttribute("class", "intro");  //class="intro"


                        //Image of villager is created in villagerData
                        let villagerData = document.getElementById('villagerData');
                        villagerContainer.insertBefore(intro, villagerData); //intro goes before villagerData

                        let headshot = document.createElement("img");
                        let headshotPic = "assets/Loading.JPG"; //to be replaced with json data
                        headshot.src = headshotPic;

                        villagerData.appendChild(headshot);
                        headshot.setAttribute("class", "headshot"); //class="headshot"

                        //Info about villager is created in villagerData
                        //villagerData already defined
                        let description = document.createElement("p");
                        let descriptionText = `<span class="highlight">${name}</span> 
                    is a <span class="highlight">${personality}</span> <span class="highlight">${species}</span>, 
                    who loves <span class="highlight">${hobby}</span>! 
                    ${pronoun} favorite saying is '<span class="highlight">${saying}</span>'`; //add json data - gender, personality, species, hobby, saying
                        description.innerHTML = descriptionText;

                        villagerData.appendChild(description);
                        description.setAttribute("class", "description"); //class="description"

                    } else {
                        // just replace data
                        let introText = `Meet your birthday twin, <span class="highlight">${name}</span>!`;
                        intro.innerHTML = introText;

                        let descriptionText = `<span class="highlight">${name}</span> 
                is a <span class="highlight">${personality}</span> <span class="highlight">${species}</span>, 
                who loves <span class="highlight">${hobby}</span>! 
                ${pronoun} favorite saying is '<span class="highlight">${saying}</span>'`;
                        description.innerHTML = descriptionText;
                    }
                }
            }
        }
    })
})


///////////////
//p5 function//
///////////////

//Seasonal Effects

let leafImg;
let shellImg;
let snowflakes = [];
let petals = [];
let leaves = [];
let shells = [];

function preload() {
    // Load the PNG image(s) of leaves
    leafImage = loadImage('assets/Leaf.svg');
    shellImage = loadImage('assets/Scallop.png');
}

//setup canvas under other elements
function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('canvasContainer');
    canvas.style('position', 'absolute');
    canvas.style('z-index', '-1');
    background(255, 255, 255, 0);
}

function draw() {
    if (inputMonth >= 12 || inputMonth <= 2) {
        clear();
        let t = frameCount / 60; // update time

        // create a random number of snowflakes each frame
        for (let i = 0; i < random(5); i++) {
            snowflakes.push(new snowflake()); // append snowflake object
        }

        // loop through snowflakes with a for..of loop
        for (let flake of snowflakes) {
            flake.update(t); // update snowflake position
            flake.display(); // draw snowflake
        }
    } else if (inputMonth >= 3 && inputMonth <= 5) {
        clear();
        let t = frameCount / 100; //updates time

        for (var i = 0; i < random(1); i++) {
            petals.push(new petal()); //append petal object
        } //random number of petals each frame

        //loop through petals
        for (let blossom of petals) {
            blossom.update(t); //update petal position
            blossom.display(); //draw petal
        }

    } else if (inputMonth >= 9 && inputMonth <= 11) {
        clear();
        let t = frameCount / 500; //updates time

        for (var i = 0; i < random(1); i++) {
            if (random(3) < 0.5) {
                leaves.push(new leaf());
            }

        } //random number of leaves each frame

        //loop through leaves
        for (let blade of leaves) {
            blade.update(t); //update leav position
            blade.display(); //draw leaf
        }
    } else if (inputMonth >= 6 && inputMonth <= 8) {
        clear();
        let t = frameCount / 1000; //updates time

        for (var i = 0; i < random(1); i++) {
            if (random(10) < 0.3) {
                shells.push(new shell());
            }
        } 

        for (let batch of shells) {
            batch.update(t); 
            batch.display(); 
        }
    }
}


// snowflake class
// #Source https://p5js.org/examples/simulate-snowflakes.html
function snowflake() {
    // initialize coordinates
    this.posX = 0;
    this.posY = random(-50, 0);
    this.initialangle = random(0, 2 * PI);
    this.size = random(2, 5);

    // radius of snowflake spiral
    // chosen so the snowflakes are uniformly spread out in area
    this.radius = sqrt(random(pow(width / 2, 2)));

    this.update = function (time) {
        // x position follows a circle
        let w = 0.1; // angular speed
        let angle = w * time + this.initialangle;
        this.posX = width / 2 + this.radius * sin(angle);

        // different size snowflakes fall at slightly different y speeds
        this.posY += pow(this.size, 0.5);

        // delete snowflake if past end of screen
        if (this.posY > height) {
            let index = snowflakes.indexOf(this);
            snowflakes.splice(index, 1);
        }
    };

    this.display = function () {
        ellipse(this.posX, this.posY, this.size);
        fill(255, 255, 255);
        stroke(255, 255, 255);
    };
}

// petal class
// #Source https://editor.p5js.org/abrock/sketches/SyyaEusom

function petal() {
    // initialize coordinates
    this.posX = 0;
    this.posY = random(-50, 0);
    this.initialangle = random(10, 0 * PI);
    this.size = random(5, 10);
    this.height = random(8, 12);
    this.speed = 0.6;

    this.radius = sqrt(random(pow(width / 1, 2)));
    this.update = function (time) {
        // x position follows a circle
        let w = 0.1; // angular speed
        let angle = w * time + this.initialangle;
        this.posX = width / 1 + this.radius * tan(angle); //calculates tangent of the angle the petals fall
        this.posY += pow(this.size, 0.4) * this.speed;


        // delete petal if past end of screen
        if (this.posY > height) {
            let index = petals.indexOf(this);
            petals.splice(index, 1);
        }
    };
    this.display = function () {
        ellipse(this.posX, this.posY, this.size, this.height);
        fill(255, 208, 225);
        stroke(255, 208, 225);
    };
}


//Leaf and shell adapted from petal code
function leaf() {
    // initialize coordinates
    this.posX = 0;
    this.posY = random(-50, 0);
    this.initialangle = random(18, 2 * PI);
    this.size = random(25, 30);
    this.speed = random(0.3, 0.5);

    this.radius = sqrt(random(pow(width / 1, 2)));
    this.update = function (time) {
        // x position follows a circle
        let w = 0.1; // angular speed
        let angle = w * time + this.initialangle;
        this.posX = width / 1 + this.radius * tan(angle); 
        this.posY += pow(this.size, 0.5) * this.speed;

        // delete leaf if past end of screen
        if (this.posY > height) {
            let index = leaves.indexOf(this);
            leaves.splice(index, 1);
        }
    };
    this.display = function () {
        image(leafImage, this.posX, this.posY, this.size, this.size);
    };
}

function shell() {
    // initialize coordinates
    this.posX = random(0, width); // Start from the center of the canvas
    this.posY = (-50, 0); // Start above the canvas

    this.size = random(40, 45);
    this.speed = random(0.3, 0.5);

    this.update = function (time) {
        // Only update the Y position (falling straight down)
        this.posY += pow(this.size, 0.3) * this.speed;

        // Delete leaf if past end of screen
        if (this.posY > height) {
            let index = shells.indexOf(this);
            shells.splice(index, 1);
        }
    };
    this.display = function () {
        image(shellImage, this.posX, this.posY, this.size, this.size);
    };
}