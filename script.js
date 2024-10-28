//all coef.
const config = {
    education: {
        undergraduate: 1.5,
        college: 1.2,
        high_school: 1.05,
        middle_school: 0.9
    },
    networth: {
        upper_class: 2,
        middle_class: 1.5,
        lower_class: 1.2
    },
    caste: {
        brahmin: 100,
        kshatriya: 50,
        vaishya: 20,
        shudra: 10,
        untouchable: -50
    },
    skills: {
        music: 10,
        cook: 20,
        easygoing: 15,
        sings: 10
    },
    age: {
        age_18_23: 1.5,
        age_24_27: 1.2,
        age_28_plus: 0.95
    },
    reputation: {
        gossips_parents: 0.85,
        gossips_character: 0.9,
        general_gossips: -20
    }
};

//save elements
const nameInput = document.getElementById("name");
const startBidInput = document.getElementById("starting_bid");
const educationSelect = document.getElementById("education");
const networthSelect = document.getElementById("networth");
const casteSelect = document.getElementById("caste");
const skillsSelect = document.querySelectorAll(".skills");
const ageSelect = document.getElementsByName("age");
const reputationSelect = document.querySelectorAll(".reputation");
const loveLetterInput = document.getElementById("love_letter");
const submitButton = document.getElementById("submit");
const resultDiv = document.getElementById("result");

//eventlistener button
submitButton.addEventListener("click", () => calculate());

//calculation
const calculate = () => {
    let name = nameInput.value;
    let price = parseFloat(startBidInput.value);

    switch (true) {
        case (!name || isNaN(price)):
            alert("Please fill in.");
            return;
        default:
            break;
    }    

    //education
    const selectedEducationLevel = educationSelect.value;
    price *= config.education[selectedEducationLevel];
    //networth
    const selectedNetworth = networthSelect.value;
    price *= config.networth[selectedNetworth];
    //caste
    const selectedCaste = casteSelect.value;
    price += config.caste[selectedCaste];
    //skills
    const skillBonus = Array.from(skillsSelect)
        .filter(skill => skill.checked)
        .reduce((total, skill) => total + config.skills[skill.value], 0);
    price += skillBonus;
    //age
    ageSelect.forEach(age => {
        if (age.checked) {
            price *= config.age[age.value];
        }
    });
    //reputation
    for (let i = 0; i < reputationSelect.length; i++) {
        if (reputationSelect[i].checked) {
            const selectedReputation = reputationSelect[i].value;
            const reputationValue = config.reputation[selectedReputation];

            if (reputationValue > 0 && reputationValue < 1) {
                price *= reputationValue;
            } else {
                price += reputationValue;
            }
        }
    }
    //loveletter
    const loveLetter = loveLetterInput.value;
    let person = {
        bride_name: name,
        bride_price: price.toFixed(2),
        letter_to_bride: loveLetter
    };
    //result
    resultDiv.innerHTML = `
        <p>Your price for ${person.bride_name} is $${person.bride_price}</p>
        <p>Your love letter: ${person.letter_to_bride}</p>
    `;
};
