const getStepPosition = document.querySelectorAll(".sidebar__steps-position");
const getFormSteps = document.querySelectorAll(".form__main");
const getBackButton = document.querySelector(".form__back-button");
const getNextStepButton = document.querySelector(".form__next-step");

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

const displayBackButton = (step) => {
    step.innerHTML !== '1' ? getBackButton.style.opacity = "1": getBackButton.style.opacity = "0";
    step.innerHTML !== '1' ? getBackButton.style.visibility = "visible": getBackButton.style.visibility = "hidden";
};

const changePosition = (button, direction) => {
    button.addEventListener('click', () => {
        const findPositionActive = document.querySelector('.sidebar__steps-position--active').innerHTML
        const nodePositionsInArray = Array.from(getStepPosition)
        const nextStep = nodePositionsInArray.find((step) => Number(step.innerHTML) === Number(findPositionActive) + direction)
        if (nextStep) {
            selectStepPosition(nextStep)
            selectStepPage(nextStep);
            displayBackButton(nextStep);
        }
    })
}

changePosition(getNextStepButton, 1)
changePosition(getBackButton, -1)

const selectStep = () => {
  getStepPosition.forEach((step) => {
    step.addEventListener("click", () => {
      selectStepPosition(step);
      selectStepPage(step);
      displayBackButton(step);
    });
  });
};

selectStep();
