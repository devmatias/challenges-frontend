const form = document.querySelector(".form");
const getStepPosition = document.querySelectorAll(".sidebar__steps-position");
const getFormSteps = document.querySelectorAll(".form__main");
const getPlans = document.querySelectorAll(".form__plan");
const getBackButton = document.querySelector(".form__back-button");
const getNextStepButton = document.querySelector(".form__next-step");
const getChangeButton = document.querySelector(".form__chosed-plan-change");
const getFinalMessage = document.querySelector(".final-message");

const selectStepPosition = (step) => {
  getStepPosition.forEach((allSteps) => {
    allSteps.classList.remove("sidebar__steps-position--active");
  });
  step.classList.add("sidebar__steps-position--active");
};

const selectStepPage = (step) => {
  getFormSteps.forEach((allPages) => {
    allPages.classList.remove("form__main--active");
  });
  getFormSteps[Number(step.innerHTML) - 1].classList.add("form__main--active");
};

const changeHeading = (step) => {
  const getTitle = document.querySelector(".form__title");
  const getSubtitle = document.querySelector(".form__subtitle");
  switch (step.innerHTML) {
    case "1":
      getTitle.innerHTML = "Personal info";
      getSubtitle.innerHTML =
        "Please provide your name, email address, and phone number.";
      break;
    case "2":
      getTitle.innerHTML = "Select your plan";
      getSubtitle.innerHTML =
        "You have the option of monthly or yearly billing.";
      break;
    case "3":
      getTitle.innerHTML = "Pick add-ons";
      getSubtitle.innerHTML = "Add-ons help enhance your gaming experience.";
      break;
    case "4":
      getTitle.innerHTML = "Finishing up";
      getSubtitle.innerHTML =
        "Double-check everything looks OK before confirming.";
      break;
    default:
      getTitle.style.display = "none";
      getSubtitle.style.display = "none";
  }
};

const setInputPhonePattern = () => {
  const input = document.querySelector("#input-phone");
  input.addEventListener('focus', () => {
    if (input.value.length === 0) {
      input.value = '+';
    }
  });
  input.addEventListener('input', () => {
    const value = input.value;
    if (value.charAt(0) !== '+') {
      input.value = '+' + value.substring(1);
    }
  });
};

setInputPhonePattern();

const displayPlanExtraTime = (isYearly) => {
  const getPlanExtraTime = document.querySelectorAll(".form__plan-extra-time");
  getPlanExtraTime.forEach((element) => {
    isYearly
      ? (element.style.display = "block")
      : (element.style.display = "none");
  });
};

const changePlanPeriodPrices = (isYearly) => {
  const monthPrices = ["$9/mo", "$12/mo", "$15/mo"];
  const yearPrices = ["$90/yr", "$120/yr", "$150/yr"];
  const getPlanPrices = document.querySelectorAll(".form__plan-price");
  getPlanPrices.forEach((element, index) => {
    isYearly
      ? (element.innerHTML = yearPrices[index])
      : (element.innerHTML = monthPrices[index]);
  });
};

const checkPeriodPrices = (place, isYearly) => {
  const monthPrices = ["+$1/mo", "+$2/mo", "+$2/mo"];
  const yearPrices = ["+$10/yr", "+$20/yr", "+$20/yr"];
  place.forEach((element, index) => {
    isYearly
      ? (element.innerHTML = yearPrices[index])
      : (element.innerHTML = monthPrices[index]);
  });
};

const changeAddonsPeriodPrices = (isYearly) => {
  const getAddonsPrices = document.querySelectorAll(".form__addons-price");
  const getAddonsChosedPrices = document.querySelectorAll(
    ".form__addons-chosed-price"
  );
  checkPeriodPrices(getAddonsPrices, isYearly);
  checkPeriodPrices(getAddonsChosedPrices, isYearly);
};

const compilePlanInfo = (chosedPlan) => {
  const chosedPlanText = document.querySelector(".form__chosed-plan-text");
  chosedPlanText.innerHTML =
    chosedPlan.querySelector(".form__plan-mode").innerHTML;
  const chosedPlanPrice = document.querySelector(".form__chosed-plan-price");
  chosedPlanPrice.innerHTML =
    chosedPlan.querySelector(".form__plan-price").innerHTML;
};

const displayActiveAddons = () => {
  const getAddonsActive = document.querySelectorAll(".form__addons--active");
  const getAddonsChosed = document.querySelectorAll(".form__addons-chosed");
  const activeAddons = [];
  getAddonsActive.forEach((addon) => {
    activeAddons.push(addon.querySelector(".form__addons-service").innerHTML);
  });
  getAddonsChosed.forEach((addon) => {
    const addonText = addon.querySelector(
      ".form__addons-chosed-text"
    ).innerHTML;
    if (activeAddons.includes(addonText)) {
      addon.classList.add("form__addons-chosed--active");
    } else {
      addon.classList.remove("form__addons-chosed--active");
    }
  });
};

const refreshTotalPrice = () => {
  const totalPrice = [];
  const planPriceText = document.querySelector(
    ".form__chosed-plan-price"
  ).innerHTML;
  totalPrice.push(planPriceText.replace(/[^\d.]+/g, ""));
  const period = planPriceText.replace(/^[^/]*\//, "");
  const getActiveAddons = document.querySelectorAll(
    ".form__addons-chosed--active"
  );
  getActiveAddons.forEach((element) => {
    const textPriceElement = element.querySelector(
      ".form__addons-chosed-price"
    ).innerHTML;
    totalPrice.push(textPriceElement.replace(/[^\d.]+/g, ""));
  });
  const totalPriceElement = document.querySelector(".form__total-price");
  totalPriceElement.innerHTML = `+$${totalPrice.reduce(
    (sum, value) => sum + Number(value),
    0
  )}/${period}`;
};

const changePlan = () => {
  getPlans.forEach((plan) => {
    plan.addEventListener("click", () => {
      getPlans.forEach((allPlans) => {
        allPlans.classList.remove("form__plan--active");
      });
      plan.classList.add("form__plan--active");
      compilePlanInfo(plan);
      refreshTotalPrice();
    });
  });
};

changePlan();

const changePlanPeriod = () => {
  const getSwitch = document.querySelector(".form__plan-switch");
  const getPlanTime = document.querySelectorAll(".form__plan-time");
  getSwitch.addEventListener("click", () => {
    getPlanTime.forEach((plan) => {
      plan.classList.toggle("form__plan-time--active");
    });
    const planActive = document.querySelector(".form__plan--active");
    const isYearly = getPlanTime[1].classList.contains(
      "form__plan-time--active"
    );
    displayPlanExtraTime(isYearly);
    changePlanPeriodPrices(isYearly);
    compilePlanInfo(planActive);
    changeAddonsPeriodPrices(isYearly);
    refreshTotalPrice();
  });
};

changePlanPeriod();

const selectAddons = () => {
  const getAddons = document.querySelectorAll(".form__addons");
  const getAddonsCheckbox = document.querySelectorAll(".form__addons-checkbox");
  getAddonsCheckbox.forEach((checkbox, indexBox) => {
    checkbox.addEventListener("click", () => {
      getAddons.forEach((addon, indexAddon) => {
        if (indexAddon === indexBox)
          addon.classList.toggle("form__addons--active");
      });
      displayActiveAddons();
      refreshTotalPrice();
    });
  });
};

selectAddons();

const displayBackButton = (step) => {
  step.innerHTML !== "1"
    ? (getBackButton.style.opacity = "1")
    : (getBackButton.style.opacity = "0");
  step.innerHTML !== "1"
    ? (getBackButton.style.visibility = "visible")
    : (getBackButton.style.visibility = "hidden");
};

const displayFinalMessage = () => {
  form.style.display = "none";
  getFinalMessage.style.display = "flex";
  getStepPosition.forEach((step) => {
    step.removeEventListener("click", checkInputsValidity);
  });
};

const displayConfirmButton = (step) => {
  if (step.innerHTML === "4") {
    getNextStepButton.innerHTML = "Confirm";
    getNextStepButton.style.backgroundColor = "blueviolet";
    getNextStepButton.addEventListener("click", displayFinalMessage);
  } else {
    getNextStepButton.innerHTML = "Next Step";
    getNextStepButton.style.backgroundColor = "rgb(10, 37, 77)";
    getNextStepButton.removeEventListener("click", displayFinalMessage);
  }
};

const addStepFunctions = (step) => {
  selectStepPosition(step);
  selectStepPage(step);
  changeHeading(step);
  displayBackButton(step);
  displayConfirmButton(step);
};

const changeStep = (direction) => {
  if (!form.checkValidity()) {
    form.reportValidity();
  } else {
    const findPositionActive = document.querySelector(
      ".sidebar__steps-position--active"
    ).innerHTML;
    const nodePositionsInArray = Array.from(getStepPosition);
    const nextStep = nodePositionsInArray.find(
      (step) =>
        Number(step.innerHTML) === Number(findPositionActive) + direction
    );
    if (nextStep) {
      addStepFunctions(nextStep);
    }
  }
};

const checkInputsValidity = () => {
  const isActive = this.classList.contains("sidebar__steps-position--active");
  if (!form.checkValidity() && !isActive) {
    form.reportValidity();
  } else {
    addStepFunctions(this);
  }
};

const setButtons = () => {
  getNextStepButton.addEventListener("click", () => {
    changeStep(1);
  });
  getBackButton.addEventListener("click", () => {
    changeStep(-1);
  });
  getChangeButton.addEventListener("click", () => {
    changeStep(-2);
  });
};

setButtons();

const selectStep = () => {
  getStepPosition.forEach((step) => {
    step.addEventListener("click", checkInputsValidity);
  });
};

selectStep();
