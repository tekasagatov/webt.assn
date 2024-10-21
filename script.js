document.getElementById("submit").addEventListener("click", calculateDowry);

function calculateDowry() {
    let basePrice = 100;

    //education coef.
    const education = document.getElementById("education").value;
    let educationCoefficient = 1;
    if (education === "bachelor") educationCoefficient = 1.5;
    else if (education === "college") educationCoefficient = 1.2;
    else if (education === "high_school") educationCoefficient = 1.05;
    else if (education === "middle_school") educationCoefficient = 0.9;

    //networth coef.
    const networth = document.getElementById("networth").value;
    let networthCoefficient = 1;
    if (networth === "upper_class") networthCoefficient = 2;
    else if (networth === "middle_class") networthCoefficient = 1.5;
    else if (networth === "lower_class") networthCoefficient = 1.2;

    //caste bonus
    const caste = document.getElementById("caste").value;
    let casteBonus = 0;
    if (caste === "brahmin") casteBonus = 100;
    else if (caste === "kshatriya") casteBonus = 50;
    else if (caste === "vaishya") casteBonus = 20;
    else if (caste === "shudra") casteBonus = 10;
    else if (caste === "untouchable") casteBonus = -50;

    //skills bonus
    let skillsBonus = 0;
    if (document.getElementById("music").checked) skillsBonus += 10;
    if (document.getElementById("cook").checked) skillsBonus += 20;
    if (document.getElementById("easygoing").checked) skillsBonus += 15;
    if (document.getElementById("sings").checked) skillsBonus += 10;

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
    resultElement.textContent = `The final dowry price is $${finalPrice.toFixed(2)}`;
    document.querySelector(".container").appendChild(resultElement);
}