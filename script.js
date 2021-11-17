const trashContainer = document.querySelector(".trash-container")
const moneyElem = document.querySelector(".money")

// Formatter for money (USD)
const currencyFormatter = new Intl.NumberFormat("en-us", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
})

// Formatter for money left to raise to help with trash display
const trashFormatter = new Intl.NumberFormat("en-us", {
    minimumIntegerDigits: 8, // Makes sure all numbers are length 8 (zeroes at start if needed)
    maximumFractionDigits: 0, // No decimals
    useGrouping: false // No commas
})

// Donation Goal
const MAX_MONEY_RAISED = 30000000

/* 
 * Function for displaying the current amount raised
 * taken from the TeamSeas Website as well as trash (icons)
 * in the ocean that represent the amount of money left
 * to raise.
 *    - 
 */
setupTrash()
async function setupTrash() {
    // Get current amount raised
    const amountRaised = await fetch("https://tscache.com/donation_total.json")
    .then(res => res.json())
    .then(data => data.count)
    moneyElem.innerText = currencyFormatter.format(amountRaised)

    // Get what is left to raise
    const amountLeftToRaise = Math.max(MAX_MONEY_RAISED - amountRaised, 0)
    // Convert to string
    const stringifiedAmount = trashFormatter.format(amountLeftToRaise)

    const trashAmounts = {
        xxl: {
            amount: parseInt(`${stringifiedAmount[0]}${stringifiedAmount[1]}`),
            icon: "bag",
        },
        xl: {
            amount: parseInt(`${stringifiedAmount[2]}`),
            icon: "takeout",
        },
        lg: {
            amount: parseInt(`${stringifiedAmount[3]}`),
            icon: "headphones",
        },
        md: {
            amount: parseInt(`${stringifiedAmount[4]}`),
            icon: "phone",
        },
        sm: {
            amount: parseInt(`${stringifiedAmount[5]}`),
            icon: "toy-car",
        },
        xs: {
            amount: parseInt(`${stringifiedAmount[6]}`),
            icon: "bottle",
        },
    }

    Object.values(trashAmounts).forEach(({ amount, icon }) => {
        for (let i = 0; i < amount; i ++){
            createTrash(icon)
        }
    })
}


function createTrash(icon) {
    const img = document.createElement('img')

    const top = randomNumberBetween(0,50)
    const size = top / 5 + 1

    img.src = `/imgs/${icon}.svg`
    img.classList.add("trash")
    img.style.top = `${top}vh`
    img.style.left = `${randomNumberBetween(0,100)}vw`
    img.style.width = `${size}vmin`
    img.style.height = `${size}vmin`
    img.style.setProperty("--rotation", `${randomNumberBetween(-30,30)}deg`)

    trashContainer.appendChild(img)
}

// Function for getting a random number between a given min and max
function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}