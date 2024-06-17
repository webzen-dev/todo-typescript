"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function Validate(ValidatableInput) {
    let isValid = true;
    if (ValidatableInput.required) {
        isValid = isValid && ValidatableInput.value.toString().trim().length !== 0;
    }
    if (ValidatableInput.minLength != null &&
        typeof ValidatableInput.value === "string") {
        isValid =
            isValid && ValidatableInput.value.length >= ValidatableInput.minLength;
    }
    if (ValidatableInput.maxLength != null &&
        typeof ValidatableInput.value === "string") {
        isValid =
            isValid && ValidatableInput.value.length <= ValidatableInput.maxLength;
    }
    if (ValidatableInput.min != null &&
        typeof ValidatableInput.value === "number") {
        isValid = isValid && ValidatableInput.value >= ValidatableInput.value;
    }
    if (ValidatableInput.max != null &&
        typeof ValidatableInput.value === "number") {
        isValid = isValid && ValidatableInput.value <= ValidatableInput.value;
    }
    return isValid;
}
function autoBinder(_target, _method, descriptor) {
    const originalMethod = descriptor.value;
    const myDescriptor = {
        configurable: true,
        get() {
            const boundFunction = originalMethod.bind(this);
            return boundFunction;
        },
    };
    return myDescriptor;
}
class ProjectList {
    constructor(type) {
        this.type = type;
        this.templateElement = document.getElementById("project-list");
        this.hostElement = document.getElementById("app");
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        this.element.id = `${this.type}-project`;
        this.attach();
        this.renderContent();
    }
    attach() {
        this.hostElement.insertAdjacentElement("beforeend", this.element);
    }
    renderContent() {
        const listId = `${this.type}-project-list`;
        this.element.querySelector("ul").id = listId;
        this.element.querySelector("h2").textContent =
            this.type.toUpperCase() + "PROJECTS";
    }
}
class ProjectInput {
    constructor() {
        this.templateElement = (document.getElementById("project-input"));
        this.hostElement = document.getElementById("app");
        const importedNode = document.importNode(this.templateElement.content, true);
        // console.log(importedNode);
        this.element = importedNode.firstElementChild;
        this.element.id = "user-input";
        this.titleInputElement = (this.element.querySelector("#title"));
        this.decriptionInputElement = (this.element.querySelector("#description"));
        this.peopleInputElement = (this.element.querySelector("#people"));
        this.errorBox = document.getElementById("error");
        this.configure();
        this.attach();
    }
    getUserInput() {
        const EnteredTitle = this.titleInputElement.value;
        const EnteredDecription = this.decriptionInputElement.value;
        const EnteredPeople = this.peopleInputElement.value;
        const titleValidatable = {
            value: EnteredTitle,
            required: true,
            minLength: 4,
        };
        const DescriptionValidatable = {
            value: EnteredDecription,
            required: true,
            minLength: 10,
        };
        const PeopleValidatable = {
            value: EnteredPeople,
            required: true,
            min: 1,
            max: 10,
        };
        if (!Validate(titleValidatable) ||
            !Validate(DescriptionValidatable) ||
            !Validate(PeopleValidatable)) {
            this.errorBox.classList.add("show");
            setTimeout(() => this.errorBox.classList.remove("show"), 2000);
        }
        else {
            return [EnteredTitle, EnteredDecription, +EnteredPeople];
        }
    }
    clearInput() {
        this.titleInputElement.value = "";
        this.decriptionInputElement.value = "";
        this.peopleInputElement.value = "";
    }
    submitHandler(event) {
        event.preventDefault();
        const userInput = this.getUserInput();
        if (Array.isArray(userInput)) {
            const [title, description, people] = userInput;
            console.log(title, description, people);
            this.clearInput();
        }
        // console.log(this.titleInputElement.value);
    }
    configure() {
        this.element.addEventListener("submit", this.submitHandler);
    }
    attach() {
        this.hostElement.insertAdjacentElement("afterbegin", this.element);
    }
}
__decorate([
    autoBinder
], ProjectInput.prototype, "submitHandler", null);
const ProjectInputVarable = new ProjectInput();
const activeProject = new ProjectList('active');
const finishedPrj = new ProjectList('finished');
