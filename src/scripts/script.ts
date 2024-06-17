interface Validatable {
  value: string | number;
  required: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}
function Validate(ValidatableInput: Validatable) {
  let isValid = true;
  if (ValidatableInput.required) {
    isValid = isValid && ValidatableInput.value.toString().trim().length !== 0;
  }
  if (
    ValidatableInput.minLength != null &&
    typeof ValidatableInput.value === "string"
  ) {
    isValid =
      isValid && ValidatableInput.value.length >= ValidatableInput.minLength;
  }

  if (
    ValidatableInput.maxLength != null &&
    typeof ValidatableInput.value === "string"
  ) {
    isValid =
      isValid && ValidatableInput.value.length <= ValidatableInput.maxLength;
  }
  if (
    ValidatableInput.min != null &&
    typeof ValidatableInput.value === "number"
  ) {
    isValid = isValid && ValidatableInput.value >= ValidatableInput.value;
  }

  if (
    ValidatableInput.max != null &&
    typeof ValidatableInput.value === "number"
  ) {
    isValid = isValid && ValidatableInput.value <= ValidatableInput.value;
  }
  return isValid;
}
function autoBinder(
  _target: any,
  _method: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  const myDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFunction = originalMethod.bind(this);
      return boundFunction;
    },
  };
  return myDescriptor;
}

class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  decriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;
  errorBox: HTMLDivElement;

  constructor() {
    this.templateElement = <HTMLTemplateElement>(
      document.getElementById("project-input")!
    );
    this.hostElement = document.getElementById("app")! as HTMLDivElement;
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    // console.log(importedNode);
    this.element = importedNode.firstElementChild! as HTMLFormElement;
    this.element.id = "user-input";
    this.titleInputElement = <HTMLInputElement>(
      this.element.querySelector("#title")!
    );
    this.decriptionInputElement = <HTMLInputElement>(
      this.element.querySelector("#description")!
    );
    this.peopleInputElement = <HTMLInputElement>(
      this.element.querySelector("#people")!
    );
    this.errorBox = <HTMLDivElement>document.getElementById("error")!;
    this.configure();
    this.attach();
  }

  private getUserInput(): [string, string, number] | void {
    const EnteredTitle = this.titleInputElement.value;
    const EnteredDecription = this.decriptionInputElement.value;
    const EnteredPeople = this.peopleInputElement.value;

    const titleValidatable: Validatable = {
      value: EnteredTitle,
      required: true,
      minLength: 4,
    };
    const DescriptionValidatable: Validatable = {
      value: EnteredDecription,
      required: true,
      minLength: 10,
    };
    const PeopleValidatable: Validatable = {
      value: EnteredPeople,
      required: true,
      min: 1,
      max: 10,
    };

    if (
      !Validate(titleValidatable) ||
      !Validate(DescriptionValidatable) ||
      !Validate(PeopleValidatable)
    ) {
      this.errorBox.classList.add("show");
      setTimeout(() => this.errorBox.classList.remove("show"), 2000);
    } else {
      return [EnteredTitle, EnteredDecription, +EnteredPeople];
    }
  }

  private clearInput() {
    this.titleInputElement.value = "";
    this.decriptionInputElement.value = "";
    this.peopleInputElement.value = "";
  }
  @autoBinder
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.getUserInput();
    if (Array.isArray(userInput)) {
      const [title, description, people] = userInput;
      console.log(title, description, people);
      this.clearInput();
    }
    // console.log(this.titleInputElement.value);
  }
  private configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }

  private attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }
}

const ProjectInputVarable = new ProjectInput();
