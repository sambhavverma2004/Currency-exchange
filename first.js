const baseURL = "https://2024-03-06.currency-api.pages.dev/v1/currencies/"; //eur.json";
const dropDowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector(".button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".To select");
const msg = document.querySelector(".msg");

for(let select of dropDowns){
    for(let currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = true;
        }
        if(select.name === "To" && currCode === "INR"){
            newOption.selected = true;
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
};

const updateExchangeRate = async() => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal == "" || amtVal < 1){
        amtVal = 1;
        amount.value = "1";
    }
    const URL = `${baseURL}${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    console.log(data);
    console.log(data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()]);
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

    let finalAmt = amtVal * rate;
    msg.innerText = `${amtVal}${fromCurr.value} = ${finalAmt}${toCurr.value}`;
    console.log(msg.innerText);
};

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click", async(evt) => {
    evt.preventDefault();   
    await updateExchangeRate();
});

window.addEventListener("load", () => {   
});