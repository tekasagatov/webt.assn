//event handling
document.getElementById("submit").addEventListener("click", calculateDowry);

//object to store
const educationLevels = {
    bachelor: 1.5,
    college: 1.2,
    high_school: 1.05,
    middle_school: 0.9,
};

//array to store
const netWorthOptions = [
    { value: "upper_class", coefficient: 2 },
    { value: "middle_class", coefficient: 1.5 },
    { value: "lower_class", coefficient: 1.2 }
];

//object to store
const casteBonuses = {
    brahmin: 100,
    kshatriya: 50,
    vaishya: 20,
    shudra: 10,
    untouchable: -50
};

//calculation
function calculateDowry() {
    //reset previous result
    const existingResult = document.getElementById("result");
    if (existingResult) {
        existingResult.remove();
    }

    //base price
    let basePrice = 100;

    //education coef.
    const education = document.getElementById("education").value;
    let educationCoefficient = educationLevels[education] || 1;

    //networth coef.
    const networth = document.getElementById("networth").value;
    let networthCoefficient = 1;
    netWorthOptions.forEach(option => {
        if (option.value === networth) {
            networthCoefficient = option.coefficient;
        }
    });

    //caste bonus
    const caste = document.getElementById("caste").value;
    let casteBonus = casteBonuses[caste] || 0;

    //skills bonus
    const skills = [
        { id: "music", bonus: 10 },
        { id: "cook", bonus: 20 },
        { id: "easygoing", bonus: 15 },
        { id: "sings", bonus: 10 }
    ];
    let skillsBonus = skills.reduce((total, skill) => {
        return total + (document.getElementById(skill.id).checked ? skill.bonus : 0);
    }, 0);

    //age coef.
    let ageCoefficient = 1;
    const age = document.querySelector('input[name="age"]:checked')?.value;
    if (age === "18-23") ageCoefficient = 1.5;
    else if (age === "24-27") ageCoefficient = 1.2;
    else if (age === "28+") ageCoefficient = 0.95;

    //reputation coef.
    let reputationCoefficient = 1;
    if (document.getElementById("gossips_parents").checked) reputationCoefficient *= 0.85;
    if (document.getElementById("gossips_character").checked) reputationCoefficient *= 0.9;
    if (document.getElementById("general_gossips").checked) basePrice -= 20;

    //final price
    let finalPrice = basePrice * educationCoefficient * networthCoefficient * ageCoefficient * reputationCoefficient;
    finalPrice += casteBonus + skillsBonus;

    //display
    const resultElement = document.createElement("p");
    resultElement.id = "result";
    resultElement.textContent = `The final dowry price is $${finalPrice.toFixed(2)}`;

    //append result to container
    document.querySelector(".container").appendChild(resultElement);
}
