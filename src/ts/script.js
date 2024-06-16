"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
        this.configure();
        this.attach();
    }
    getUserInput() {
        const EnteredTitle = this.titleInputElement.value;
        const EnteredDecription = this.decriptionInputElement.value;
        const EnteredPeople = this.peopleInputElement.value;
        if (EnteredTitle.trim().length === 0 ||
            EnteredDecription.trim().length === 0 ||
            EnteredPeople.trim().length === 0) {
            alert("invalid Input ! please try agian...");
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
